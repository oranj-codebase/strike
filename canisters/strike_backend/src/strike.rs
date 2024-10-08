mod admins;
mod guards;
mod lifecycle;
mod memory;
mod serializer;
#[cfg(test)]
mod test;

use candid::{CandidType, Decode, Encode, Principal};
use ic_cdk::{caller, query, update};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;

use crate::guards::*;
use crate::memory::REGISTRY;

#[derive(Serialize, Deserialize, CandidType, Debug, PartialEq)]
#[repr(u8)]
enum StrikeStatus {
    Submitted,
    Trusted,
    Blocked,
}

#[derive(Serialize, Deserialize, CandidType, Debug)]
struct StrikeRegistry {
    canister_id: Principal,
    module_hash: Option<String>,
    website_url: Option<String>,
    created_at: u64,
    added_by: Principal,
    status: StrikeStatus,
}

impl Storable for StrikeRegistry {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[query]
fn get_strike_by_canister_id(canister_id: Principal) -> Option<StrikeRegistry> {
    REGISTRY.with(|s| s.borrow().get(&canister_id))
}

#[update(guard = "caller_is_not_anonymous")]
fn add_registry(canister_id: Principal, module_hash: Option<String>, website_url: Option<String>) -> Result<(), String> {
    let caller = caller();

    let registry = StrikeRegistry {
        canister_id: canister_id.clone(),
        module_hash,
        website_url,
        created_at: ic_cdk::api::time(),
        added_by: caller,
        status: StrikeStatus::Submitted,
    };

    // TODO: Validate canister ownership by caller

    // Find exist one
    if let Some(exist_registry) = REGISTRY.with(|s| s.borrow().get(&canister_id)) {
        if exist_registry.status != StrikeStatus::Submitted {
            return Err("Canister already trusted or blocked".to_string());
        }
    };

    REGISTRY.with(|s| s.borrow_mut().insert(canister_id.clone(), registry));

    Ok(())
}

#[update(guard = "caller_is_admin")]
fn update_registry_status(canister_id: Principal, status: StrikeStatus) -> Result<(), String> {
    let mut registry = REGISTRY
        .with(|s| s.borrow_mut().get(&canister_id))
        .ok_or("Canister not found")?;

    registry.status = status;

    // Save registry
    REGISTRY.with(|s| s.borrow_mut().insert(canister_id, registry));

    Ok(())
}

#[update(guard = "caller_is_admin")]
pub fn add_admin(admin: Principal) -> Result<(), String> {
    let caller = ic_cdk::api::caller();
    admins::add_admins(caller, [admin].to_vec())
}

#[update(guard = "caller_is_admin")]
pub fn remove_admin(admin: Principal) -> Result<(), String> {
    let caller = ic_cdk::api::caller();
    admins::remove_admins(caller, [admin].to_vec())
}

#[query]
pub fn is_admin(user: Principal) -> bool {
    admins::is_admin(user)
}

ic_cdk::export_candid!();

fn main() {}
