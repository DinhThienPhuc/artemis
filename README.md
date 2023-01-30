# ARTEMIS

✨✨✨ A smart, powerful monorepo system, allow us to easily build and develop products. ✨✨✨

## `atm` - A smart, fast and extensible build system tool

✨ `atm` is a build system tool, an abstract layer of npm and add more commands to easily work on an `Artemis` system.

<!-- TODO: need to break atm to an other repo. Maybe use an organization -->

`atm` can be installed as a global package

```bash
npm i -g .\scripts\atm

# or this one if on window
npm i -g .\scripts\atm --force
```

Then you can use npm-like commands, using `atm` commands at the root of the project

To start working on a `Artemis` system, first you need to init project, answer some questions and _voila_ ☕☕☕

```bash
atm create-artemis-system
```

Then you can create an app or library (for reusable, if needed):

```bash
atm gen --app=<app-name> --type=<type>
atm gen --lib=<lib-name> --type=<type>

# Example
atm gen --app=lazada --type=next
atm gen --lib=hooks --type=reacts
```

Apps/libs then will be placed in `apps` or `libs` folder correspondingly.

<!-- TODO: update them -->

- Recursively add packages for all apps, all libs and the root of the project

```bash
atm add <list-of-packages> <option-like-npm>

# Example - Install `eslint`, `husky`, `prettier` for devDependencies for all of root and all apps, all libs
atm add eslint prettier husky --save-dev

# Example - Install all recursively (except `_resources` folder)
atm add
```

- Add/remove package from app/lib/root

```bash
atm add --target=<app-name-or-lib-name> <list-of-packages> <option-like-npm>
atm remove --target=<app-name-or-lib-name> <list-of-packages> <option-like-npm>

# Example - Install `eslint` for devDependencies of `reacts` app
atm add --target=reacts eslint --save-dev

# Example - Install `husky` for dependencies of `reacts` and `next` apps
atm add --target=reacts,next husky

# Example - Install `husky` for devDependencies of root folder
atm add --target=root husky --save-dev
```

- Delete files/folders from app/lib/root

```bash
atm delete --target=<app-name-or-lib-name> <list-of-files-and-folders>

# Example - Delete `package-lock.json` file and `node_modules` folder in `reacts` app
atm delete --target=reacts package-lock.json node_modules
```

```bash
# Run app(s), default in development mode
atm run --target=<app-name>

# Example - Run single app
atm run --target=reacts

# Example - Run multi apps
atm run --target=reacts,next
```

```bash
# TODO: need to add to script
# Build app(s), default in production mode
atm build --target=<app-name>

# Example - Build single app
atm build --target=reacts

# Example - Build multi apps
atm build --target=reacts,next
```

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

- Give permission for husky:

```bash
chmod u+x .husky/\*
```

- Chalk colors:

  - CREATE: green
  - INSTALL: cyan
  - UPDATE: yellow
  - REMOVE: red
  - MODIFY: yellow
