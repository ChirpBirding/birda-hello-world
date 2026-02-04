#!/bin/bash

# Create placeholder assets for the app
# These are simple colored squares that will work for testing

mkdir -p assets

# Create icon.png (1024x1024)
cat > assets/icon.png << 'EOF'
This is a placeholder. Please replace with actual image files.
For now, you can:
1. Copy icon files from the main app/assets directory
2. Or create simple colored squares using an image editor
3. Or use online tools like https://www.favicon-generator.org/
EOF

# Create splash.png
cat > assets/splash.png << 'EOF'
This is a placeholder. Please replace with actual image files.
EOF

# Create adaptive-icon.png
cat > assets/adaptive-icon.png << 'EOF'
This is a placeholder. Please replace with actual image files.
EOF

# Create favicon.png
cat > assets/favicon.png << 'EOF'
This is a placeholder. Please replace with actual image files.
EOF

echo "Placeholder asset files created in assets/"
echo "Please replace these with actual image files before building the app."
echo ""
echo "You can copy assets from the main Birda app:"
echo "  cp ../app/assets/images/icon.png assets/icon.png"
echo "  cp ../app/assets/images/splash-icon.png assets/splash.png"

