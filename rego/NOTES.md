# Working Notes

## User preferences
- Extremely concise communication (global preference).
- CLI-first, local tooling.
- Tool installs: prefer Homebrew (even on Linux).
- Shell examples: use `--long-options` whenever possible (short form may be noted alongside).
- Pacing: pure Rego fundamentals first; no conftest concepts until foundation is solid (user removed conftest material from lesson 1). Introduce conftest explicitly in a later lesson.
- Wants foundation-level understanding — will teach coworkers, so lessons should build explainable mental models, not just recipes.

## Context
- Target configs at work: Kubernetes manifests, CI/CD pipelines, app config files, Dockerfiles, pom.xml.
- End state: conftest policies + tests running in CI.

## Teaching decisions
- Teach OPA v1.0+ syntax from day one (`if` / `contains` keywords mandatory since OPA 1.0, Dec 2024). Never show legacy syntax except to warn about old blog posts.
- Lesson arc (draft): hello world → why conftest (done, 0002) → rule anatomy (`deny contains msg if`, evaluation model) → iteration & comprehensions → policy testing → real work configs.
- User pulled conftest motivation forward (asked after lesson 1). Lesson 0002 covered it conceptually + workflow demo; rule syntax deliberately deferred with "dissected next lesson" note — deliver on that.
- conftest gotcha verified locally: `conftest parse` wraps output in outer array (one element per document), but in `conftest test` the policy receives each document directly as `input`.
