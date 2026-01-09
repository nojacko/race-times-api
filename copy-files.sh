#!/usr/bin/env bash
set -euo pipefail

echo "Copying Files..."

# Change to the directory this script lives in
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "- Moving to $SCRIPT_DIR";
cd "$SCRIPT_DIR"

if [ ! -d "../f1-race-times-app" ]; then
  echo "Directory ../f1-race-times-app does not exist. Aborting." >&2
  exit 1
fi

# Copying Files
echo "- Copying files ../f1-race-times-app/dist -> ./public-expo"
rm -rf ./public-expo
cp -r ../f1-race-times-app/dist ./public-expo

# Done
echo "Completed"