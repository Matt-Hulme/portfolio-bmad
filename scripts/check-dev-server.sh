#!/bin/bash

# Dev Server Health Check
# Starts dev server, checks for console errors, then kills it

set -e

cd "$(dirname "$0")/../frontend"

echo "🚀 Starting dev server for health check..."

# Clean up any existing dev server on port 5173
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

# Start dev server and capture output
npm run dev > /tmp/vite-health-check.log 2>&1 &
DEV_PID=$!

# Ensure cleanup on script exit
cleanup() {
  echo "🧹 Cleaning up dev server..."
  kill $DEV_PID 2>/dev/null || true
  lsof -ti:5173 | xargs kill -9 2>/dev/null || true
}
trap cleanup EXIT

# Wait for server to start (max 15 seconds)
echo "⏳ Waiting for dev server to start..."
for i in {1..30}; do
  if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Dev server started successfully on http://localhost:5173"
    break
  fi

  # Check if process is still running
  if ! kill -0 $DEV_PID 2>/dev/null; then
    echo "❌ Dev server process died unexpectedly"
    echo "Last 50 lines of output:"
    tail -50 /tmp/vite-health-check.log
    exit 1
  fi

  sleep 0.5
done

# Give it a moment to fully initialize
sleep 2

# Check for errors in logs
echo "🔍 Checking for console errors..."

# Look for error patterns (case-insensitive)
if grep -iE "error:|failed to|cannot find|module not found|Failed to resolve import|SyntaxError|ReferenceError|TypeError|undefined is not" /tmp/vite-health-check.log; then
  echo ""
  echo "❌ Console errors detected in dev server output:"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  cat /tmp/vite-health-check.log
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi

echo "✅ No console errors detected"
echo "✅ Dev server health check passed!"

exit 0
