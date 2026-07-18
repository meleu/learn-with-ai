# Rego / OPA Resources

## Knowledge

- [OPA Docs — Introduction](https://www.openpolicyagent.org/docs)
  The canonical starting point. Use for: what OPA is, the `input`/`data`/decision model, how the pieces fit.
- [OPA Docs — Philosophy](https://www.openpolicyagent.org/docs/philosophy)
  Why decouple policy from applications; "policy decision" vs "policy enforcement". Use for: the *why* behind Rego.
- [OPA Docs — Policy Language (Rego)](https://www.openpolicyagent.org/docs/policy-language)
  The Rego reference. Use for: rules, documents, complete vs partial rules, `default`, evaluation semantics.
- [Announcing OPA 1.0](https://www.openpolicyagent.org/blog/announcing-opa-1-0-a-new-standard-for-policy-as-code-a6d8427ee828)
  OPA 1.0 makes Rego v1 the default: `if` for rule bodies, `contains` for multi-value rules. Use for: writing modern, non-deprecated syntax.
- [Conftest](https://www.conftest.dev/)
  The tool you'll actually use: tests config files (YAML/JSON/Dockerfile/HCL/TOML/…) against Rego. Use for: the `deny`/`warn`/`violation` convention, CLI usage, supported formats.
- [The Rego Playground](https://play.openpolicyagent.org/)
  Browser REPL for OPA — edit policy + input, see output live, no install. Use for: fast experiments and sharing snippets with coworkers.

## Wisdom (Communities)

- [OPA Slack](https://slack.openpolicyagent.org/)
  Official community; active `#rego` and `#conftest` channels. Use for: "is this idiomatic?", debugging real policies.
- [Stack Overflow — `open-policy-agent` tag](https://stackoverflow.com/questions/tagged/open-policy-agent)
  Searchable Q&A. Use for: specific error messages and syntax questions.

## Gaps
- Not yet sourced: a strong worked example set for *your* domain (microservice deploy manifests). Candidate for a future custom lesson built from your real configs.
