# BENCHMARK LIMITATIONS & SCIENTIFIC BOUNDARIES

1. **Synthetic vs Real-User Telemetry**: These laboratory measurements use automated headless browsers under controlled conditions. Real user conditions involve heterogeneous client hardware, cellular throttling, and diverse physical geographic locations.
2. **Interaction to Next Paint (INP)**: True INP is a field metric derived from genuine user sessions over time. Our harness records synthetic scripted interaction latency to avoid fabricating INP values.
3. **CDN Caching Uniformity**: All 12 stacks reside behind the Vercel Edge network. While this normalizes network latency, native standalone container runs on raw hardware may exhibit different local compute advantages.
4. **No Universal Framework Winner**: A framework delivering faster FCP for a resume document does not imply universal superiority for high-concurrency transactional database workloads.
