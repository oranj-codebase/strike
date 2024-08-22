#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")
CANISTER="strike_backend"

cd $SCRIPT_DIR/..

echo Generating $CANISTER did file

if ! cargo install --list | grep -Fxq "candid-extractor v0.1.4:"
then
  cargo install --version 0.1.4 candid-extractor
fi

candid-extractor target/wasm32-unknown-unknown/release/$CANISTER.wasm > canisters/$CANISTER/$CANISTER.did