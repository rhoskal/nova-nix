## v0.4.0 - 2021-07-23

### Chore & Maintenance

- Update extension dependencies

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
