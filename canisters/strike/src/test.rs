use candid::utils::ArgumentDecoder;
use candid::utils::ArgumentEncoder;
use candid::Principal;
use pocket_ic::common::rest::RawEffectivePrincipal;
use pocket_ic::{query_candid, PocketIc};

use serde_bytes::ByteBuf;

use cargo_metadata::MetadataCommand;
use escargot::CargoBuild;
use std::path::PathBuf;

/// Builds a canister with the specified name from the current
/// package and returns the WebAssembly module.
pub fn cargo_build_canister(bin_name: &str) -> Vec<u8> {
    let dir = PathBuf::from(std::env::var("CARGO_MANIFEST_DIR").unwrap());

    let cargo_toml_path = dir.join("Cargo.toml");

    let target_dir = MetadataCommand::new()
        .manifest_path(&cargo_toml_path)
        .no_deps()
        .exec()
        .expect("failed to run cargo metadata")
        .target_directory;

    // We use a different target path to stop the native cargo build
    // cache being invalidated every time we run this function
    let wasm_target_dir = target_dir.join("canister-build");

    let cargo_build = CargoBuild::new()
        .target("wasm32-unknown-unknown")
        .bin(bin_name)
        // .args(["--profile", "canister-release"])
        .manifest_path(&cargo_toml_path)
        .target_dir(wasm_target_dir);

    let binary = cargo_build.run().expect("Cargo failed to compile the wasm binary");

    std::fs::read(binary.path())
        .unwrap_or_else(|e| panic!("failed to read compiled Wasm file from {}: {}", binary.path().display(), e))
}

// 2T cycles
const INIT_CYCLES: u128 = 2_000_000_000_000;

/// wrapper around `pocket_ic::call_candid` that uses None as the effective principal.
fn call_candid<Input, Output>(
    env: &PocketIc,
    canister_id: Principal,
    method: &str,
    input: Input,
) -> Result<Output, pocket_ic::CallError>
where
    Input: ArgumentEncoder,
    Output: for<'a> ArgumentDecoder<'a>,
{
    pocket_ic::call_candid(env, canister_id, RawEffectivePrincipal::None, method, input)
}

/// Checks that a canister that uses [`ic_cdk::storage::stable_store`]
/// and [`ic_cdk::storage::stable_restore`] functions can keep its data
/// across upgrades.
#[test]
fn test_storage_roundtrip() {
    let pic = PocketIc::new();
    let wasm = cargo_build_canister("strike");
    let canister_id = pic.create_canister();
    pic.add_cycles(canister_id, INIT_CYCLES);
    pic.install_canister(canister_id, wasm.clone(), vec![], None);

    let () = call_candid(&pic, canister_id, "insert", (&"candid", &b"did")).expect("failed to insert 'candid'");

    pic.upgrade_canister(canister_id, wasm, vec![], None)
        .expect("failed to upgrade the simple-kv-store canister");

    let (result,): (Option<ByteBuf>,) =
        query_candid(&pic, canister_id, "lookup", (&"candid",)).expect("failed to lookup 'candid'");
    assert_eq!(result, Some(ByteBuf::from(b"did".to_vec())));
}
