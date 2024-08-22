use candid::Principal;
use ic_cdk::{query, update};
use std::cell::RefCell;

struct State {
    owner: Principal,
}

impl Default for State {
    fn default() -> Self {
        Self {
            owner: Principal::anonymous(),
        }
    }
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default());
}

#[query]
fn hello() -> String {
    let caller = ic_cdk::caller();
    format!("Hello, {}!", caller)
}

#[update]
fn set_owner(owner: Principal) -> String {
    STATE.with(|s| s.borrow_mut().owner = owner);

    format!("Owner is {}!", owner)
}

#[query]
fn get_owner() -> Principal {
    STATE.with(|s| s.borrow().owner)
}

ic_cdk::export_candid!();
