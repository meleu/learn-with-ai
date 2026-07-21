# Mission: Build production-grade CLI tools in Go (stdlib → Cobra), test-first

## Why
Ship real command-line tools your coworkers install and run at work — robust, well-behaved
Go binaries instead of fragile shell scripts — while deepening genuine fluency with Go's
standard library. TDD is the non-negotiable working discipline: every feature is driven by a
failing test first.

## Success looks like
- Test-drive a Go CLI from a failing test → passing implementation → refactor, fluently.
- Build small, single-purpose tools (starting with `rndm`) that follow CLI conventions
  from [clig.dev](https://clig.dev): output to stdout, messages to stderr, correct exit codes.
- Reach for the right stdlib package by reflex (`testing`, `os`, `io`, `flag`, `fmt`,
  `math/rand/v2`, `bufio`, `strconv`) and know why.
- Add `--options` with Cobra once a tool actually needs subcommands/flags — and know when it
  is *not* needed yet.
- Structure a Go CLI so the logic is testable and `main()` stays thin.

## Constraints
- Learner knows basic Go syntax; has written Go tests but is **new to test-first TDD** —
  make the red-green-refactor discipline explicit early on.
- Go 1.26 toolchain (so `math/rand/v2`, modern testing). Linux, bash shell.
- Learn by building tangible little projects, one win per lesson; verify every command/output.
- Cobra is deferred until a project genuinely needs flag/subcommand parsing (learner's call).

## Out of scope (for now)
- Cobra internals and code-gen before we have a real need for flags/subcommands.
- Third-party CLI frameworks other than Cobra (urfave/cli, kong, etc.).
- Distribution/packaging (goreleaser, Homebrew taps), TUIs (Bubble Tea), and CI — revisit later.
