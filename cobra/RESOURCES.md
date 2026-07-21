# Go CLIs + TDD Resources

## Knowledge

- [Command Line Interface Guidelines — clig.dev](https://clig.dev/)
  The learner's chosen north star for CLI behaviour. Use for: stdout vs stderr, exit codes,
  human-first design, "output of every program becomes the input to another", flags/args conventions.
- [Learn Go with Tests — Chris James (quii)](https://quii.gitbook.io/learn-go-with-tests)
  Free, high-trust book that teaches Go *through* TDD with the stdlib. Best single match for this
  mission. Use for: red-green-refactor rhythm, table-driven tests, `io.Writer` seams, mocking.
- [Go by Example: Testing and Benchmarking](https://gobyexample.com/testing-and-benchmarking)
  Concise, runnable table-driven test pattern. Use for: quick syntax reminders.
- [pkg.go.dev — `testing`](https://pkg.go.dev/testing)
  Canonical reference. Use for: `*testing.T`, `t.Run` subtests, `t.Fatalf` vs `t.Errorf`, helpers.
- [pkg.go.dev — `math/rand/v2`](https://pkg.go.dev/math/rand/v2)
  Modern (Go 1.22+) RNG. Use for: `IntN(n)` → `[0, n)`, top-level funcs auto-seeded & concurrency-safe,
  explicit `Source` (`PCG`, `ChaCha8`) when you need reproducibility.
- [pkg.go.dev — `flag`](https://pkg.go.dev/flag)
  Stdlib flag parsing. Use for: simple `--options` *before* reaching for Cobra.
- [Cobra](https://cobra.dev/) · [spf13/cobra on GitHub](https://github.com/spf13/cobra)
  The framework we adopt once a tool needs subcommands/flags. Use for: commands, flags, generator.
- [Effective Go](https://go.dev/doc/effective_go) · [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
  Idiom and naming. Use for: writing code that reads like Go, error handling conventions.

## Wisdom (Communities)

- [Gopher Slack](https://invite.slack.golangbridge.org/) — `#general`, `#cli`, `#testing` channels.
  Use for: "is this idiomatic?", design feedback on a tool's UX/structure.
- [r/golang](https://reddit.com/r/golang)
  Active, reasonably high-signal. Use for: library choices, project-structure critique, CLI UX.

## Gaps
- No single authoritative "TDD a CLI end-to-end in Go" walkthrough that also honours clig.dev —
  the lessons in this workspace are being built to fill exactly that gap.
