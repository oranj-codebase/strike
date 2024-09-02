# STRIKE - Blinks on ICP

> [INFO]
> This is under active development, some breaking changes will be made before official release.

> Inspired by [Dialect](https://dial.to/), check original [documentation](https://docs.dialect.to/documentation) for more details.

Thanks to host anything on ICP, building Blinks on ICP is much easier than on Solana by using existing ICP infrastructure.
STRIKE consists of 3 main components,
- STRIKE [core library](./packages/core)
- STRIKE [registry canister](./canisters/strike_backend)
- STRIKE [chrome extension](./apps/chrome-extension) to render blinks on X platform.

## How STRIKE works
Since STRIKE is inspired by Dialect, the most things are same but there some differences between schema definition.

The exact schema definition will be provided soon, for now please check [actions.json](./apps/site/public/actions.json) which will be provided by API or query call.