#!/usr/bin/env bash
set -e
git add -A
git commit -m "update" || echo "nothing to commit"
git push
