use candid::Principal;
use ic_cdk::caller;

use crate::admins::is_admin;

pub fn caller_is_admin() -> Result<(), String> {
    let caller = caller();

    if is_admin(caller) {
        Ok(())
    } else {
        Err("Caller is not a admin".to_string())
    }
}

pub fn caller_is_not_anonymous() -> Result<(), String> {
    let caller = caller();

    if caller == Principal::anonymous() {
        Err("Caller is anonymous".to_string())
    } else {
        Ok(())
    }
}
