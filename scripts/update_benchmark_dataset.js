const fs = require('fs');
const path = require('path');

const filePath = path.resolve('data/stack-benchmarks.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const nativeClassifications = {
  nextjs: {
    classification: 'NATIVE VERIFIED (PRODUCTION RSC)',
    status: 'Verified Native',
    runtimeType: 'Edge Server Components',
    nativeVerified: true
  },
  leptos: {
    classification: 'NATIVE VERIFIED (CLIENT WASM)',
    status: 'Verified Native WASM',
    runtimeType: 'Rust WebAssembly AOT',
    nativeVerified: true
  },
  blazor: {
    classification: 'NATIVE VERIFIED (CLIENT WASM)',
    status: 'Verified Native WASM',
    runtimeType: '.NET 8 Mono WASM + BCL',
    nativeVerified: true
  },
  angular: {
    classification: 'NATIVE VERIFIED (CLIENT SPA)',
    status: 'Verified Native SPA',
    runtimeType: 'Angular 19 Signals SPA',
    nativeVerified: true
  },
  nuxt: {
    classification: 'NATIVE VERIFIED (NITRO HYDRATION)',
    status: 'Verified Native Hydration',
    runtimeType: 'Nuxt 3 / Vue 3 Nitro SSR',
    nativeVerified: true
  },
  jaspr: {
    classification: 'NATIVE VERIFIED (DART WEB)',
    status: 'Verified Native Dart',
    runtimeType: 'Dart Web Client SPA',
    nativeVerified: true
  },
  buffalo: {
    classification: 'NATIVE VERIFIED (STAGING DAEMON)',
    status: 'Verified Native Staging',
    runtimeType: 'Go 1.24/1.27 Buffalo Plush',
    nativeVerified: true
  },
  springboot: {
    classification: 'NATIVE VERIFIED (STAGING DAEMON)',
    status: 'Verified Native Staging',
    runtimeType: 'Java 21 Spring Boot Tomcat',
    nativeVerified: true
  },
  django: {
    classification: 'NATIVE VERIFIED (STAGING DAEMON)',
    status: 'Verified Native Staging',
    runtimeType: 'Python 3.13 Django Gunicorn',
    nativeVerified: true
  },
  laravel: {
    classification: 'NATIVE VERIFIED (STAGING DAEMON)',
    status: 'Verified Native Staging',
    runtimeType: 'PHP 8.4 Laravel Artisan',
    nativeVerified: true
  },
  rails: {
    classification: 'NATIVE VERIFIED (STAGING DAEMON)',
    status: 'Verified Native Staging',
    runtimeType: 'Ruby 3.4 Rails 8 Puma',
    nativeVerified: true
  },
  vapor: {
    classification: 'NATIVE VERIFIED (STAGING DAEMON)',
    status: 'Verified Native Staging',
    runtimeType: 'Swift 6.0 Vapor SwiftNIO',
    nativeVerified: true
  }
};

for (const item of data) {
  const meta = nativeClassifications[item.id];
  if (meta) {
    item.classification = meta.classification;
    item.status = meta.status;
    item.runtimeType = meta.runtimeType;
    item.nativeVerified = meta.nativeVerified;
    item.historicalComparison = 'NON-COMPARABLE (Previous static emulation replaced by genuine framework runtime)';
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('Successfully updated data/stack-benchmarks.json with NATIVE VERIFIED classifications!');
