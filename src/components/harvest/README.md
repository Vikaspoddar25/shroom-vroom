# Harvest scroll story

The homepage uses a scroll-pinned editorial scene to show the real oyster mushroom harvest. A farm photo
receives a restrained scroll-linked pan and zoom while one caption at a time advances through the story.
The photo and visible copy remain standard DOM content; no video or WebGL download is needed.

## How it works

`harvest-section.tsx` owns the pinned scene and progress timeline. Framer Motion maps scroll progress to a
restrained photo transform and reveals one caption at a time, followed by the shop call to action. The
existing Pexels image is served through Next Image, with a responsive static layout for reduced motion.

Copy lives in `src/lib/lang.tsx` under `harvest.*` in English and Hindi.

## Performance and accessibility

1. The photo is optimized by Next Image and the scene does not create a WebGL context.
2. The photo and current caption remain in the DOM; reduced-motion users get a non-pinned layout with every story beat.
3. The earlier procedural 3D experiment remains in this folder but is no longer loaded by the homepage.
