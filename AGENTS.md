# HP-Portal Project Rules

## Worktree Usage
- Prefer separate branches and `git worktree` directories for template renewals, new category work, and new template additions when those tasks should be reviewed or shipped independently.
- Treat planning, categorization, naming, and theme exploration as pre-implementation work. Do not create a worktree until the task becomes a concrete implementation unit with file changes.
- Keep `main` clean and use it as the stable reference point. Avoid collecting multiple unrelated template changes in a single implementation branch when independent worktrees would keep diffs clearer.
- For small, one-off fixes that touch only a narrow part of the repository and are unlikely to overlap with other work, a dedicated worktree is optional.
- After a worktree branch is merged and no follow-up work is expected, remove the worktree to keep `.worktrees/` manageable.

## Parallel Template Work
- When multiple templates are being renewed or added at the same time, prefer one branch and one worktree per template unless a single shared branch is clearly simpler and the changes are meant to ship together.
- If templates will be completed and released at different times, keep them isolated so each template can be reviewed, merged, and shipped independently.

## Design Documentation
- Use `DESIGN.md` files when visual differentiation matters and the template should preserve a distinct layout, motion language, and overall atmosphere.
- Place category-level `DESIGN.md` files in the category directory to describe the shared visual direction and UX rules for that category.
- Place template-level `DESIGN.md` files in each template directory to describe the template's unique design intent, differentiation, and constraints.
- Keep category-level `DESIGN.md` focused on shared rules. Keep template-level `DESIGN.md` focused on differences, signature elements, and anti-patterns for that specific template.
- Do not create template-level `DESIGN.md` files during ideation only. Create them once a template becomes a concrete implementation unit.
