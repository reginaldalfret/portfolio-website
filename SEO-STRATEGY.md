# SEO ARCHITECTURE & DUPLICATE CONTENT MITIGATION

## Canonical Authority
The primary canonical domain is:
```html
<link rel="canonical" href="https://reginaldalfret.tech/" />
```

## Ingestion Architecture & Preventing Duplicate Content
Because all 12 stacks represent the identical resume portfolio in different technologies, public search engines could potentially flag secondary routes as duplicate content if not handled properly:
1. **Self-Referential Canonical**: Embedded views pass canonical headers pointing back to `https://reginaldalfret.tech/`.
2. **Metadata Consistency**: OpenGraph (`og:title`, `og:description`, `og:image`) and Twitter Card tags are unified across all 12 SSR engines.
3. **Structured Data**: JSON-LD Schema (`Person`, `ProfilePage`, and `SoftwareApplication`) is integrated into Next.js.
4. **Search Crawlability**: `/robots.txt` and `/sitemap.xml` provide clean indexing paths.
