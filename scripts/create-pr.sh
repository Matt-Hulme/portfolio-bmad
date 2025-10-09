#!/bin/bash

# Automated PR Creation Script
# Runs all pre-PR checks automatically before creating PR

set -e  # Exit on any error

echo "🔍 Running Pre-PR Checks..."
echo ""

# Run pre-PR checks
npm run pre-pr

echo ""
echo "✅ All pre-PR checks passed!"
echo ""
echo "📝 Creating Pull Request..."
echo ""

# Create PR using gh CLI
# Pass all arguments to gh pr create (allows custom title, body, etc.)
gh pr create "$@"
