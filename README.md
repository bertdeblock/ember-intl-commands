# Ember Intl Commands

[![CI](https://github.com/bertdeblock/ember-intl-commands/workflows/CI/badge.svg)](https://github.com/bertdeblock/ember-intl-commands/actions?query=workflow%3ACI)

Useful commands for managing your [ember-intl](https://github.com/ember-intl/ember-intl) translation files.

## Commands

- [list-locales](#list-locales)
- [move-key](#move-key)
- [remove-key](#remove-key)
- [sort-keys](#sort-keys)
- [strip-empty-keys](#strip-empty-keys)
- [to-casing](#to-casing)
- [to-ext](#to-ext)

### list-locales

List all locales.

```shell
npx ember-intl-commands list-locales
```

Output:

```shell
3 locales found:
[
  'en-AU',
  'en-GB',
  'en-US'
]
```

### move-key

Move a key.

```shell
npx ember-intl-commands move-key "old.key" "new.key"
```

### remove-key

Remove a key.

```shell
npx ember-intl-commands remove-key "some.key"
```

### sort-keys

Sort keys.

```shell
npx ember-intl-commands sort-keys
```

### strip-empty-keys

Strip empty keys (`""`, `null` or `{}`).

```shell
npx ember-intl-commands strip-empty-keys
```

### to-casing

Convert all keys to `camelCase`, `param-case` or `snake_case`.

```shell
npx ember-intl-commands to-casing "camel"
npx ember-intl-commands to-casing "param"
npx ember-intl-commands to-casing "snake"
```

### to-ext

Convert all files to `json`, `yaml` or `yml`.

```shell
npx ember-intl-commands to-ext "json"
npx ember-intl-commands to-ext "yaml"
npx ember-intl-commands to-ext "yml"
```
