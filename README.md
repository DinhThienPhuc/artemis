# ARTEMIS

## Conventional Commit Messages

See how a minor change to your commit message style can make a difference

### Formats

```javascript
<type>(<optional scope>): <subject>

<optional body>

<optional footer>
```

### Merge

```javascript
Merge branch '<branch name>'
```

### Types

- `feat` Commits, that adds a new feature
- `fix` Commits, that fixes a bug
- `refactor` Commits, that rewrite/restructure your code, however does not change any behaviour
- `perf` Commits are special `refactor` commits, that improve performance
- `style` Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
- `test` Commits, that add missing tests or correcting existing tests
- `docs` Commits, that affect documentation only
- `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
- `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
- `chore` Miscellaneous commits e.g. modifying `.gitignore`

### Scopes

The `scope` provides additional contextual information.

- Is an **optional** part of the format
- Allowed Scopes depends on the specific project
- Don't use issue identifiers as scopes

### Subject

The `subject` contains a succinct description of the change.

- Is a **mandatory** part of the format
- Use the imperative, present tense: "change" not "changed" nor "changes"
- Think of `This commit will <subject>`
- Don't capitalize the first letter
- No dot (.) at the end

### Body

The `body` should include the motivation for the change and contrast this with previous behavior.

- Is an **optional** part of the format
- Use the imperative, present tense: "change" not "changed" nor "changes"
- This is the place to mention issue identifiers and their relations

### Footer

The `footer` should contain any information about **Breaking Changes** and is also the place to **reference Issues** that this commit refers to.

- Is an **optional** part of the format
- **optionally** reference an issue by its id.
- **Breaking Changes** should start with the word `BREAKING CHANGES:` followed by space or two newlines. The rest of the commit message is then used for this.

### Examples

```java
  feat(shopping cart): add the amazing button
```

```java
feat: remove ticket list endpoint

refers to JIRA-1337
BREAKING CHANGES: ticket enpoints no longer supports list all entites.
```

```java
fix: add missing parameter to service call

The error occurred because of <reasons>.
```

```java
build(release): bump version to 1.0.0
```

```java
build: update dependencies
```

```java
refactor: implement calculation method as recursion
```

```java
style: remove empty line
```

## Notes

Give permission for husky:

```bash
chmod u+x .husky/\*
```
