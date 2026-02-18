#!/bin/bash
# MASTER PIPELINE: Pre-Deployment Validation Script
# Run this before deploying to validate local builds

set -e  # Exit on error

echo "🚀 MASTER PIPELINE: Pre-Deployment Validation"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track failures
FAILURES=0

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        FAILURES=$((FAILURES + 1))
    fi
}

echo "Phase 1: Environment Check"
echo "----------------------------"

# Check Node version
NODE_VERSION=$(node --version)
if [[ $NODE_VERSION == v24* ]]; then
    print_status 0 "Node version: $NODE_VERSION"
else
    print_status 1 "Node version: $NODE_VERSION (Expected v24.x)"
fi

# Check npm version
NPM_VERSION=$(npm --version)
if [[ $NPM_VERSION == 11* ]] || [[ $NPM_VERSION == 10* ]]; then
    print_status 0 "npm version: $NPM_VERSION"
else
    print_status 1 "npm version: $NPM_VERSION (Expected 10.x or 11.x)"
fi

echo ""
echo "Phase 2: Backend Validation"
echo "----------------------------"

cd backend || exit 1

# Install dependencies
if npm install > /dev/null 2>&1; then
    print_status 0 "Backend dependencies installed"
else
    print_status 1 "Backend dependencies failed"
fi

# Generate Prisma client
if npm run prisma:generate > /dev/null 2>&1; then
    print_status 0 "Prisma client generated"
else
    print_status 1 "Prisma client generation failed"
fi

# Type check
if npm run type-check > /dev/null 2>&1; then
    print_status 0 "Backend TypeScript validation"
else
    print_status 1 "Backend TypeScript validation failed"
fi

# Lint
if npm run lint > /dev/null 2>&1; then
    print_status 0 "Backend linting"
else
    print_status 1 "Backend linting failed"
fi

# Build
if npm run build > /dev/null 2>&1; then
    print_status 0 "Backend build"
else
    print_status 1 "Backend build failed"
fi

# Tests (unit only, e2e requires DATABASE_URL)
echo -e "${YELLOW}ℹ${NC} Running backend tests (e2e tests will be skipped without DATABASE_URL)"
if npm test > /tmp/backend-test.log 2>&1; then
    UNIT_TESTS=$(grep "Tests:" /tmp/backend-test.log | grep "passed")
    print_status 0 "Backend tests: $UNIT_TESTS"
else
    print_status 1 "Backend tests failed (see /tmp/backend-test.log)"
fi

cd ..

echo ""
echo "Phase 3: Web Frontend Validation (Next.js)"
echo "---------------------------------"

cd app-nextjs || exit 1

# Install dependencies
if npm install > /dev/null 2>&1; then
    print_status 0 "Web dependencies installed"
else
    print_status 1 "Web dependencies failed"
fi

# Build
if npm run build > /tmp/web-build.log 2>&1; then
    print_status 0 "Web build successful"
else
    print_status 1 "Web build failed (see /tmp/web-build.log)"
fi

cd ..

echo ""
echo "Phase 4: Mobile App Validation"
echo "-------------------------------"

cd mobile || exit 1

# Install dependencies
if npm install --legacy-peer-deps > /dev/null 2>&1; then
    print_status 0 "Mobile dependencies installed"
else
    print_status 1 "Mobile dependencies failed"
fi

# Type check
if npm run type-check > /dev/null 2>&1; then
    print_status 0 "Mobile TypeScript validation"
else
    print_status 1 "Mobile TypeScript validation failed"
fi

# Tests
if npm test > /dev/null 2>&1; then
    print_status 0 "Mobile tests"
else
    print_status 1 "Mobile tests failed"
fi

cd ..

echo ""
echo "Phase 5: Configuration Check"
echo "-----------------------------"

# Check vercel.json exists
if [ -f "vercel.json" ]; then
    print_status 0 "vercel.json exists"
else
    print_status 1 "vercel.json missing"
fi

# Check .nvmrc
if [ -f ".nvmrc" ]; then
    NVMRC_VERSION=$(cat .nvmrc)
    if [ "$NVMRC_VERSION" = "24" ]; then
        print_status 0 ".nvmrc set to 24"
    else
        print_status 1 ".nvmrc set to $NVMRC_VERSION (expected 24)"
    fi
else
    print_status 1 ".nvmrc missing"
fi

# Check backend package.json engines
BACKEND_NODE=$(grep -A 1 '"engines"' backend/package.json | grep "node" | grep -o ">=.*\"" | tr -d '">=' | cut -d'.' -f1)
if [ "$BACKEND_NODE" = "24" ]; then
    print_status 0 "Backend requires Node 24.x"
else
    print_status 1 "Backend requires Node ${BACKEND_NODE}.x (expected 24)"
fi

# Check web package.json engines
WEB_NODE=$(grep -A 1 '"engines"' app-nextjs/package.json | grep "node" | grep -o ">=.*\"" | tr -d '">=' | cut -d'.' -f1)
if [ "$WEB_NODE" = "24" ]; then
    print_status 0 "Web requires Node 24.x"
else
    print_status 1 "Web requires Node ${WEB_NODE}.x (expected 24)"
fi

# Check mobile package.json engines
MOBILE_NODE=$(grep -A 1 '"engines"' mobile/package.json | grep "node" | grep -o ">=.*\"" | tr -d '">=' | cut -d'.' -f1)
if [ "$MOBILE_NODE" = "24" ]; then
    print_status 0 "Mobile requires Node 24.x"
else
    print_status 1 "Mobile requires Node ${MOBILE_NODE}.x (expected 24)"
fi

echo ""
echo "=============================================="
echo "Validation Summary"
echo "=============================================="

if [ $FAILURES -eq 0 ]; then
    echo -e "${GREEN}✓ All validations passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Get DATABASE_URL from Neon"
    echo "2. Set environment variables in Vercel"
    echo "3. Deploy backend to Vercel"
    echo "4. Deploy web to Vercel"
    echo "5. Test mobile app with deployed backend"
    echo ""
    echo "See MASTER_PIPELINE_DEPLOYMENT_GUIDE.md for details"
    exit 0
else
    echo -e "${RED}✗ $FAILURES validation(s) failed${NC}"
    echo ""
    echo "Please fix the issues above before deploying"
    exit 1
fi
