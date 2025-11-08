# Icons in QShare.js

## 🎨 Use Material Symbols Icons

The project uses **Material Symbols Icons** through the `Icon` component from `material-react`. This provides access to **2000+ professional icons** from Google.

## Quick Start

```jsx
import { Icon } from 'material-react';

// Basic usage
<Icon name="home" />
<Icon name="qr_code" />
<Icon name="share" />

// Filled variant
<Icon name="favorite" filled />

// Different styles
<Icon name="settings" variant="outlined" />
<Icon name="menu" variant="sharp" />
```

## Material Symbols Advantages

✅ **2000+ icons** - huge library of ready-to-use icons
✅ **Three styles** - Rounded, Outlined, Sharp
✅ **Filled/Unfilled** - dynamic state switching
✅ **Variable Fonts** - fast loading, smooth animation
✅ **Professional quality** - from Google Material Design

## Finding Icons

Find the icon you need at [Google Fonts Icons](https://fonts.google.com/icons):

1. Open the website
2. Search for your icon (e.g., "qr code")
3. Copy the name (e.g., `qr_code_2`)
4. Use in code: `<Icon name="qr_code_2" />`

## Custom SVG Icons (if needed)

If you need a **custom SVG icon** that's not in Material Symbols:

### Step 1: Add SVG File

Place the SVG in this folder (`src/assets/icons/`):

```
src/assets/icons/
  └── custom-logo.svg
```

### Step 2: Import in Component

```jsx
import CustomLogo from "../assets/icons/custom-logo.svg?react";

// Use as React component
<CustomLogo style={{ width: 24, height: 24 }} />;
```

### SVG Requirements

- **viewBox**: `viewBox="0 0 24 24"` for proper scaling
- **currentColor**: use `fill="currentColor"` for CSS coloring
- **Optimization**: minimize size via [SVGO](https://jakearchibald.github.io/svgomg/)

## Recommendations

💡 **Check Material Symbols first** - the icon you need is probably already there
💡 **Use filled for active states** - improves UX
💡 **Keep consistent style** - choose one variant (rounded/outlined/sharp)
💡 **Custom SVG only if necessary** - Material Symbols covers 99% of cases

## Documentation

See more:

- `/src/components/ICONS_USAGE.md` - complete usage guide
- `/material-react/README.md` - library documentation
- [Google Fonts Icons](https://fonts.google.com/icons) - icon catalog
