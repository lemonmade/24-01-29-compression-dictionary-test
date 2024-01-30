## Creating a shared brotli diff file

1. Build the assets (`pnpm build`)
1. Copy `build/assets` to `build/assets2`
1. Make an asset change
1. Build the assets again (`pnpm build`)
1. Make sure brotli is installed (`brew install brotli`)
1. Run brotli using the old file as the dictionary (`brotli -D build/assets2/OLD_ASSET.HASH.js -o build/diffs/NEW_ASSET.js.sbr build/assets/NEW_ASSET.js`)
1. Get the SHA256 hash of the new file, using hex, and add it to the `build/diffs/NEW_ASSET.js.sbr` file name (e.g., `build/diffs/NEW_ASSET.HASH.js.SHA.sbr`)
1. Put the new file in the R2 bucket, under `diffs/`
