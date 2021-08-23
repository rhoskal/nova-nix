## v0.8.0 - 2021-08-23

### Chore & Maintenance

- `[core]` Add tests. ([#39](https://github.com/hansjhoffman/nova-nix/pull/39))
- `[core]` Switch to esbuild 🚀. ([#37](https://github.com/hansjhoffman/nova-nix/pull/37))
- `[core]` Update extension & dev dependencies

### Features

- `[syntax]` Add folding to let blocks. ([#43](https://github.com/hansjhoffman/nova-nix/pull/43))

### Fixes

- `[syntax]` Add keywords to collection list. ([#42](https://github.com/hansjhoffman/nova-nix/pull/42))
- `[syntax]` Allow apostrophe in identifiers. ([#41](https://github.com/hansjhoffman/nova-nix/pull/41))

## v0.7.0 - 2021-08-14

### Chore & Maintenance

- `[core]` Update extension & dev dependencies

### Features

- `[syntax]` Add new operators (`@` and `...`). ([#32](https://github.com/hansjhoffman/nova-nix/pull/32))
- `[syntax]` Add folding to multiline strings. ([#30](https://github.com/hansjhoffman/nova-nix/pull/30))
- `[syntax]` Add more punctuation for better theming. ([#28](https://github.com/hansjhoffman/nova-nix/pull/28))
- `[core]` Add shortcut for formatting command `opt-shift-f`. ([#27](https://github.com/hansjhoffman/nova-nix/pull/27))

### Fixes

- `[syntax]` Improve variables declarations for better theming. ([#34](https://github.com/hansjhoffman/nova-nix/pull/34))
- `[syntax]` Allow 2 dots for local path strings. ([#33](https://github.com/hansjhoffman/nova-nix/pull/33))
- `[syntax]` Ensure div operator is followed by space. ([#31](https://github.com/hansjhoffman/nova-nix/pull/31))
- `[syntax]` Add highlighting for variable references. ([#20](https://github.com/hansjhoffman/nova-nix/pull/20))

## v0.6.0 - 2021-07-30

### Chore & Maintenance

- `[core]` Minimize build output. ([#19](https://github.com/hansjhoffman/nova-nix/pull/19))
- `[core]` Use readonly types. ([#18](https://github.com/hansjhoffman/nova-nix/pull/18))
- `[core]` Update extension & dev dependencies

### Features

- `[syntax]` Add collapsing for collections (set & list). ([#20](https://github.com/hansjhoffman/nova-nix/pull/20))
- `[syntax]` Improve list collections by including identifiers & syntax. ([#20](https://github.com/hansjhoffman/nova-nix/pull/20))
- `[syntax]` Add highlighting for variable references. ([#20](https://github.com/hansjhoffman/nova-nix/pull/20))

### Fixes

- `[syntax]` Prevent assignments matching in the presence of a subsequent operator (e.g. <, =). ([#20](https://github.com/hansjhoffman/nova-nix/pull/20))

## v0.5.0 - 2021-07-25

### Chore & Maintenance

- `[core]` Update dev dependencies

### Features

- `[core]` Add initial localization support for German & French. ([#14](https://github.com/hansjhoffman/nova-nix/pull/14))

### Fixes

- `[formatter]` Only activate on `.nix` files instead of on a workspace that contains `.nix` files. ([#16](https://github.com/hansjhoffman/nova-nix/pull/16))
- `[formatter]` Restrict format command to only files with `.nix` extension. ([#15](https://github.com/hansjhoffman/nova-nix/pull/15))
- `[core]` Remove `filesystem` entitlements -- not needed. ([#13](https://github.com/hansjhoffman/nova-nix/pull/13))
- `[formatter]` Add composite disposable for proper extension cleanup. ([#12](https://github.com/hansjhoffman/nova-nix/pull/12))

## v0.4.0 - 2021-07-23

### Chore & Maintenance

- `[core]` Update extension dependencies

### Fixes

- `[formatter]` Prevent save listeners for non `.nix` files. Prevent multiple on-save listeners for the same file. ([#10](https://github.com/hansjhoffman/nova-nix/pull/10))

## v0.3.0 - 2021-07-16

### Features

- `[syntax]` Add syntax highlighting for function args, built-in global functions and Set keys. Update string templates to include expressions. ([#8](https://github.com/hansjhoffman/nova-nix/pull/8))

## v0.2.0 - 2021-07-11

### Features

- `[syntax]` A syntax highlighting for operators, assignments, values, and string templates. ([#4](https://github.com/hansjhoffman/nova-nix/pull/4))

### Fixes

- `[syntax]` Removed syntax highlighting for punctuation (= | :). ([#4](https://github.com/hansjhoffman/nova-nix/pull/4))

## v0.1.0 - 2021-07-10

### Initial release 🎉

- Format Command (requires [nixfmt](https://github.com/serokell/nixfmt) to be installed)
- Format on Save (requires [nixfmt](https://github.com/serokell/nixfmt) to be installed)
- Basic syntax highlighting
- Global and Workspace configs
