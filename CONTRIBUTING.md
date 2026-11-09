# CONTRIBUTING TO 12 STACKS. 1 PRODUCT.

We welcome contributions to add new language stacks, optimize existing implementations, or refine performance benchmarks.

## Contribution Guidelines
1. **Fidelity to Product**: Any new implementation must accurately consume `/shared/content/` and match the obsidian resume design tokens in `/shared/design/design-tokens.json`.
2. **Idiomatic Architecture**: Use the native conventions of your chosen framework. Do not force generic patterns where native idioms exist.
3. **No Fabricated Benchmarks**: All metrics submitted must be generated via reproducible scripts recorded under identical hardware conditions.
4. **Pull Request Protocol**:
   - Create a feature branch: `git checkout -b feat/stack-elixir-phoenix`
   - Verify responsive design at viewports 360px through 1920px.
   - Run `npm run typecheck` and `npm run build`.
   - Submit PR with screenshot proof and performance telemetry.
