# Story 2.7: Media Assets & Static File Serving

**Status:** Pending

**As a** developer,
**I want** a proper media storage strategy for project images and video,
**so that** portfolio projects display rich visual content efficiently.

## Acceptance Criteria

### Media Organization
- [ ] Project media assets organized in `backend/static/images/projects/{project-slug}/` directory structure
- [ ] Video assets organized in `backend/static/videos/projects/{project-slug}/` directory structure
- [ ] Each project has dedicated subdirectory for its media files
- [ ] File naming convention established (e.g., `home.png`, `detail.png`, `demo.mov`)
- [ ] Images optimized for web delivery (compressed, appropriate formats)
- [ ] Video files converted to web-friendly formats (MP4 with H.264 codec)

### Image Optimization
- [ ] Large PNG images (>1MB) compressed or converted to WebP format where appropriate
- [ ] Images resized to appropriate dimensions (max 1920px width for full-screen)
- [ ] Image file sizes reasonable (<500KB for most images, <1MB for hero images)
- [ ] Optimization script or documentation provided for future image additions

### Video Handling
- [ ] MOV file (`Brainstormer Demo.mov`) converted to MP4 format with H.264 codec
- [ ] Video file size optimized (target <5MB for short demo)
- [ ] Video poster image (thumbnail) extracted and saved
- [ ] Video playback tested across browsers (Chrome, Firefox, Safari)

### Backend Static File Serving
- [ ] FastAPI configured to serve static files from `backend/static/` directory
- [ ] Static file endpoint configured for images: `/images/projects/{path}`
- [ ] Static file endpoint configured for videos: `/videos/projects/{path}`
- [ ] Cache headers set appropriately for static assets (long-term caching)

### Database Image References
- [ ] Seed script updated to use correct static file paths
- [ ] Image URLs reference backend static paths (e.g., `/images/projects/star-wars-archive-2/home.png`)
- [ ] Video URL references backend static path (e.g., `/videos/projects/brainstormer/demo.mp4`)
- [ ] Image alt text populated for accessibility
- [ ] Images ordered correctly (order_num field) for gallery display
- [ ] Video poster image reference included in database

### Frontend Integration
- [ ] ProjectDetailModal updated to handle video content (HTML5 `<video>` element)
- [ ] Video player includes controls, poster image, and fallback message
- [ ] Gallery component supports mixed media (images + video)
- [ ] Lazy loading implemented for images in modal gallery
- [ ] Images load correctly from backend static URLs

### Testing & Validation
- [ ] All project images load correctly in modal galleries
- [ ] Video playback works in modal (user-initiated with controls)
- [ ] Static file serving performance tested (response times <100ms)
- [ ] Broken image handling implemented (fallback placeholder or message)
- [ ] Media assets work correctly in both development (local) and after deployment

### Documentation
- [ ] Media asset organization documented in architecture.md
- [ ] Image optimization workflow documented (tools, settings)
- [ ] Video conversion instructions documented (ffmpeg commands)
- [ ] Future media addition process documented

## Task Breakdown

### 1. Create Directory Structure
- [ ] Create `backend/static/` directory
- [ ] Create `backend/static/images/` directory
- [ ] Create `backend/static/videos/` directory
- [ ] Create `backend/static/images/projects/` subdirectory
- [ ] Create `backend/static/videos/projects/` subdirectory

### 2. Map Existing Media Files
- [ ] List all PNG files in `frontend/src/data/projects-data/`
- [ ] List MOV file in `frontend/src/data/projects-data/`
- [ ] Create mapping: filename → project slug → destination path
- [ ] Document mapping in spreadsheet or text file

**Example mapping:**
```
sw-v2-Home.png → star-wars-archive-2 → backend/static/images/projects/star-wars-archive-2/home.png
sw-v2-Films-M.png → star-wars-archive-2 → backend/static/images/projects/star-wars-archive-2/films-mobile.png
Brainstormer Demo.mov → brainstormer → backend/static/videos/projects/brainstormer/demo.mov
```

### 3. Organize Image Files
- [ ] For each project with images:
  - Create `backend/static/images/projects/{slug}/` directory
  - Copy/move PNG files to appropriate directory
  - Rename files to descriptive names (home.png, detail.png, etc.)
- [ ] Document order for each project's images (for order_num in database)

### 4. Image Optimization
- [ ] Identify images >1MB
- [ ] Compress large PNGs using ImageOptim, TinyPNG, or Squoosh
- [ ] Consider converting very large images to WebP (optional for MVP)
- [ ] Verify image quality after optimization
- [ ] Document optimization settings used

### 5. Video Processing
- [ ] Install ffmpeg (if not already installed: `brew install ffmpeg`)
- [ ] Convert `Brainstormer Demo.mov` to MP4:
  ```bash
  ffmpeg -i "Brainstormer Demo.mov" \
    -c:v libx264 -crf 23 -preset medium \
    -c:a aac -b:a 128k \
    backend/static/videos/projects/brainstormer/demo.mp4
  ```
- [ ] Extract poster frame from video:
  ```bash
  ffmpeg -i backend/static/videos/projects/brainstormer/demo.mp4 \
    -ss 00:00:01 -vframes 1 \
    backend/static/images/projects/brainstormer/poster.jpg
  ```
- [ ] Verify video file size (<5MB)
- [ ] Test video playback in browser

### 6. FastAPI Static File Configuration
- [ ] Open `backend/app/main.py`
- [ ] Import StaticFiles from fastapi.staticfiles
- [ ] Mount static directory for images:
  ```python
  app.mount("/images", StaticFiles(directory="static/images"), name="images")
  ```
- [ ] Mount static directory for videos:
  ```python
  app.mount("/videos", StaticFiles(directory="static/videos"), name="videos")
  ```
- [ ] Set appropriate cache headers (Cache-Control)

### 7. Update Seed Script
- [ ] Open `backend/scripts/seed_db.py`
- [ ] For each project, check if images exist in `backend/static/images/projects/{slug}/`
- [ ] Create ProjectImage records with URLs like `/images/projects/{slug}/filename.png`
- [ ] For brainstormer project, add video as ProjectImage with URL `/videos/projects/brainstormer/demo.mp4`
- [ ] Add poster image for video
- [ ] Set order_num for each image (0, 1, 2, etc.)
- [ ] Set descriptive alt_text for each image

### 8. Frontend Video Component
- [ ] Create `frontend/src/components/common/VideoPlayer.tsx`
- [ ] Accept props: src (video URL), poster (poster image URL), alt
- [ ] Render HTML5 `<video>` element:
  ```tsx
  <video controls poster={poster} preload="metadata">
    <source src={src} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  ```
- [ ] Style video player to fit modal width
- [ ] Add loading state
- [ ] Handle playback errors gracefully

### 9. Update ProjectDetailModal
- [ ] Open `frontend/src/components/projects/ProjectDetailModal.tsx`
- [ ] Check project.images for video files (URL ends with .mp4 or .mov)
- [ ] Render VideoPlayer component for video files
- [ ] Render regular `<img>` for image files
- [ ] Support mixed media galleries (images + video)
- [ ] Add lazy loading to images (`loading="lazy"`)

### 10. Test Static File Serving
- [ ] Start backend server
- [ ] Test image URL in browser: `http://localhost:8000/images/projects/star-wars-archive-2/home.png`
- [ ] Test video URL in browser: `http://localhost:8000/videos/projects/brainstormer/demo.mp4`
- [ ] Verify images load in frontend when viewing projects
- [ ] Verify video plays in modal when clicked
- [ ] Check browser DevTools Network tab for response times

### 11. Lazy Loading Implementation
- [ ] Add `loading="lazy"` attribute to all `<img>` tags in modal
- [ ] Consider using Intersection Observer for more control (optional)
- [ ] Test lazy loading by scrolling through image gallery
- [ ] Verify images load as they come into viewport

### 12. Error Handling
- [ ] Handle missing images (broken src) with fallback placeholder
- [ ] Handle video loading errors with user-friendly message
- [ ] Log errors to console for debugging
- [ ] Display "Image not available" message if image fails to load

### 13. Documentation
- [ ] Update `backend/README.md` with static file serving info
- [ ] Document directory structure in `docs/architecture.md`
- [ ] Create `docs/MEDIA-OPTIMIZATION.md` with:
  - Image optimization workflow
  - ffmpeg video conversion commands
  - How to add new media files
  - File naming conventions
  - Performance guidelines

### 14. Verification
- [ ] All images display correctly in project modals
- [ ] Video plays correctly in brainstormer project modal
- [ ] Static file URLs return 200 OK
- [ ] Image/video response times <100ms
- [ ] Lazy loading works (images load on scroll)
- [ ] Video has poster image before playback
- [ ] Error handling works for missing media
- [ ] Total static media size is reasonable (<50MB)

## Files to Create

- `/backend/static/images/projects/{slug}/*.png` - Project images
- `/backend/static/videos/projects/{slug}/*.mp4` - Project videos
- `/frontend/src/components/common/VideoPlayer.tsx` - Video component
- `/docs/MEDIA-OPTIMIZATION.md` - Media guidelines

## Files to Modify

- `/backend/app/main.py` - Add static file mounts
- `/backend/scripts/seed_db.py` - Add image/video references
- `/frontend/src/components/projects/ProjectDetailModal.tsx` - Support video

## Dependencies

- Story 2.2 complete (ProjectImage model exists)
- Story 2.4 complete (Frontend can fetch API data)
- ffmpeg installed for video conversion
- Image optimization tools (ImageOptim, Squoosh, etc.)

## Technical Notes

### FastAPI Static Files
```python
from fastapi.staticfiles import StaticFiles

app.mount("/images", StaticFiles(directory="static/images"), name="images")
app.mount("/videos", StaticFiles(directory="static/videos"), name="videos")
```

### Video Conversion (ffmpeg)
```bash
# Convert MOV to MP4 with H.264
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# Extract poster frame at 1 second
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 output-poster.jpg

# Check video file size
ls -lh output.mp4
```

### Image Optimization Tools
- **ImageOptim** (Mac): Drag-and-drop PNG/JPEG optimization
- **Squoosh** (Web): https://squoosh.app - online image optimizer
- **TinyPNG** (Web): https://tinypng.com - PNG/JPEG compression
- **Sharp** (Node.js): Programmatic image processing

### HTML5 Video Player
```tsx
<video
  controls
  poster="/images/projects/brainstormer/poster.jpg"
  preload="metadata"
  className="w-full rounded-lg"
>
  <source src="/videos/projects/brainstormer/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

### Performance Targets
- Image files: <500KB each (except hero images <1MB)
- Video files: <5MB
- Static file response time: <100ms
- Total static assets: <50MB
