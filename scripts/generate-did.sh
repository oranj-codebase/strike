#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")
CANISTER="strike"

cd $SCRIPT_DIR/..

echo Generating blinks_icp did file

if ! cargo install --list | grep -Fxq "candid-extractor v0.1.4:"
then
  cargo install --version 0.1.4 candid-extractor
fi

candid-extractor target/wasm32-unknown-unknown/release/$CANISTER.wasm > canisters/$CANISTER/$CANISTER.did