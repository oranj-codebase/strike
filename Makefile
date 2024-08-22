BACKEND=strike_backend
BACKEND_ID=bkyz2-fmaaa-aaaaa-qaaaq-cai
HELLO_ID=ea6rm-nyaaa-aaaak-ak2wa-cai
FRONTEND=blinks_icp_frontend

prepare:
	rustup target add wasm32-unknown-unknown

start:
	dfx start --background

start-clean:
	dfx start --background --clean
	dfx canister create $(BACKEND) --specified-id $(BACKEND_ID)

stop:
	dfx stop

build:
	dfx build $(BACKEND) --network=local

test:
	scripts/download-pocket-ic.sh
	cargo test

build-staging:
	dfx build $(BACKEND) --network=staging

build-ic:
	dfx build $(BACKEND) --network=ic

generate-did:
	scripts/generate-did.sh
	
generate-declaration:
	dfx generate $(BACKEND)

generate: generate-did \
	generate-declaration

deploy-backend: build \
	generate-did
	dfx deploy $(BACKEND) --specified-id $(BACKEND_ID)

deploy-ii:
	dfx deps pull
	dfx deps init --argument '(null)' internet-identity
	dfx deps deploy

deploy-hello:
	dfx canister create hello --specified-id $(HELLO_ID)
	dfx deploy hello --specified-id $(HELLO_ID)

deploy-ledger:
	dfx deploy icp_ledger_canister

deploy: deploy-backend \
	deploy-ii \
	deploy-hello

redeploy: build \
	generate-did
	dfx canister install $(BACKEND) --mode=reinstall

redeploy-staging: build-staging \
	generate-did
	dfx canister install $(BACKEND) --mode=reinstall --network=staging
	dfx build $(FRONTEND) --network=staging
	dfx canister install $(FRONTEND) --mode=reinstall --network=staging

# redeploy-ic: build-ic
# 	make generate-did
# 	dfx canister install $(BACKEND) --mode=reinstall --network=ic
# 	dfx build $(FRONTEND) --network=ic
# 	dfx canister install $(FRONTEND) --mode=reinstall --network=ic

upgrade: build
	make generate-did
	dfx canister install $(BACKEND) --mode=upgrade	

upgrade-staging: build-staging
	make generate-did
	dfx canister install $(BACKEND) --mode=upgrade --network=staging
	dfx build $(FRONTEND) --network=staging
	dfx canister install $(FRONTEND) --mode=upgrade --network=staging

upgrade-ic: build-ic
	make generate-did
	dfx canister install $(BACKEND) --mode=upgrade --network=ic
	dfx build $(FRONTEND) --network=ic
	dfx canister install $(FRONTEND) --mode=upgrade --network=ic
