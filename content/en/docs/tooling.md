# Tooling

$mol works in any editor, but a small set of tools makes `.view.tree` and typed styles far more comfortable: a project scaffolder, a language server, and editor integrations for Zed and VS Code.

## Scaffold a project

`create-view-tree-lsp` generates a ready-to-run $mol module so you do not assemble the boilerplate by hand:

```bash
npm create view-tree-lsp bog/myapp
```

The argument is the module path (`namespace/name`, or the equivalent `bog_myapp`). It writes the `view.tree`, `view.ts`, `view.css.ts`, and `index.html` for a working app, and can add optional pieces:

- a **Giper Baza** local-first store
- a **Docker** setup
- a **Tauri** desktop shell
- **GitHub Actions** for prerender and `gh-pages` deploy

Skip any of them with flags (npm passes them after `--`):

```bash
npm create view-tree-lsp bog/myapp -- --no-tauri --no-docker --no-baza
```

The scaffolder is a thin wrapper over the CLI in the language server, so `view-tree-lsp create bog/myapp` does the same thing once the server is installed.

## Language server

`view-tree-lsp` is a Language Server Protocol implementation for the `view.tree` format. Install it globally:

```bash
npm install -g view-tree-lsp@latest
```

It scans your workspace and gives any LSP-capable editor:

- completion for `$mol_*` components and the components and properties defined in your own project
- property suggestions scoped to the component under the cursor
- an outline of component declarations for navigation
- live updates as files change

Because it speaks LSP, you can point any editor's language-client at the `view-tree-lsp` binary. The two integrations below wire it up for you.

## Zed

The **View Tree Syntax Highlighting for $mol** extension bundles the tree-sitter grammar, the language server, and an optional icon theme. Install it from Zed's extension manager:

1. Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run **zed: extensions**
3. Search for `view.tree` or `mol` and install the extension

You get syntax highlighting, completion, and outline for `.view.tree` files. The [source](https://github.com/Dev-cmyser/zed-view.tree-mol-support) and a matching [icon theme](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) are on GitHub.

## VS Code

The MAM workspace already carries its VS Code setup. When you open the cloned `mam` folder, VS Code offers to install the recommended extensions from `.vscode/extensions.json`:

- `nin-jin.vscode-language-tree` — `view.tree` language support
- `stan-donarise.view-tree-language` — syntax and grammar
- `editorconfig.editorconfig` — consistent formatting

The same folder ships `mol.code-snippets`, so component and binding snippets are available without any extra setup. Accept the prompt and `.view.tree` and TypeScript files are highlighted out of the box.

## Links

- Scaffolder — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Language server — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Zed extension — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
