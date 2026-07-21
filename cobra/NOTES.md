# Working Notes

## Learner profile

- Knows basic Go syntax. Has written Go tests, but is **new to test-first TDD** — wants the
  red-green-refactor discipline made explicit.
- Goal is dual: **ship CLI tools at work** (coworkers install & run them) **and deepen Go stdlib
  fluency**. Prize idiomatic, testable, well-behaved tools over cleverness.
- Comfortable on the CLI (bash, Linux). Go 1.26 installed (`go1.26.1`).

## Teaching preferences

- **TDD is the spine.** Every feature starts from a failing test. Show the RED (failing/compile
  error) output literally, then GREEN, then REFACTOR. Never present code without the test that drove it.
- **clig.dev is the CLI north star.** Cite it for UX decisions (stdout/stderr, exit codes, pipes).
- **Cobra is deferred** until a tool genuinely needs flags/subcommands. Stdlib first (`flag` before Cobra).
- Modern stdlib only: `math/rand/v2` (not v1), `t.Run` subtests, table-driven tests. No deprecated APIs.
- Lessons stay short: one tangible win each; tight red→green→refactor loops; concise takeaways.
- **Verify every command and output** in a scratch build before putting it in a lesson (done for L1).
- Ground claims in RESOURCES.md; cite inline.

## Learner-owns-the-code convention (mirrors the rego workspace)

- The learner builds `rndm` **themselves** by following the lesson. Do **not** create or edit their
  project source. My scratch verification lives in the session scratchpad, never in this workspace.
- Suggested project location is the learner's own (e.g. `~/src/.../rndm`), not inside this repo.

## Verified facts (L1, Go 1.26.1)

- `go mod init github.com/meleu/rndm` → `go.mod` with `go 1.26.1`.
- bash `$RANDOM` range is `[0, 32767]` → `rand.IntN(32768)` (IntN is `[0, n)`).
- `math/rand/v2` top-level funcs are **auto-seeded** (random each run) and concurrency-safe;
  no `rand.Seed` needed. Confirmed: three runs of the binary gave different numbers.
- RED message for a missing function is a **build failure**: `undefined: Number` → `FAIL ... [build failed]`.
- `go vet ./...` clean, `gofmt -l .` empty on the L1 solution.

## Project arc (rough, revise freely)

- **L1 (done)** — Test-drive `rndm` v0: red→green→refactor; property-testing an RNG (assert the
  *range*, not an exact value); thin `main()` + testable `Number()`; stdout + exit 0 (clig).
- **L2 (next)** — Test the *program's output*, not just the function: extract a `run(w io.Writer)`
  seam so stdout is capturable in a test (`bytes.Buffer`). The classic testable-CLI move.
- **L3** — Reproducibility & injecting the RNG source (`*rand.Rand` via `rand.NewPCG`) so a test can
  assert an exact sequence; seams / dependency injection.
- **L4** — First real option with stdlib `flag` (e.g. `--max`, `-n count`); usage on stderr, exit codes.
- **L5+** — When flags/subcommands outgrow `flag`: introduce **Cobra**. Migrate `rndm` gain-by-gain.

## State

- [x] **L1** — `0001-test-drive-rndm.html`. Reference: `reference/go-tdd-toolbox.html`. index.html live.
- [ ] L2 — `io.Writer` seam for testable output.
