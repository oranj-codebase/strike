use ic_cdk::post_upgrade;
use ic_stable_structures::reader::{BufferedReader, Reader};
use tracing::info;

use crate::{
    lifecycle::UPGRADE_BUFFER_SIZE,
    memory::{self, STATE, UPGRADES_MEMORY_ID},
    serializer,
};

macro_rules! restore_state {
    ($x:ident,$y:expr) => {
        $x.with(|s| {
            let memory = memory::get_memory($y);

            let reader = BufferedReader::new(UPGRADE_BUFFER_SIZE, Reader::new(&memory, 0));

            let state = serializer::deserialize(reader).unwrap();
            *s.borrow_mut() = state;
        });
    };
}

// A post-upgrade hook for deserializing the data back into the heap.
#[post_upgrade]
fn post_upgrade() {
    restore_state!(STATE, UPGRADES_MEMORY_ID);

    info!("Upgrade complete");
}
