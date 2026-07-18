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
- **Conftest-first tooling from L5 onward (learner request, 2026-07-18).** Once conftest is
  introduced (L5), use **conftest tooling** for hands-on tasks, not the `opa` CLI. Concretely:
  unit-test with `conftest verify` (+ `test_` rules, `with input as`), NOT `opa test`. The
  "it's just OPA underneath" framing stays (good mental model), but `opa eval`/`opa test` are
  no longer what we hand the learner to run day-to-day. `opa fmt` is the one likely exception
  worth keeping (formatting). MISSION success criterion still literally lists "opa (eval, fmt,
  test)"; left as-is for now since opa underlies conftest — revisit with learner if they want
  the wording changed.
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
      Post-lesson add (learner Q): new §6 "A rule body is the AND of its lines" — motivated by the
      learner asking *where* the empty-list `count` guard goes. Reinforces L1's newline-is-AND;
      shows the guard as an outer body line (not inside `every` braces), notes `some`-rules need no
      guard (empty → `[]`), and empty-as-finding as a policy choice. Added a 3rd quiz + takeaway.
      Preview section renumbered to §7. Distractors verified with opa (inside-braces stays vacuously
      true).
      **Domain shifted here** from generic JSON (age/signup) to a real manifest: a `containers`
      array (image `:latest`, `securityContext.privileged`) — the mission's actual shape. Still
      pure Rego via `opa eval`; still uses `violations` (not conftest `deny`) — conftest is L4.
      All samples verified against `opa` 1.18.2. New reference card
      `reference/iteration-and-strings.html` (some/every table, sprintf verbs, comprehensions,
      legacy `[_]` note). Index + reference list updated.
- [x] **L4 — Comprehensions** (`0004-comprehensions`). DONE.
      **Reorder (2026-07-18, learner-driven):** comprehensions were originally deferred to "a later
      lesson" (after conftest) and only previewed in L3 §7. Learner finished L3 and reported the §7
      preview didn't land — asked to move it to the next lesson and explain it better *if* important.
      It is (reading real `.rego` requires comprehensions; a mission success criterion), so it got a
      full lesson and conftest slid to L5. L3 §7 demoted from a teaching preview to a light
      forward-pointer to L4 (heading + takeaway + nav updated).
      Covers all three forms: set `{v|…}` (dedupe/unordered), array `[v|…]` (keeps order+dups),
      object `{k:v|…}` (keys must be unique → conflict error). Key teaching beats: the distinct-values
      idiom `count([x|…]) == count({x|…})`; comprehension **never undefined** → empty match yields an
      empty collection (contrast the undefined-skips-rule behaviour from L1/L3), so guard with
      `count(…) > 0`; comprehension as a **step inside a rule body** (collect → decide/`sprintf`),
      shown via a single summary finding using `concat(", ", names)`. Same `containers` manifest
      domain as L3 (added `securityContext.privileged` flags). Two quizzes (array-count=3; empty→empty
      set). Reused reference card `iteration-and-strings.html` rather than spawning a duplicate —
      expanded its Comprehensions section (forms table + distinct-idiom/empty callout), subtitle now
      "Lessons 3–4". Index updated.
      NOTE: samples NOT run through opa this session (learner declined the version check; opa assumed
      present). Built to match the already-verified forms in the reference card + Rego v1 semantics;
      worth a quick `opa eval` sanity pass if convenient.
- [x] **L5 — Conftest as "just OPA underneath"** (`0005-conftest-just-opa-underneath`). DONE.
      Reframes `package main` + `deny contains msg if` as the known L2 partial-rule shape (nothing new
      in the Rego). Two "conveniences" framing: (1) conftest parses the config file → `input`
      (no hand-written input.json); (2) rules matched by name (`deny`/`warn`/`violation`) in pkg `main`.
      Domain moved from L3/L4's top-level `input.containers` to a **real k8s Pod** (`input.spec.containers`)
      — turned the path shift into a teaching beat (input = whole parsed file, paths follow its shape;
      reinforces L1). Beats: run `conftest test pod.yaml`; each finding = one FAIL line; **exit code is
      the enforcement point** (ties back to L1 decide-vs-enforce). deny/warn/violation table + exit
      codes (deny=1, warn=0, violation=structured). Rule-name suffixes (`deny_privileged`) for
      coworker-readability (mission: teach onward). Two quizzes (Dockerfile→only paths change;
      warnings→exit 0). New reference card `reference/conftest.html` (convention table, dir layout,
      CLI cheat sheet, output-reading, formats list). Index updated (lesson + ref).
      **SPLIT DECISION:** NOTES originally planned L5 to "fold in `opa test`". Deferred it to L6 to
      keep L5 short/one-win (short-lesson principle in Teaching prefs). L5 ends with a forward-pointer
      note to it. Flag to learner in case they wanted testing bundled here.
      **Post-lesson update (learner, 2026-07-18):** learner asked to test with **`conftest verify`**
      instead of `opa test`, and to favour conftest tooling from here on (see Teaching prefs).
      Updated L5's forward-pointer note (opa test → conftest verify + `test_` rules + `with input as`)
      and added `conftest verify` to the conftest reference-card CLI cheat sheet. L6 retargeted below.
      **All samples VERIFIED** against real `conftest` (dev / OPA 1.15.2) in scratchpad: FAIL lines,
      "2 tests … 2 failures" tally, exit=1 for deny; WARN + exit=0 for warn; suffixed rules collected;
      `-o json` shows `data.main.deny`. (opa 1.18.2 also present.)
- [ ] **L6 — Unit-testing policies with `conftest verify`**: `*_test.rego`, `test_` rules, feeding
      mock `input` via `with input as …`, red/green loop so a coworker's change can't silently break a
      gate. `conftest verify` takes NO input file; exit 0 all-pass / 1 on failure (both verified in
      scratchpad against real conftest). Assert against the finding set, e.g.
      `deny["\"api\" runs privileged"] with input as {…}` and `count(deny) == 0 with input as {…}`.
      (Split out of the original L5 plan; retargeted from `opa test` per learner's conftest-first ask.)
- Deferred (come with/after conftest, not blocking): `input` vs `data` lookup tables;
  composing `allow` from helper rules.
