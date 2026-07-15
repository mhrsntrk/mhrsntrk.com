# Editorial rules for this corpus (The Vulgate)

You are cataloguing vulgar Turkish folk proverbs. Read `lib/vulgate/schema.js`
for the schema. Entries live in `content/entries/<slug>.yml`, one file per entry.

## Rules
- The `literal_en` translation MUST preserve Turkish word order and read badly in
  English. Do not make it idiomatic. The awkwardness is the entire hook.
- `meaning_en` and `meaning_tr` are stated flat, in encyclopedia register. No
  jokes, no winking, no acknowledgement that the source is vulgar. The register
  clash does the work; if you point at the joke, you kill it.
- `origin`: use `unattested` unless you have a real source. Never invent an
  etymology. A scholarly-format work that fabricates provenance is lying, and
  the honest marker is also funnier.
- `cross_refs` must be real, verifiable works (proverbs, philosophy, cognitive
  bias literature). Never fabricate a citation. One made-up citation destroys
  the entire conceit.
- Reject any saying that is only a curse with no proverbial payload. If it does
  not carry a transferable observation about the world, it does not belong here.
- `register`: `mild` | `crude` | `obscene`. Nothing else.
- Every Turkish string is tagged `lang="tr"` in the UI. Keep that in mind: the
  corpus advertises philological care and cannot be illiterate in its own
  language.

## Hard limit
You may DRAFT entries. You may NOT finalize `meaning_en` or `meaning_tr`.
Flag every drafted meaning for human review. You are unreliable on regional and
contemporary Turkish folk speech and will produce confident wrong glosses.
Hallucinated glosses in a scholarly-format corpus are worse than no corpus.

When drafting, fill the mechanical/verifiable fields (`tr`, `variants`,
`literal_en`, `equivalents`, `cross_refs`) and leave `meaning_en` / `meaning_tr`
prefixed with `DRAFT — REVIEW:` so `npm run validate:vulgate` still passes but a
human knows the gloss is unconfirmed.
