#!/bin/bash

# Pre-PR Validation Script
# Run this before creating a PR to ensure all checks pass

set -e  # Exit on any error

echo "🔍 Running Pre-PR Checks..."
echo ""

# Run pre-PR checks
npm run pre-pr

echo ""
echo "✅ All pre-PR checks passed! Safe to create PR."
