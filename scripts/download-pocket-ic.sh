#!/bin/bash

POCKET_IC_SERVER_VERSION="5.0.0"

if [[ $OSTYPE == "linux-gnu"* ]] || [[ $RUNNER_OS == "Linux" ]]
then
    PLATFORM=linux
elif [[ $OSTYPE == "darwin"* ]] || [[ $RUNNER_OS == "macOS" ]]
then
    PLATFORM=darwin
else
    echo "OS not supported: ${OSTYPE:-$RUNNER_OS}"
    exit 1
fi

cd canisters/strike

# Check if pocket-ic exists
if [ -f "pocket-ic" ]; then
    echo "PocketIC already exists"
    cd ../..
    exit 0
fi

echo "PocketIC download starting"
curl -Ls https://github.com/dfinity/pocketic/releases/download/${POCKET_IC_SERVER_VERSION}/pocket-ic-x86_64-${PLATFORM}.gz -o pocket-ic.gz || exit 1
gzip -df pocket-ic.gz
chmod +x pocket-ic
echo "PocketIC download completed"
cd ../..