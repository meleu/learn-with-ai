# Mission: Rego (Open Policy Agent)

## Why
Write conftest policies that validate project configurations at work — Kubernetes manifests, CI/CD pipelines, Dockerfiles, app config files (JSON/YAML), and `pom.xml`. Beyond writing policies, teach coworkers how Rego works, which demands a solid foundation, not just copy-paste recipes.

## Success looks like
- Write a conftest `deny`/`warn`/`violation` policy from scratch for any of the target config formats
- Explain to a coworker *why* a Rego rule evaluates the way it does (declarative/Datalog semantics)
- Run and debug policies locally with `opa eval`, the REPL, and `opa test`
- Ship a policy suite with unit tests that runs in CI at work

## Constraints
- Learning tools must run locally (CLI-first workflow)
- Needs teaching-quality understanding — "it works" isn't enough; must be explainable

## Out of scope
- Running OPA as a server / REST API / sidecar deployments
- Gatekeeper / admission controllers (unless mission shifts)
- Envoy / service mesh authorization
