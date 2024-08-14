use candid::{CandidType, Decode, Encode};
use ic_cdk::{post_upgrade, pre_upgrade, query, update};
use ic_stable_structures::{storable::Bound, writer::Writer, Memory as _, StableVec, Storable};
use serde::{Deserialize, Serialize};
mod memory;
use memory::Memory;
use std::{borrow::Cow, cell::RefCell};

#[derive(Serialize, Deserialize, CandidType, Debug, PartialEq)]
#[repr(u8)]
enum Tag {
    Submitted,
}

#[derive(Serialize, Deserialize, CandidType, Debug)]
struct BlinkRegistry {
    action_url: String,
    blink_url: Option<String>,
    website_url: Option<String>,
    created_at: u64,
    tags: Vec<Tag>,
}
const MAX_VALUE_SIZE: u32 = 100;

impl Storable for BlinkRegistry {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE,
        is_fixed_size: false,
    };
}

// The state of the canister.
#[derive(Serialize, Deserialize)]
struct State {
    // Data that lives on the heap.
    // This is an example for data that would need to be serialized/deserialized
    // on every upgrade for it to be persisted. it is kind of reserved
    data_on_the_heap: Vec<u8>,

    // Data stored in `StableVec` doesn't need to be
    // serialized/deserialized in upgrades, so we tell serde to skip it.
    #[serde(skip, default = "init_stable_data")]
    stable_data: StableVec<BlinkRegistry, Memory>,
}

fn init_stable_data() -> StableVec<BlinkRegistry, Memory> {
    StableVec::init(crate::memory::get_stable_btree_memory()).unwrap()
}

impl Default for State {
    fn default() -> Self {
        Self {
            data_on_the_heap: vec![],
            stable_data: init_stable_data(),
        }
    }
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default());
}

#[query]
fn stable_get(index: u64) -> Option<BlinkRegistry> {
    STATE.with(|s| s.borrow().stable_data.get(index))
}

#[update]
fn stable_insert(index: u64, registry: BlinkRegistry) -> () {
    STATE.with(|s: &RefCell<State>| s.borrow_mut().stable_data.set(index, &registry))
}

#[update]
fn add_registry(registry: BlinkRegistry) -> () {
    STATE
        .with(|s: &RefCell<State>| s.borrow_mut().stable_data.push(&registry))
        .unwrap();
}

// Sets the data that lives on the heap.
#[update]
fn set_heap_data(data: Vec<u8>) {
    STATE.with(|s| s.borrow_mut().data_on_the_heap = data);
}

// Retrieves the data that lives on the heap.
#[query]
fn get_heap_data() -> Vec<u8> {
    STATE.with(|s| s.borrow().data_on_the_heap.clone())
}

// A pre-upgrade hook for serializing the data stored on the heap.
#[pre_upgrade]
fn pre_upgrade() {
    // Serialize the state.
    // This example is using CBOR, but you can use any data format you like.
    let mut state_bytes = vec![];
    STATE
        .with(|s| ciborium::ser::into_writer(&*s.borrow(), &mut state_bytes))
        .expect("failed to encode state");

    // Write the length of the serialized bytes to memory, followed by the
    // by the bytes themselves.
    let len = state_bytes.len() as u32;
    let mut memory = memory::get_upgrades_memory();
    let mut writer = Writer::new(&mut memory, 0);
    writer.write(&len.to_le_bytes()).unwrap();
    writer.write(&state_bytes).unwrap()
}

// A post-upgrade hook for deserializing the data back into the heap.
#[post_upgrade]
fn post_upgrade() {
    let memory = memory::get_upgrades_memory();

    // Read the length of the state bytes.
    let mut state_len_bytes = [0; 4];
    memory.read(0, &mut state_len_bytes);
    let state_len = u32::from_le_bytes(state_len_bytes) as usize;

    // Read the bytes
    let mut state_bytes = vec![0; state_len];
    memory.read(4, &mut state_bytes);

    // Deserialize and set the state.
    let state = ciborium::de::from_reader(&*state_bytes).expect("failed to decode state");
    STATE.with(|s| *s.borrow_mut() = state);
}

ic_cdk::export_candid!();
