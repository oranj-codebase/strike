use ic_cdk::pre_upgrade;
use ic_stable_structures::writer::{BufferedWriter, Writer};
use tracing::info;

use crate::{
    lifecycle::UPGRADE_BUFFER_SIZE,
    memory::{self, STATE, UPGRADES_MEMORY_ID},
    serializer,
};

macro_rules! store_state {
    ($x:ident,$y:expr) => {
        $x.with(|s| {
            let state = s.take();

            let mut memory = memory::get_memory($y);

            let writer = BufferedWriter::new(UPGRADE_BUFFER_SIZE, Writer::new(&mut memory, 0));
            serializer::serialize(state, writer).unwrap();
        });
    };
}

// A pre-upgrade hook for serializing the data stored on the heap.
#[pre_upgrade]
fn pre_upgrade() {
    store_state!(STATE, UPGRADES_MEMORY_ID);

    info!("Upgrade ready");
}
