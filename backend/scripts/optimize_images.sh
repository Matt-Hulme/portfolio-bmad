#!/bin/bash

# Image Optimization Script
# Compresses large PNG images to reduce file sizes for faster web loading

echo "🖼️  Optimizing PNG images..."

# Find all PNGs larger than 500KB and optimize them
find backend/static/images -name "*.png" -size +500k -print0 | while IFS= read -r -d '' file; do
    original_size=$(du -h "$file" | cut -f1)
    echo "Optimizing: $file (original: $original_size)"

    # Create backup
    cp "$file" "$file.backup"

    # Optimize with pngquant (quality 80-95, very good balance)
    pngquant --quality=80-95 --ext .png --force "$file"

    new_size=$(du -h "$file" | cut -f1)
    echo "  → Compressed to: $new_size"
done

echo "✅ Image optimization complete!"
echo ""
echo "Backup files created with .backup extension"
echo "To remove backups: find backend/static/images -name '*.backup' -delete"
