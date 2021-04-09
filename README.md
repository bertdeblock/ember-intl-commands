# Ember Intl Commands

[![CI](https://github.com/bertdeblock/ember-intl-commands/workflows/CI/badge.svg)](https://github.com/bertdeblock/ember-intl-commands/actions?query=workflow%3ACI)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Useful commands for managing your [ember-intl](https://github.com/ember-intl/ember-intl) translation files.

## Commands

- [move-key](#move-key)
- [remove-key](#remove-key)
- [sort-keys](#sort-keys)
- [strip-empty-keys](#strip-empty-keys)
- [to-ext](#to-ext)

### move-key

Move a key.

```bash
npx ember-intl-commands move-key "old.key" "new.key"
```

### remove-key

Remove a key.

```bash
npx ember-intl-commands remove-key "some.key"
```

### sort-keys

Sort keys.

```bash
npx ember-intl-commands sort-keys
```

### strip-empty-keys

Strip empty keys.

```bash
npx ember-intl-commands strip-empty-keys
```

### to-ext

Convert all files to `json`, `yaml` or `yml`.

```bash
npx ember-intl-commands to-ext "json"
npx ember-intl-commands to-ext "yaml"
npx ember-intl-commands to-ext "yml"
```
