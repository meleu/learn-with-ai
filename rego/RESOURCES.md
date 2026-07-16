# Rego / OPA Resources

## Knowledge

- [OPA Docs: Policy Language](https://www.openpolicyagent.org/docs/policy-language)
  The primary reference for Rego syntax and semantics. Use for: rule syntax, packages, evaluation model, any "how do I write X" question.
- [OPA Docs: Philosophy](https://www.openpolicyagent.org/docs/philosophy)
  Why OPA/Rego exists — decoupling policy from services, the unified JSON document model. Use for: the "why was Rego created" story, teaching coworkers the motivation.
- [OPA Docs: Introduction / Running OPA](https://www.openpolicyagent.org/docs)
  Install methods, `opa eval`, `opa run` (REPL), running as a server. Use for: local tooling setup.
- [Conftest Documentation](https://www.conftest.dev/)
  The tool the mission centers on. Use for: `deny`/`warn`/`violation` conventions, supported file formats (K8s YAML, Dockerfile, XML for pom.xml, TOML, HCL...), the `main` package convention.
- [Rego Playground](https://play.openpolicyagent.org/)
  Zero-install browser environment for trying Rego. Use for: quick experiments, sharing snippets with coworkers.
- [OPA Docs: Policy Testing](https://www.openpolicyagent.org/docs/policy-testing)
  `opa test` for unit-testing policies. Use for: building the CI-ready test suite the mission requires.

## Wisdom (Communities)

- [OPA Slack (slack.openpolicyagent.org)](https://slack.openpolicyagent.org/)
  Official community, maintainers active. Use for: idiomatic-Rego questions, conftest edge cases.
- [GitHub Discussions: open-policy-agent/opa](https://github.com/open-policy-agent/opa/discussions)
  Searchable Q&A with maintainer answers. Use for: semantics questions before asking live.

## Gaps

- No vetted resource yet for XML/`pom.xml` parsing quirks in conftest — needs research before that lesson.
- No vetted deep-dive on Rego's Datalog roots (for teaching-level understanding of semantics).
