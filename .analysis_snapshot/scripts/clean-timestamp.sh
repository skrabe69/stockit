#!/bin/bash
# Clean up Vinxi/Vite timestamp files

find . -maxdepth 1 -name "*.timestamp*.js" -type f -delete
find . -maxdepth 1 -name "*.timestamp*.ts" -type f -delete

echo "✅ Cleaned timestamp files"
