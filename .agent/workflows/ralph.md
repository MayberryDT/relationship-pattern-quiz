---
description: How to run the Ralph autonomous loop on Antigravity
---

Ralph is an autonomous AI agent loop that runs repeatedly until all PRD items are complete.

### Workflow

1. **Create a PRD**
   Use the `prd` skill to generate a detailed requirements document for your feature.
   > "Create a PRD for [feature description]"
   The skill saves output to `tasks/prd-[feature-name].md`.

2. **Convert PRD to Ralph format**
   Use the `ralph` skill to convert the markdown PRD to `prd.json`.
   > "Convert tasks/prd-[feature-name].md to ralph format"
   This creates `prd.json` with structured user stories.

3. **Run the Ralph Loop**
   Instruct Antigravity to enter the Ralph loop.
   > "Start the Ralph loop using scripts/ralph/ANTIGRAVITY.md"

Antigravity will then sequentially implement each user story, running quality checks and updating the progress log until all tasks are complete.
