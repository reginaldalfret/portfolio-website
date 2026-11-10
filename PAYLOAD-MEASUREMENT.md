# PAYLOAD MEASUREMENT & NETWORK HARNESS SPECIFICATION

## Accounting Rules
To ensure payload transparency:
1. **Full Network Interception**: All network responses during initial navigation are categorized by MIME type and file extension.
2. **Transfer vs Decoded**: Both `content-length` (transfer) and `body.length` (decoded) are tracked.
3. **Categorization**:
   - `HTML`: Document markup payload.
   - `JavaScript`: Client script bundles and worker threads.
   - `CSS`: Stylesheets and font declarations.
   - `WASM`: Compiled WebAssembly bytecode (.wasm).
   - `Images`: SVG logos, PNGs, WebP icons.
   - `Fonts`: WOFF2 and TTF web font assets.
