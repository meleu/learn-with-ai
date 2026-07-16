# Every Rego value comes from `input` or `data`

After completing lesson 0001, the user stated (unprompted) the lesson's core concept in their own words: every value a Rego query can see comes from exactly two trees — `input` (the document under judgment) and `data` (policies + reference data). They also flagged it as "important to always keep in mind," showing they grasped it as an organizing principle, not a trivia fact.

**Evidence:** self-reported in their own words when requesting the next lesson; they ran both `opa eval` variants from lesson 0001 locally.

**Implications:** future lessons can lean on this model without re-teaching it — e.g. conftest can be framed as "the tool that builds `input` from config files," and package/namespace topics as "where your rules land in the `data` tree."
