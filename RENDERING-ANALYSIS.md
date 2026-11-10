# RENDERING ARCHITECTURE ANALYSIS

### 1. Server-Side Rendered Native Binaries (Buffalo & Vapor)
- **Mechanism**: The application compiles directly to native machine code. Requests trigger template compilation with zero VM overhead, achieving sub-50ms TTFBs.

### 2. Pure MVT / MVC Server Renders (Django, Spring Boot, Laravel, Rails)
- **Mechanism**: Pre-rendered HTML partials with zero client JavaScript hydration overhead. Fast initial paints and low memory consumption.

### 3. Edge-Hydrated React Server Components (Next.js 14)
- **Mechanism**: Hybrid execution. Edge streaming delivers non-blocking chunks; server components remain on the server, minimizing client bundle overhead.

### 4. Client-Side WebAssembly (Leptos & Blazor)
- **Mechanism**: Compiles Rust/C# code into WASM binaries. Leptos achieves minimal payload (~92KB) due to zero-cost abstractions, while Blazor transfers the .NET runtime DLLs.
