use ic_cdk::init;
use tracing::info;

use crate::admins;

#[init]
fn init() {
    let caller = ic_cdk::api::caller();
    admins::add_admins_unchecked([caller].to_vec()).unwrap();

    info!("Initialization complete");
}
