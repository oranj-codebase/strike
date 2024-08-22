use candid::Principal;
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    DefaultMemoryImpl, StableBTreeMap,
};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;

use crate::StrikeRegistry;

// A memory for upgrades, where data from the heap can be serialized/deserialized.
pub const UPGRADES_MEMORY_ID: MemoryId = MemoryId::new(0);

// A memory for the StableBTreeMap we're using. A new memory should be created for
// every additional stable structure.
const ADMINS_MEMORY_ID: MemoryId = MemoryId::new(1);
const REGISTRY_MEMORY_ID: MemoryId = MemoryId::new(2);

pub type Memory = VirtualMemory<DefaultMemoryImpl>;

// The state of the canister.
#[derive(Serialize, Deserialize)]
pub struct State {
    // Data that lives on the heap.
    // This is an example for data that would need to be serialized/deserialized
    // on every upgrade for it to be persisted. it is kind of reserved
    data_on_the_heap: Vec<u8>,
    // Data stored in `StableVec` doesn't need to be
    // serialized/deserialized in upgrades, so we tell serde to skip it.
}

impl Default for State {
    fn default() -> Self {
        Self {
            data_on_the_heap: vec![],
        }
    }
}

thread_local! {
    // The memory manager is used for simulating multiple memories. Given a `MemoryId` it can
    // return a memory that can be used by stable structures.
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static ADMINS: RefCell<StableBTreeMap<Principal, u8, Memory>> = RefCell::new(
        StableBTreeMap::init(get_memory(ADMINS_MEMORY_ID))
    );

    pub static REGISTRY: RefCell<StableBTreeMap<Principal, StrikeRegistry, Memory>> = RefCell::new(
        StableBTreeMap::init(get_memory(REGISTRY_MEMORY_ID))
    );

    pub static STATE: RefCell<State> = RefCell::new(State::default());

}

pub fn get_memory(memory_id: MemoryId) -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(memory_id))
}
