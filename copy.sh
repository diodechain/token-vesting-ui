#!/bin/bash
npm run-script build
rm -rf ../website/vesting/
cp -R build/ ../website/vesting
