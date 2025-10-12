#!/bin/bash
echo "🚀 Aggressively optimizing all images to under 200KB..."

# First pass: aggressive optimization for images over 400KB
find static/images/projects -name "*.png" -size +400k -print0 | while IFS= read -r -d '' file; do
    original_size=$(du -h "$file" | cut -f1)
    echo "🔥 Heavy optimization: $file (original: $original_size)"
    pngquant --quality=30-60 --ext .png --force "$file"
    new_size=$(du -h "$file" | cut -f1)
    echo "  ✅ Compressed to: $new_size"
done

# Second pass: moderate optimization for images 200KB-400KB
find static/images/projects -name "*.png" -size +200k -size -400k -print0 | while IFS= read -r -d '' file; do
    original_size=$(du -h "$file" | cut -f1)
    echo "⚡ Moderate optimization: $file (original: $original_size)"
    pngquant --quality=40-70 --ext .png --force "$file"
    new_size=$(du -h "$file" | cut -f1)
    echo "  ✅ Compressed to: $new_size"
done

echo ""
echo "📊 Final size report:"
find static/images/projects -name "*.png" -exec du -h {} \; | sort -hr | head -20
