# Ralph (Canonical)

Converts existing PRDs to the canonical `prd.json` format and provides instructions for the autonomous loop that respects the "Fresh Context" principle.

---

## The Core Principles

1. **Fresh Context Every Loop**: Ralph wipes the whiteboard after every single task. Every iteration starts fresh with a clean context window.
2. **No Compaction**: Never "compact" or summarize previous iterations into the context. The AI reads the state of the codebase and the plan fresh each time.
3. **No Growing Memory Files**: Do not let the AI modify its own instructions (no `AGENTS.md` or patterns files that grow). The prompt stays static.
4. **External Loop Control**: The loop lives outside the model (a simple bash `while` loop). The AI can't decide when to stop; the script stops when all tasks are marked done in the plan.
5. **Static Prompt**: The instructions never change. They tell the AI: read the plan, pick the task, implement, validate, commit, mark done.

---

## The Plan (prd.json)

The `prd.json` is the source of truth for the loop.

```json
{
  "project": "[Project Name]",
  "branchName": "ralph/[feature-name-kebab-case]",
  "description": "[Feature description]",
  "userStories": [
    {
      "id": "US-001",
      "title": "[Story title]",
      "description": "As a [user], I want [feature] so that [benefit]",
      "acceptanceCriteria": [
        "Criterion 1",
        "Criterion 2",
        "Typecheck passes"
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    }
  ]
}
```

---

## Story Size: The Fresh Context Rule

**Each story must be completable in ONE iteration.**

Since Ralph starts fresh every time, a story must be small enough to be implemented and verified within one context window. If a story is too big, the LLM will run out of "whiteboard space" or fail to finish.

---

## Output Files

1. **prompt.md**: Static instructions for the agent. NEVER modified by the loop.
2. **prd.json**: The task list with `passes` flags.
3. **activity.md**: A log file where the agent appends what it did. For human visibility, not for AI memory.
4. **settings.json**: Sandbox configuration to constrain the agent.

---

## Workflow Implementation

To run Ralph canonically:
1. Create `prd.json` with a detailed plan.
2. Ensure `prompt.md` is set to the static canonical instructions.
3. Run the external loop (`ralph.sh`) which continues until all tasks in `prd.json` have `passes: true`.

