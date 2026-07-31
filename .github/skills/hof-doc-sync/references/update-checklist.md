# HOF documentation sync checklist

Use this checklist when implementing updates from framework diffs.

1. Confirm diff range and changelog context are correct.
2. Group changed files by concern:
   - routing and lifecycle
   - fields/components/behaviours
   - validation/formatting/translations
   - sessions/security/operations
   - build/deploy/runtime requirements
3. Map each concern to existing guide pages.
4. Update examples where behaviour contracts changed.
5. Add troubleshooting notes for newly observed failure modes.
6. Keep language plain and precise (UK English).
7. Validate:
   - `yarn build`
   - link integrity on edited pages
8. Provide a change summary and any open questions for human review.
