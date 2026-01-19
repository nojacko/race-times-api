#!/usr/bin/env bash
set -euo pipefail

# Source the init script
DIR_SCRIPT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$DIR_SCRIPT/_init.sh"

# Downlad Calendars
header "Downloading Calendars"

TARGET_DIR="$DIR_API/data/calendars"
mkdir -p "$TARGET_DIR"

echo "Downloading calendar files to $TARGET_DIR"

curl -fsSL "https://ics.ecal.com/ecal-sub/696e20de670f6200022adbee/Formula%201.ics" -o "$TARGET_DIR/formula-1.ics"
echo "✓ Formula 1 calendar downloaded"

curl -fsSL "https://ics.ecal.com/ecal-sub/696e1ff44f1d850002ddbfa1/Formula%202.ics" -o "$TARGET_DIR/formula-2.ics"
echo "✓ Formula 2 calendar downloaded"

curl -fsSL "https://ics.ecal.com/ecal-sub/696e20eb670f6200022adbf2/Formula%203.ics" -o "$TARGET_DIR/formula-3.ics"
echo "✓ Formula 3 calendar downloaded"

curl -fsSL "https://ics.ecal.com/ecal-sub/696e20e3670f6200022adbef/F1%20Academy.ics" -o "$TARGET_DIR/f1-academy.ics"
echo "✓ F1 Academy calendar downloaded"

echo "All calendar files downloaded successfully"
