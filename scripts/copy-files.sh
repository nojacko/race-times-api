#!/usr/bin/env bash
set -euo pipefail

# Source the init script
DIR_SCRIPT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$DIR_SCRIPT/_init.sh"

# Copy files
header "Copy Files"
pwd

# Ensure dirs
echo "- Ensuring target directory exists"
mkdir -p "$DIR_WEB/src/lib/data"
mkdir -p "$DIR_WEB/src/lib/types"

# Copy files
echo "- Copying data to $DIR_WEB/src/lib/data"
data_files=(
    "formulas.ts"
)

for f in "${data_files[@]}"; do
	src="$DIR_API/src/data/$f"
	if [ -f "$src" ]; then
		cp "$src" "$DIR_WEB/src/lib/data/"
	else
		echo "🔴 Warning: $src not found, skipping"
	fi
done

echo "- Copying types to $DIR_WEB/src/lib/types"
type_files=(
	"Formula.ts"
)

for tf in "${type_files[@]}"; do
	tsrc="$DIR_API/src/types/$tf"
	if [ -f "$tsrc" ]; then
		cp "$tsrc" "$DIR_WEB/src/lib/types/"
	else
		echo "🔴 Warning: $tsrc not found, skipping"
	fi
done

echo "- Copying public flags to $DIR_WEB/static"
if [ -d "$DIR_API/public/flags" ]; then
    mkdir -p "$DIR_WEB/static"
    cp -r "$DIR_API/public/flags" "$DIR_WEB/static/"
else
    echo "🔴 Warning: $DIR_API/public/flags not found, skipping"
fi

echo
echo "Completed"
