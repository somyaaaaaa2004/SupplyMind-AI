# public/

Static assets served directly by Next.js.

## Structure

```
public/
├── icons/        # App icons (favicon, apple-touch-icon, etc.)
├── images/       # Static images (logo, og-image, etc.)
└── fonts/        # Self-hosted fonts (if not using next/font)
```

## Notes

- Files here are served at the root path: `public/logo.svg` → `/logo.svg`
- Optimize images with `next/image` whenever possible.
- Generate favicon set from https://realfavicongenerator.net/
