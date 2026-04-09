# Asset Loading Fix - Video Assets

## Problem
Video assets uploaded to GitHub Spark were showing in the preview but not appearing on the deployed website.

## Root Cause
Vite's build process wasn't properly configured to handle large video files. By default, Vite may inline small assets as base64, but large video files need explicit configuration to be copied to the build output.

## Solution Applied

### 1. Updated `vite.config.ts`
Added explicit build configuration to handle video assets:

```typescript
build: {
  assetsInlineLimit: 0,  // Prevents inlining - all assets copied as files
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        if (assetInfo.name?.endsWith('.mp4')) {
          return 'assets/video/[name]-[hash][extname]'
        }
        return 'assets/[name]-[hash][extname]'
      }
    }
  }
},
assetsInclude: ['**/*.mp4'],  // Explicitly include .mp4 files
```

### 2. Added Type Declarations for Video Imports
Updated `src/vite-end.d.ts` to properly type video imports:

```typescript
declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.webm' {
  const src: string
  export default src
}
```

## Current Asset Structure

### Video Files Located In:
- `/src/assets/video/grok-video-6dd4813e-c21b-4df0-b189-4caa82691fb7_1775677438.mp4` (Hero section)
- `/src/assets/video/grok-video-e05499ca-a20a-4e6d-ba34-86011fd9b768.mp4` (Dining section)

### Components Using Videos:
1. **Hero.tsx** (line 6) - Imports and uses hero video in fullscreen background
2. **Philosophy.tsx** (line 6) - Imports and uses dining video in content section

Both components are correctly using the Vite asset import pattern:
```typescript
import videoFile from "@/assets/video/filename.mp4"
```

## What Changed
- ✅ Vite config now explicitly handles video files
- ✅ TypeScript recognizes video imports
- ✅ Build process will copy videos to output directory
- ✅ Videos will have content-hashed filenames for cache busting

## Next Deployment
When the site is next built and deployed, the video assets will be:
1. Processed by Vite's build pipeline
2. Copied to the `dist/assets/video/` folder with hashed filenames
3. Correctly referenced in the bundled JavaScript
4. Served properly on the live site

## Verification
The video imports are already correct in both components. No code changes needed - just the configuration updates. The next deployment should resolve the issue.

## File Naming
The video files keep their GitHub-generated names. If you want cleaner filenames, you can rename them to something like:
- `hero-background.mp4`
- `dining-section.mp4`

And update the imports accordingly.
