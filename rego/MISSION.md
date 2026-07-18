# Mission: Rego (Open Policy Agent) for pipeline policy-as-code

## Why
Author and maintain Rego policies (run via conftest) that validate the configuration
of hundreds of microservices inside the build/deploy pipelines you own — and be fluent
enough in the fundamentals to teach your coworkers how to write and reason about them.

## Success looks like
- Explain, to a coworker, why Rego/OPA exists and what problem policy decoupling solves.
- Read a `.rego` file and correctly describe what decision it computes for a given input.
- Write a conftest policy (`deny`/`warn`) that catches a real misconfiguration in a YAML/JSON/Dockerfile.
- Run and debug policies locally with `conftest` and `opa` (eval, fmt, test).
- Onboard a coworker: point them at a lesson/reference and answer their questions.

## Constraints
- Learner is an experienced DevOps engineer (pipelines, YAML, containers) — comfortable with CLIs and JSON.
- New to Rego's declarative model; wants a solid conceptual foundation before writing production rules.
- Must be teachable onward — clarity and transferable mental models matter more than clever one-liners.

## Out of scope (for now)
- OPA as a long-running server / REST API and bundle distribution.
- OPA/Gatekeeper admission control in Kubernetes (may revisit later).
- Advanced Rego: comprehensions-heavy metaprogramming, custom built-ins, WASM.
