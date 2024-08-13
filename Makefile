BACKEND=blinks_icp_backend
FRONTEND=blinks_icp_frontend

prepare:
	rustup target add wasm32-unknown-unknown

start:
	dfx start --background --clean

start-clean:
	dfx start --background

stop:
	dfx stop

build:
	dfx build $(BACKEND) --network=local

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
	dfx deploy $(BACKEND)

deploy-ii:
	dfx deploy internet_identity

deploy: deploy-backend \
	deploy-ii

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
