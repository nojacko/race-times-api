#!/usr/bin/env bash
set -euo pipefail

# Source the init script
DIR_SCRIPT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$DIR_SCRIPT/_init.sh"

# Copy files
header "Copy Files"

# Ensure dirs
echo "- Ensuring target directory exists"
mkdir -p "$DIR_WEB/src/lib/data"
mkdir -p "$DIR_WEB/src/lib/data/f1/2026"
mkdir -p "$DIR_WEB/src/lib/data/f2/2026"
mkdir -p "$DIR_WEB/src/lib/types"

# copy helper: copy src to dest (file or directory) if src exists, otherwise warn
copy_if_exists() {
	local src="$1"
	local dest="$2"
	if [ -f "$src" ]; then
		cp "$src" "$dest"
	else
		echo "🔴 Warning: $src not found, skipping"
	fi
}

# Copy files
echo "- Copying data to $DIR_WEB/src/lib/data"
data_files=(
    "formulas.ts"
    "circuits.ts"
)

for f in "${data_files[@]}"; do
	copy_if_exists "$DIR_API/src/data/$f" "$DIR_WEB/src/lib/data/"
done

# Manual Calendar Copying
copy_if_exists "$DIR_API/src/data/f1/2026/calendar.ts" "$DIR_WEB/src/lib/data/f1/2026/calendar.ts"
copy_if_exists "$DIR_API/src/data/f2/2026/calendar.ts" "$DIR_WEB/src/lib/data/f2/2026/calendar.ts"

echo "- Copying types to $DIR_WEB/src/lib/types"
type_files=(
	"Formula.ts"
	"RaceCal.ts"
	"RaceEvent.ts"
	"RaceEventSession.ts"
	"Circuit.ts"
)


for tf in "${type_files[@]}"; do
	copy_if_exists "$DIR_API/src/types/$tf" "$DIR_WEB/src/lib/types/"
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
