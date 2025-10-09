#!/bin/bash

# Smart Pre-PR Check
# Only runs checks for changed directories (frontend/backend)

set -e

echo "🔍 Detecting changed files..."

# Get list of changed files compared to main
CHANGED_FILES=$(git diff --name-only main...HEAD 2>/dev/null || git diff --name-only HEAD)

# Check if frontend files changed
if echo "$CHANGED_FILES" | grep -q "^frontend/"; then
  echo "✅ Frontend changes detected - running frontend checks..."
  npm run pre-pr:frontend
else
  echo "⏭️  No frontend changes - skipping frontend checks"
fi

# Check if backend files changed
if echo "$CHANGED_FILES" | grep -q "^backend/"; then
  echo "✅ Backend changes detected - running backend checks..."
  npm run pre-pr:backend
else
  echo "⏭️  No backend changes - skipping backend checks"
fi

echo ""
echo "✅ All relevant pre-PR checks passed!"
