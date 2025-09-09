# 📖 Commit Message Guidelines

We follow the **Conventional Commits** specification to keep commit history clear, consistent, and useful for generating changelogs and release notes.

---

## 🔑 Commit Message Format

Each commit message consists of a **type**, an optional **scope**, and a **subject**:


---

## 🏷 Commit Types

- **feat** → A new feature  
  _Example_: `feat(auth): add login with refresh token`

- **fix** → A bug fix  
  _Example_: `fix(api): handle 500 error gracefully`

- **docs** → Documentation changes only  
  _Example_: `docs: add Prisma seeding guide`

- **style** → Code style changes (formatting, semicolons, whitespace, etc. – no logic changes)  
  _Example_: `style: format code with prettier`

- **refactor** → Code changes that improve structure but don’t change behavior  
  _Example_: `refactor: move prisma client to db/`

- **perf** → Performance improvements  
  _Example_: `perf(query): add DB index for faster lookup`

- **test** → Adding or updating tests  
  _Example_: `test(auth): add unit test for refresh token`

- **chore** → Maintenance tasks, tooling, config, dependencies  
  _Example_: `chore: bump typescript version`

- **ci** → CI/CD pipeline changes  
  _Example_: `ci: add GitHub Actions workflow`

- **build** → Build system or external dependencies  
  _Example_: `build: update vite config`

- **revert** → Reverts a previous commit  
  _Example_: `revert: feat(auth): add JWT refresh token logic`

---

## 🎯 Best Practices

1. **Use present tense** → “add” not “added” / “adds”.  
2. **Keep subject short (≤ 72 chars)**.  
3. **Optional scope** → use it to indicate the area of code (auth, user, db, docs, etc.).  
4. **One change per commit** → don’t mix unrelated changes.  
5. **Body & footer (optional)** →  


---

## 🚀 Example Commit Messages

- `feat(user): allow updating profile picture`
- `fix(db): resolve migration conflict on UserInfo`
- `docs: add commit convention guide`
- `style: reformat code with prettier`
- `refactor(auth): move JWT utils to /utils/jwt.ts`
- `perf(api): cache user permissions in Redis`
- `test(user): add e2e tests for user creation`
- `chore: update dependencies`
- `ci: add lint check to GitHub Actions`
- `build: optimize Dockerfile`
- `revert: feat(auth): add JWT refresh token logic`

---

## 📌 Summary

- Use **Conventional Commits** (`feat`, `fix`, `docs`, `chore`, etc.).  
- Keep commits **atomic and descriptive**.  
- This makes our git history **clean, searchable, and ready for automation** (changelogs, semantic releases, etc.).  
