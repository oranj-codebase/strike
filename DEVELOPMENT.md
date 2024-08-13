### Prerequisties

- Rust
- Node.js v18.17.1
- dfx
  ```bash
  DFX_VERSION=0.15.1 sh -ci "$(curl -sSL https://internetcomputer.org/install.sh)"
  ```
- candid-extractor

  ```bash
  cargo install candid-extractor
  ```

### Development

1. Start local node

   ```bash
   make start
   ```

2. Deploy backend and II cansiter

   ```bash
   make deploy
   ```

3. Run frontend

   ```bash
   npm run dev
   ```

> [!NOTE]  
> When backend modification is made, please update generated files by running `make generate`

#### Test file upload in local

```bash
dfx canister call vibeverse_assets authorize '(principal "<REPLACE_PRINCIPAL>")'
```

### Test

```bash
cargo test
```

## Deploy to staging & production

> [!INFO]  
> Before start, set environment variable `DFX_NETWORK` as `staging` for staging, `ic` for production.

### Redeploy

> [!WARNING]  
> **All of deployed data will be lost.**

```bash
make redeploy-staging
```

```bash
make redeploy-ic
```

### Upgrade

```bash
make upgrade-staging
```

```bash
make upgrade-ic
```
