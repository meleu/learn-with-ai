# Working Notes

## Learner profile

- Experienced DevOps engineer; owns CI/CD pipelines for hundreds of microservices.
- Very comfortable with CLIs, YAML, JSON, containers. New to Rego's declarative model.
- Explicit dual goal: learn AND teach coworkers → prize transferable mental models and clarity over clever one-liners.

## Teaching preferences

- Ground every claim in RESOURCES.md sources; cite inline in lessons.
- Use OPA 1.0 / Rego v1 syntax everywhere (`if`, `contains`). Never post deprecated syntax.
- Lessons stay short; one win each; tight edit-run-observe feedback loops.
- At the end of each lesson, list the main takeaways of the lesson in concise bullet points.
- **Teach pure Rego with `opa` first; defer conftest.** Lesson 1 (and early lessons) must
  focus on the language itself, evaluated via `opa eval`/`opa run` — not conftest's
  `deny`/`warn` convention. Conftest is introduced only after the Rego fundamentals are
  solid, framed as "just OPA underneath". Example domain for fundamentals: age validation
  / generic JSON, not pipeline manifests, to keep working memory low.
- **Never touch the learner's code files — no creating *and no editing*.**
- Everything under `exercises/` belongs to the learner. Never write into
  `exercises/` directly — not even to fix, improve, or keep it in sync with lesson's samples.

## Tooling / setup

- Tool installs: prefer Homebrew (even on Linux)
- Assume `opa` and `conftest` are already installed in the learner's environment.

## State

- Fresh restart (branch `restart-rego`); prior workspace files were deleted and rebuilt from scratch.
- Lesson 1 covers the three opening questions (why / what-is-a-.rego / tools) via pure Rego
  - `opa eval`, using an age-validation example (true / false-via-default / undefined).
  Conftest deferred to a single "coming later" note.
- Lesson 2 (`0002-partial-rules-sets-of-findings`) covers **partial set rules**
  (`violations contains msg if …`): union across same-named defs, empty set `[]` vs
  complete-rule `undefined`, folding back to a verdict with `count() > 0`. Explicitly framed
  as the shape of conftest `deny`. Domain: a `signup` validator (age + username), generic JSON.
  Code lives in the lesson for the learner to type themselves.
  New reference card `reference/rule-types.html` (complete vs partial, side by side).
  Added reusable `table` styling to `assets/style.css`.
  - Refinement (2026-07-18): L2 §5 no longer *teaches* conftest conventions (removed the
    `package main` / `deny contains msg` code block, the "how conftest collects the set"
    mechanics, and the conftest-behavior quiz) — that's L4 material. §5 is now a light
    forward-pointer ("collect findings → fold to verdict" shape; tooling covered later,
    framed as "just OPA underneath"). Motivational "this is the shape conftest's deny is
    built from" framing kept in subtitle/win, but no convention detail before L4.

## Sequence to conftest (refined 2026-07-18)

Decided with learner: 2 more pure-Rego lessons before conftest, ordered so each removes a
specific piece of conftest's mystery. The one non-negotiable gap was partial rules (done, L2).

- [x] **L2 — Partial rules / sets of findings** (the on-ramp to `deny`). DONE.
- [x] **L3 — Iterating over config** (`0003-iterating-over-config`). DONE.
      `some … in` fans out a partial rule → one finding per bad item; `sprintf` verbs
      (`%q`/`%s`/`%d`/`%v`) for detailed messages; multi-condition bodies over nested `input`
      (privileged check, with the missing-nested-field-is-undefined safety reinforced from L1);
      `every` as the mirror of `some` + the empty-list vacuous-truth gotcha (guard with `count`).
      Comprehensions shown only as a one-line preview (deferred to a later lesson).
      **Domain shifted here** from generic JSON (age/signup) to a real manifest: a `containers`
      array (image `:latest`, `securityContext.privileged`) — the mission's actual shape. Still
      pure Rego via `opa eval`; still uses `violations` (not conftest `deny`) — conftest is L4.
      All samples verified against `opa` 1.18.2. New reference card
      `reference/iteration-and-strings.html` (some/every table, sprintf verbs, comprehensions,
      legacy `[_]` note). Index + reference list updated.
- [ ] **L4 — Conftest as "just OPA underneath"**: reframe `package main` + `deny contains msg if`
      as known shapes; run on a real YAML/Dockerfile. Fold in `opa test` here.
- Deferred (come with/after conftest, not blocking): `input` vs `data` lookup tables;
  composing `allow` from helper rules.
