# PERFORMANCE METRIC DEFINITIONS

### 1. Time to First Byte (TTFB)
- **Definition**: The time elapsed from the client initiation of the HTTP request to the receipt of the first byte of the response packet (`responseStart - requestStart`).
- **Standard Thresholds**: Good: <= 800ms | Needs Improvement: 800ms - 1800ms | Poor: > 1800ms.

### 2. First Contentful Paint (FCP)
- **Definition**: The timestamp when the browser renders the first bit of content from the DOM (text, image, SVG, or canvas).
- **Target**: <= 1.8 seconds.

### 3. Largest Contentful Paint (LCP)
- **Definition**: The time when the largest visible text block or image finishes rendering in the viewport.
- **Target**: <= 2.5 seconds.

### 4. Cumulative Layout Shift (CLS)
- **Definition**: Sum of all unexpected layout shift scores occurring throughout the session lifecycle.
- **Target**: <= 0.1.

### 5. Total Payload Breakdown
- **Compressed Transferred Size**: Actual network bytes transmitted across the wire (accounting for Gzip/Brotli).
- **Decoded Body Size**: Uncompressed in-memory footprint of HTML, JS, CSS, fonts, and WASM binaries.
