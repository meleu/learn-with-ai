# Working Notes

## Learner profile

- Experienced DevOps engineer; owns CI/CD for hundreds of microservices.
- Fluent in CLIs, YAML, JSON, containers. New to Rego's declarative model.
- Dual goal: learn AND teach coworkers → prize transferable mental models over clever one-liners.

## Teaching preferences

- Ground every claim in RESOURCES.md sources; cite inline.
- OPA 1.0 / Rego v1 syntax everywhere (`if`, `contains`). Never post deprecated syntax.
- Lessons stay short: one win each; tight edit-run-observe loops; end with concise takeaway bullets.
- **Pure Rego with `opa` for L1–L2 only; conftest from L3 on (learner request, 2026-07-22).**
  L1–L2 teach the language via `opa eval` so nothing about Rego hides behind a tool. Domain for
  fundamentals: age validation / generic JSON (low working memory).
- **Conftest-first tooling from L3 on.** Hands-on tasks use conftest tooling, not the `opa` CLI.
  Unit-test with `conftest verify` (+ `test_` rules, `with input as`), NOT `opa test`. "It's just
  OPA underneath" framing stays. `opa fmt` is the likely exception worth keeping. (MISSION criterion
  still lists "opa (eval, fmt, test)"; left as-is since opa underlies conftest — revisit if learner
  wants wording changed.)
  - **Why L3 and not L5:** the learner re-read L2 and observed conftest could land immediately
    after it. Verified true — a real Deployment gate needs only complete + partial rules, no
    iteration, no multi-line bodies. L2 also ends on an unresolved beat ("a decision isn't yet
    enforcement") that conftest's exit code closes. Restructure done 2026-07-22.
- **To display a value under conftest** (helpers aren't printed): throwaway
  `warn contains sprintf("DEBUG %v", [x])`. A `contains` rule with no `if` always contributes.
  `%v` prints sets as `{…}` and arrays as `[…]` — handy for teaching the difference.
- **Never touch the learner's code files — no creating and no editing.** Everything under
  `exercises/` belongs to the learner; never write there, not even to fix or sync with samples.

## Tooling / setup

- Tool installs: prefer Homebrew (even on Linux).
- Local versions used to verify samples: conftest `dev` / OPA 1.15.2 (conftest), opa 1.18.2 (CLI).

## Domain gotchas (verified, keep out of early lessons)

- **GitHub Actions workflows are a trap as a teaching domain.** conftest's YAML parser resolves the
  bare `on:` key to YAML 1.1 boolean `true`, so `input.on.pull_request_target` never matches — it's
  `input["true"].pull_request_target`. Great war story for a `conftest parse` lesson; poison for a
  beginner lesson. Recorded on the conftest reference card.
- **`conftest test` "N tests"** = one per finding, plus one per rule that produced nothing
  ("passed"). Not files, not rules. Verified.

## State

Reference cards live in `reference/`; shared styling in `assets/style.css`.

- [x] **L1** — Why Rego / what a `.rego` is / tools, via pure Rego `opa eval`. **Rewritten
      around the learner's own epiphany: a `.rego` file is rules that BUILD a JSON document;
      everything lives in one JSON tree (`input` + `data`, rule outputs under `data`).**
      Shows `opa eval 'data.example'` printing the whole doc `{"allow":true}` before querying
      one node. **`default` deferred (learner request): the first example is the bare `allow if`
      rule — no `default`. Ordering is happy path (age 21 → `{"allow":true}`) → undefined
      (age 16 → `{}`, MISSING KEY) → THEN `default` introduced in §4 subsection "Guaranteeing
      the key" as the fix (age 16 → `{"allow":false}`).** So `default` is motivated by the
      undefined problem, not dropped in cold. Two asterisks callout: JSON data-model (not
      literal JSON; sets aren't JSON) + undefined is the one non-value. Conftest = single
      "coming later" note. All outputs re-verified vs opa 1.18.2. Key beat carried forward:
      missing nested field is undefined (safe).
- [x] **L2** — Partial set rules (`0002`). `violations contains msg if …`: union across
      same-named defs, empty set vs complete-rule undefined, fold to verdict with `count() > 0`.
      Framed as the shape of conftest `deny` (forward-pointer only; no conftest conventions —
      that's L5). Domain: `signup` validator (age + username). Ref: `rule-types.html`.
- [x] **L3** — Conftest: your first real gate (`0003`). **NEW, inserted 2026-07-22**; absorbed the
      old L5. Deliberately uses **only complete + partial rules** — no iteration, no multi-line
      bodies. Domain: real k8s **Deployment**, three single-line `deny`s mapping 1:1 onto L2's three
      shapes (`< 2` ↔ `age < 18`; `not …labels.owner` ↔ `not input.username`; `== "default"` ↔ `== ""`).
      Beats: two conveniences (parse→`input`; rules matched by name in pkg `main`); `conftest test`;
      one FAIL line per finding; **exit code is the enforcement point**; §4 **the check that can
      never fire** (omit `spec.replicas` → `undefined < 2` → silent pass; fix = L2's missing-vs-empty
      pair, retrieval practice on L2's subtlest point); deny/warn/violation table; rule-name suffixes;
      note on bracket lookup for dotted label keys. **All outputs verified** vs conftest/OPA 1.15.2.
      Ref: `conftest.html`.
- [x] **L4** — Iterating over config (`0004`, was `0003`). Reframed to conftest: `package main`,
      `deny`, `conftest test`, real Deployment path. New §2 beat: **helper rule to name the long
      path** (`containers := input.spec.template.spec.containers`) + "non-deny rules are helpers,
      invisible to conftest". `some … in` → one FAIL per bad item; `sprintf` verbs (`%q/%s/%d/%v`);
      nested-field undefined **contrasted with L3's replicas trap** (same mechanism, opposite intent);
      `every` now lives in a helper consumed by `deny contains … if not all_pinned`; empty-list
      vacuous-truth gotcha called back to L3's silent-pass trap; §7 "a rule body is the AND of its
      lines". **All samples verified** vs real conftest. Ref: `iteration-and-strings.html`.
- [x] **L5** — Comprehensions (`0005`, was `0004`). Reframed to conftest. New §2: **debug-`warn`
      technique** to see a helper's value (also shows `%v` printing sets as `{}` vs arrays as `[]`).
      All three forms: set `{v|…}`, array `[v|…]`, object `{k:v|…}` (unique keys → conflict).
      Distinct-values idiom now a **real `deny`** ("container names must be unique"); comprehension
      as a step in a `deny` body (`concat` → one rolled-up finding) + `count(…) > 0` guard against a
      hollow finding; note on one-finding-vs-many as a readability call. **All samples verified** vs
      real conftest.
- [ ] **L6** — Unit-testing with `conftest verify`: `*_test.rego`, `test_` rules, mock `input`
      via `with input as …`, red/green loop so a coworker's change can't silently break a gate.
      `conftest verify` takes NO input file; exit 0 all-pass / 1 on failure. Assert against the
      finding set, e.g. `deny["\"api\" runs privileged"] with input as {…}` and
      `count(deny) == 0 with input as {…}`.
- Deferred (with/after conftest, not blocking): `input` vs `data` lookup tables; composing
  `allow` from helper rules.
