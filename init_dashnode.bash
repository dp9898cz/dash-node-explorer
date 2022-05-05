#!/bin/bash

set -ex

# This shouldn't be in the Dockerfile or containers built from the same image
# will have the same credentials.
if [ ! -e "$HOME/.dashcore/dash.conf" ]; then
    mkdir -p $HOME/.dashcore

    echo "Creating dash.conf"

    cat <<EOF > $HOME/.dashcore/dash.conf
prune=1000
listen=1
server=1
rest=1
disablewallet=1
printtoconsole=1
rpcuser=dowl
rpcpassword=dowl
EOF

fi

cat $HOME/.dashcore/dash.conf

echo "Initialization completed successfully"