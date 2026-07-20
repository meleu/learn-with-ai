# Working Notes

## Learner profile

- Experienced DevOps engineer; owns CI/CD for hundreds of microservices.
- Fluent in CLIs, YAML, JSON, containers. New to Rego's declarative model.
- Dual goal: learn AND teach coworkers → prize transferable mental models over clever one-liners.

## Teaching preferences

- Ground every claim in RESOURCES.md sources; cite inline.
- OPA 1.0 / Rego v1 syntax everywhere (`if`, `contains`). Never post deprecated syntax.
- Lessons stay short: one win each; tight edit-run-observe loops; end with concise takeaway bullets.
- **Pure Rego with `opa` first (L1–L4), conftest deferred to L5.** Early lessons teach the
  language via `opa eval`/`opa run`, not conftest's `deny`/`warn` convention. Domain for
  fundamentals: age validation / generic JSON (low working memory).
- **Conftest-first tooling from L5 on (learner request).** Once conftest lands (L5), hands-on
  tasks use conftest tooling, not the `opa` CLI. Unit-test with `conftest verify` (+ `test_`
  rules, `with input as`), NOT `opa test`. "It's just OPA underneath" framing stays. `opa fmt`
  is the likely exception worth keeping. (MISSION criterion still lists "opa (eval, fmt, test)";
  left as-is since opa underlies conftest — revisit if learner wants wording changed.)
- **Never touch the learner's code files — no creating and no editing.** Everything under
  `exercises/` belongs to the learner; never write there, not even to fix or sync with samples.

## Tooling / setup

- Tool installs: prefer Homebrew (even on Linux).

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
- [x] **L3** — Iterating over config (`0003`). `some … in` fans a partial rule → one finding
      per bad item; `sprintf` verbs (`%q/%s/%d/%v`); multi-condition bodies over nested `input`
      (privileged check); `every` as mirror of `some` + empty-list vacuous-truth gotcha (guard
      with `count`). §6 "a rule body is the AND of its lines" (guard goes as an outer body line,
      not inside `every` braces; `some`-rules need no guard). Comprehensions = light pointer to L4.
      **Domain shifts here** to a real `containers` array (`:latest`, `securityContext.privileged`)
      — the mission's shape. Still pure Rego / `violations`. Verified vs opa 1.18.2.
      Ref: `iteration-and-strings.html`.
- [x] **L4** — Comprehensions (`0004`). All three forms: set `{v|…}` (dedupe/unordered),
      array `[v|…]` (keeps order+dups), object `{k:v|…}` (unique keys → conflict error). Beats:
      distinct-values idiom `count([x|…]) == count({x|…})`; comprehension is **never undefined**
      → empty match = empty collection (contrast undefined-skips-rule), so guard `count(…) > 0`;
      comprehension as a step in a rule body (collect → decide/`sprintf`, e.g. `concat`). Same
      `containers` domain as L3. Ref: expanded `iteration-and-strings.html` (now "Lessons 3–4").
      NOTE: samples NOT run through opa this session — worth a quick `opa eval` sanity pass.
- [x] **L5** — Conftest as "just OPA underneath" (`0005`). Reframes `package main` +
      `deny contains msg if` as the known L2 partial-rule shape (no new Rego). Two conveniences:
      (1) conftest parses the config → `input` (no hand-written input.json); (2) rules matched by
      name (`deny`/`warn`/`violation`) in pkg `main`. Domain → real k8s Pod (`input.spec.containers`);
      path shift used as a teaching beat (input = whole parsed file). Beats: `conftest test pod.yaml`;
      each finding = one FAIL line; **exit code is the enforcement point**. deny/warn/violation +
      exit-code table (deny=1, warn=0, violation=structured). Rule-name suffixes (`deny_privileged`)
      for coworker readability. Ends with forward-pointer to L6 (`conftest verify`). Ref: `conftest.html`.
      **All samples verified** vs real conftest (OPA 1.15.2).
- [ ] **L6** — Unit-testing with `conftest verify`: `*_test.rego`, `test_` rules, mock `input`
      via `with input as …`, red/green loop so a coworker's change can't silently break a gate.
      `conftest verify` takes NO input file; exit 0 all-pass / 1 on failure. Assert against the
      finding set, e.g. `deny["\"api\" runs privileged"] with input as {…}` and
      `count(deny) == 0 with input as {…}`.
- Deferred (with/after conftest, not blocking): `input` vs `data` lookup tables; composing
  `allow` from helper rules.
