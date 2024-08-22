#!/bin/sh
BACKEND=strike_backend
PRINCIPAL=$(dfx identity get-principal)
NETWORK=${1:-ic}
HELLO_ID=ea6rm-nyaaa-aaaak-ak2wa-cai

dfx canister call $BACKEND add_registry '((principal "'$HELLO_ID'"), (opt "hashabc123"), (opt "https://example.com"))' --network $NETWORK
dfx canister call $BACKEND update_registry_status '((principal "'$HELLO_ID'"), (variant {"Trusted"}))' --network $NETWORK