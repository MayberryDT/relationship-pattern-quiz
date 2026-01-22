#!/bin/bash
# Ralph Wiggum - Canonical AI Loop
# One simple loop. Fresh context every time.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
PRD_FILE="$ROOT_DIR/prd.json"
ACTIVITY_FILE="$ROOT_DIR/activity.md"

# 1. Ensure Activity Log exists
if [ ! -f "$ACTIVITY_FILE" ]; then
  echo "# Ralph Activity Log" > "$ACTIVITY_FILE"
  echo "Started: $(date)" >> "$ACTIVITY_FILE"
  echo "---" >> "$ACTIVITY_FILE"
fi

echo "Starting Canonical Ralph Loop..."

while true; do
  # 2. Check if all tasks are complete (Static Plan)
  # Uses node to parse JSON since jq might not be available
  if node -e "const prd = require('$PRD_FILE'); if (prd.userStories.every(s => s.passes)) process.exit(0); else process.exit(1);" 2>/dev/null; then
    echo "==============================================================="
    echo "  ALL TASKS COMPLETE. EXITING."
    echo "==============================================================="
    exit 0
  fi

  echo ""
  echo "==============================================================="
  echo "  Ralph Iteration: Harvesting Tasks..."
  echo "==============================================================="

  # 3. Run the model with the STATIC prompt
  # We use the 'amp' tool by default as it's the target for this workflow
  cat "$SCRIPT_DIR/prompt.md" | amp --dangerously-allow-all 2>&1 | tee /dev/stderr

  echo "Iteration complete. Cleaning whiteboard (fresh loop)..."
  sleep 2
done

