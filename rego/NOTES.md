# Working Notes

## Learner profile

- Experienced DevOps engineer; owns CI/CD pipelines for hundreds of microservices.
- Very comfortable with CLIs, YAML, JSON, containers. New to Rego's declarative model.
- Explicit dual goal: learn AND teach coworkers → prize transferable mental models and clarity over clever one-liners.

## Teaching preferences

- Ground every claim in RESOURCES.md sources; cite inline in lessons.
- Use OPA 1.0 / Rego v1 syntax everywhere (`if`, `contains`). Never post deprecated syntax.
- Lessons stay short; one win each; tight edit-run-observe feedback loops.
- **Teach pure Rego with `opa` first; defer conftest.** Lesson 1 (and early lessons) must
  focus on the language itself, evaluated via `opa eval`/`opa run` — not conftest's
  `deny`/`warn` convention. Conftest is introduced only after the Rego fundamentals are
  solid, framed as "just OPA underneath". Example domain for fundamentals: age validation
  / generic JSON, not pipeline manifests, to keep working memory low.

## Tooling / setup

- Tool installs: prefer Homebrew (even on Linux)

## State

- Fresh restart (branch `restart-rego`); prior workspace files were deleted and rebuilt from scratch.
- Lesson 1 covers the three opening questions (why / what-is-a-.rego / tools) via pure Rego
  - `opa eval`, using an age-validation example (true / false-via-default / undefined).
  Conftest deferred to a single "coming later" note.

## Candidate next lessons (Rego-first, conftest last)

1. Rule bodies in depth: multiple conditions (AND), navigating nested `input`, array indexing.
2. Composing rules: `allow` built from helper rules; when to use `default`.
3. `input` vs `data`: shared lookup lists (legal minimum age, approved values).
4. Unit-testing with `opa test` for coworker trust.
5. THEN conftest: applying the above to real config files in the pipeline.
