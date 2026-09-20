import * as vscode from "vscode";
import * as path from "node:path";

export function activate(context: vscode.ExtensionContext) {
  const provider = vscode.languages.registerCompletionItemProvider(
    ["typescriptreact", "javascriptreact", "typescript", "javascript"],
    {
      provideCompletionItems(document) {
        const fileName = path.basename(document.fileName);

        const isJsx =
          document.languageId === "typescriptreact" ||
          document.languageId === "javascriptreact";

        const items: vscode.CompletionItem[] = [];

        //
        // nxpage
        //
        if (isJsx) {
          const item = new vscode.CompletionItem(
            "nxpage",
            vscode.CompletionItemKind.Snippet,
          );

          item.detail = "Next.js Page";
          item.documentation = "Insert a basic Next.js page component.";

          item.insertText = new vscode.SnippetString(
            [
              "export default function ${1:Page}() {",
              "  return (",
              "    <div>",
              "      $0",
              "    </div>",
              "  );",
              "}",
            ].join("\n"),
          );

          item.sortText = fileName.startsWith("page.")
            ? "0000-nxpage"
            : "010-nxpage";

          items.push(item);
        }

        //
        // nximage
        //
        if (isJsx) {
          const item = new vscode.CompletionItem(
            "nximage",
            vscode.CompletionItemKind.Snippet,
          );

          item.detail = "Next.js Image";
          item.documentation =
            "Insert Next.js <Image> and add the import automatically.";

          item.insertText = new vscode.SnippetString(
            [
              "<Image",
              '  src="${1:/image.png}"',
              '  alt="${2}"',
              "  width={${3:500}}",
              "  height={${4:500}}",
              '  className="${5}"',
              "/>",
            ].join("\n"),
          );

          item.command = {
            command: "nextSmartSnippets.addImageImport",
            title: "Add next/image import",
          };

          item.sortText = "020-nximage";

          items.push(item);
        }

        //
        // nxlink
        //
        if (isJsx) {
          const item = new vscode.CompletionItem(
            "nxlink",
            vscode.CompletionItemKind.Snippet,
          );

          item.detail = "Next.js Link";
          item.documentation =
            "Insert Next.js <Link> and add the import automatically.";

          item.insertText = new vscode.SnippetString(
            '<Link href="/${1}" className="${2}">${3:Text}</Link>',
          );

          item.command = {
            command: "nextSmartSnippets.addLinkImport",
            title: "Add next/link import",
          };

          item.sortText = "021-nxlink";

          items.push(item);
        }

        //
        // nxlayout
        //
        if (isJsx) {
          const item = new vscode.CompletionItem(
            "nxlayout",
            vscode.CompletionItemKind.Snippet,
          );

          item.detail = "Next.js Layout";
          item.documentation = "Insert a basic Next.js App Router layout.";

          item.insertText = new vscode.SnippetString(
            [
              "export default function Layout({",
              "  children,",
              "}: Readonly<{",
              "  children: React.ReactNode;",
              "}>) {",
              "  return (",
              "    <div>",
              "      {${1:children}}",
              "    </div>",
              "  );",
              "}",
            ].join("\n"),
          );

          item.sortText = fileName.startsWith("layout.")
            ? "0000-nxlayout"
            : "030-nxlayout";

          items.push(item);
        }

        //
        // nxapi
        //
        const apiItem = new vscode.CompletionItem(
          "nxapi",
          vscode.CompletionItemKind.Snippet,
        );

        apiItem.detail = "Next.js Route Handler";
        apiItem.documentation =
          "Insert a basic Next.js App Router Route Handler.";

        apiItem.insertText = new vscode.SnippetString(
          [
            "export async function GET() {",
            "  return NextResponse.json({",
            '    ${1:message}: "${2:Hello World}",',
            "  });",
            "}",
          ].join("\n"),
        );

        apiItem.command = {
          command: "nextSmartSnippets.addNextResponseImport",
          title: "Add next/server import",
        };

        apiItem.sortText = fileName.startsWith("route.")
          ? "0000-nxapi"
          : "040-nxapi";

        items.push(apiItem);

        //
        // nxnotfound
        //
        if (isJsx) {
          const item = new vscode.CompletionItem(
            "nxnotfound",
            vscode.CompletionItemKind.Snippet,
          );

          item.detail = "Next.js Not Found";
          item.documentation = "Insert a basic Next.js not-found component.";

          item.insertText = new vscode.SnippetString(
            [
              "export default function NotFound() {",
              "  return (",
              "    <div>",
              "      <h2>Not Found</h2>",
              "      <p>Could not find the requested resource.</p>",
              "    </div>",
              "  );",
              "}",
            ].join("\n"),
          );

          item.sortText = fileName.startsWith("not-found.")
            ? "0000-nxnotfound"
            : "050-nxnotfound";

          items.push(item);
        }

        //
        // nxmetadata
        //
        const metadataItem = new vscode.CompletionItem(
          "nxmetadata",
          vscode.CompletionItemKind.Snippet,
        );

        metadataItem.detail = "Next.js Metadata";
        metadataItem.documentation =
          "Insert static Next.js metadata with Open Graph and Twitter Card settings.";

        metadataItem.insertText = new vscode.SnippetString(
          [
            "export const metadata: Metadata = {",
            '  title: "${1:Title}",',
            '  description: "${2:Description}",',
            "  openGraph: {",
            '    title: "$1",',
            '    description: "$2",',
            '    images: ["${3:/og-image.png}"],',
            "  },",
            "  twitter: {",
            '    card: "summary_large_image",',
            '    title: "$1",',
            '    description: "$2",',
            '    images: ["$3"],',
            "  },",
            "};",
          ].join("\n"),
        );

        metadataItem.command = {
          command: "nextSmartSnippets.addMetadataImport",
          title: "Add Metadata import",
        };

        metadataItem.sortText =
          fileName.startsWith("page.") || fileName.startsWith("layout.")
            ? "0001-nxmetadata"
            : "060-nxmetadata";

        items.push(metadataItem);

        //
        // nxgmetadata
        //
        const generateMetadataItem = new vscode.CompletionItem(
          "nxgmetadata",
          vscode.CompletionItemKind.Snippet,
        );

        generateMetadataItem.detail = "Next.js Generate Metadata";
        generateMetadataItem.documentation =
          "Insert a dynamic Next.js generateMetadata function.";

        generateMetadataItem.insertText = new vscode.SnippetString(
          [
            "type Props = {",
            "  params: Promise<{",
            "    ${1:slug}: string;",
            "  }>;",
            "};",
            "",
            "export async function generateMetadata({",
            "  params,",
            "}: Props): Promise<Metadata> {",
            "  const { $1 } = await params;",
            "",
            "  return {",
            "    title: $1,",
            '    description: "${2:Description}",',
            "    openGraph: {",
            "      title: $1,",
            '      description: "$2",',
            '      images: ["${3:/og-image.png}"],',
            "    },",
            "    twitter: {",
            '      card: "summary_large_image",',
            "      title: $1,",
            '      description: "$2",',
            '      images: ["$3"],',
            "    },",
            "  };",
            "}",
          ].join("\n"),
        );

        generateMetadataItem.command = {
          command: "nextSmartSnippets.addMetadataImport",
          title: "Add Metadata import",
        };

        generateMetadataItem.sortText =
          fileName.startsWith("page.") || fileName.startsWith("layout.")
            ? "0002-nxgmetadata"
            : "061-nxgmetadata";

        items.push(generateMetadataItem);

        //
        // nxrouter
        //
        if (isJsx) {
          const item = new vscode.CompletionItem(
            "nxrouter",
            vscode.CompletionItemKind.Snippet,
          );

          item.detail = "Next.js useRouter";
          item.documentation =
            'Insert a Client Component using useRouter() and automatically add "use client" and the import.';

          item.insertText = new vscode.SnippetString(
            [
              "export default function ${1:RouterComponent}() {",
              "  const router = useRouter();",
              "",
              "  return (",
              "    <button",
              '      type="button"',
              '      onClick={() => router.push("/${2}")}',
              "    >",
              "      ${3:Navigate}",
              "    </button>",
              "  );",
              "}",
            ].join("\n"),
          );

          item.command = {
            command: "nextSmartSnippets.setupRouter",
            title: "Setup useRouter",
          };

          item.sortText = "070-nxrouter";

          items.push(item);
        }

        //
        // nxsearchparams
        //
        if (isJsx) {
          const item = new vscode.CompletionItem(
            "nxsearchparams",
            vscode.CompletionItemKind.Snippet,
          );

          item.detail = "Next.js useSearchParams";
          item.documentation =
            'Insert a Client Component using useSearchParams() and automatically add "use client" and the import.';

          item.insertText = new vscode.SnippetString(
            [
              "export default function ${1:SearchParamsComponent}() {",
              "  const searchParams = useSearchParams();",
              '  const ${2:value} = searchParams.get("${3:key}");',
              "",
              "  return (",
              "    <div>",
              "      {$2}",
              "    </div>",
              "  );",
              "}",
            ].join("\n"),
          );

          item.command = {
            command: "nextSmartSnippets.setupSearchParams",
            title: "Setup useSearchParams",
          };

          item.sortText = "071-nxsearchparams";

          items.push(item);
        }

        return items;
      },
    },
  );

  const addLinkImport = vscode.commands.registerCommand(
    "nextSmartSnippets.addLinkImport",
    async () => {
      await addDefaultImportIfMissing(
        "next/link",
        "Link",
        'import Link from "next/link";',
      );
    },
  );

  const addImageImport = vscode.commands.registerCommand(
    "nextSmartSnippets.addImageImport",
    async () => {
      await addDefaultImportIfMissing(
        "next/image",
        "Image",
        'import Image from "next/image";',
      );
    },
  );

  const addNextResponseImport = vscode.commands.registerCommand(
    "nextSmartSnippets.addNextResponseImport",
    async () => {
      await addNamedImportIfMissing("next/server", "NextResponse", false);
    },
  );

  const addMetadataImport = vscode.commands.registerCommand(
    "nextSmartSnippets.addMetadataImport",
    async () => {
      await addNamedImportIfMissing("next", "Metadata", true);
    },
  );

  const setupRouter = vscode.commands.registerCommand(
    "nextSmartSnippets.setupRouter",
    async () => {
      await setupClientNamedImport("next/navigation", "useRouter");
    },
  );

  const setupSearchParams = vscode.commands.registerCommand(
    "nextSmartSnippets.setupSearchParams",
    async () => {
      await setupClientNamedImport("next/navigation", "useSearchParams");
    },
  );

  context.subscriptions.push(
    provider,
    addLinkImport,
    addImageImport,
    addNextResponseImport,
    addMetadataImport,
    setupRouter,
    setupSearchParams,
  );
}

async function setupClientNamedImport(moduleName: string, identifier: string) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const canUseClient = await addUseClientIfMissing(editor.document);

  if (!canUseClient) {
    return;
  }

  await addNamedImportIfMissing(moduleName, identifier, false);
}

async function addDefaultImportIfMissing(
  moduleName: string,
  identifier: string,
  importStatement: string,
) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const document = editor.document;
  const text = document.getText();

  const escapedModule = escapeRegExp(moduleName);
  const escapedIdentifier = escapeRegExp(identifier);

  const regex = new RegExp(
    `import\\s+${escapedIdentifier}\\s+from\\s+["']${escapedModule}["']`,
  );

  if (regex.test(text)) {
    return;
  }

  await insertImport(document, importStatement);
}

async function addNamedImportIfMissing(
  moduleName: string,
  identifier: string,
  typeOnly: boolean,
) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const document = editor.document;
  const text = document.getText();

  const escapedModule = escapeRegExp(moduleName);

  const importRegex = new RegExp(
    `import\\s+(type\\s+)?\\{([^}]*)\\}\\s+from\\s+["']${escapedModule}["'];?`,
    "gs",
  );

  const matches = [...text.matchAll(importRegex)];

  for (const match of matches) {
    const specifiers = parseNamedSpecifiers(match[2]);

    if (hasLocalIdentifier(specifiers, identifier)) {
      return;
    }
  }

  if (typeOnly) {
    const typeImport = matches.find((match) => Boolean(match[1]));

    if (typeImport) {
      await mergeNamedImport(document, typeImport, identifier, false);

      return;
    }

    const valueImport = matches.find((match) => !match[1]);

    if (valueImport) {
      await mergeNamedImport(document, valueImport, identifier, true);

      return;
    }

    await insertImport(
      document,
      `import type { ${identifier} } from "${moduleName}";`,
    );

    return;
  }

  const valueImport = matches.find((match) => !match[1]);

  if (valueImport) {
    await mergeNamedImport(document, valueImport, identifier, false);

    return;
  }

  await insertImport(
    document,
    `import { ${identifier} } from "${moduleName}";`,
  );
}

async function mergeNamedImport(
  document: vscode.TextDocument,
  match: RegExpMatchArray,
  identifier: string,
  inlineType: boolean,
) {
  const fullImport = match[0];
  const typeKeyword = match[1] ?? "";

  const existingSpecifiers = parseNamedSpecifiers(match[2]);

  const newSpecifier = inlineType ? `type ${identifier}` : identifier;

  const mergedSpecifiers = [...existingSpecifiers, newSpecifier];

  const moduleMatch = fullImport.match(/from\s+["']([^"']+)["']/);

  if (!moduleMatch) {
    return;
  }

  const moduleName = moduleMatch[1];

  const replacement =
    `import ${typeKeyword}{ ${mergedSpecifiers.join(", ")} } ` +
    `from "${moduleName}";`;

  const startOffset = match.index;

  if (startOffset === undefined) {
    return;
  }

  const endOffset = startOffset + fullImport.length;

  const edit = new vscode.WorkspaceEdit();

  edit.replace(
    document.uri,
    new vscode.Range(
      document.positionAt(startOffset),
      document.positionAt(endOffset),
    ),
    replacement,
  );

  await vscode.workspace.applyEdit(edit);
}

function parseNamedSpecifiers(value: string): string[] {
  return value
    .split(",")
    .map((specifier) => specifier.trim())
    .filter(Boolean);
}

function hasLocalIdentifier(specifiers: string[], identifier: string): boolean {
  return specifiers.some((specifier) => {
    const normalized = specifier.replace(/^type\s+/, "").trim();

    const aliasParts = normalized.split(/\s+as\s+/);

    const localName =
      aliasParts.length > 1 ? aliasParts[1].trim() : aliasParts[0].trim();

    return localName === identifier;
  });
}

async function addUseClientIfMissing(
  document: vscode.TextDocument,
): Promise<boolean> {
  const text = document.getText();

  if (hasDirective(text, "use client")) {
    return true;
  }

  if (hasDirective(text, "use server")) {
    void vscode.window.showWarningMessage(
      'This file contains "use server". "use client" was not added.',
    );

    return false;
  }

  const edit = new vscode.WorkspaceEdit();

  edit.insert(document.uri, new vscode.Position(0, 0), '"use client";\n\n');

  return vscode.workspace.applyEdit(edit);
}

function hasDirective(
  text: string,
  directive: "use client" | "use server",
): boolean {
  const escapedDirective = escapeRegExp(directive);

  const regex = new RegExp(`^\\s*["']${escapedDirective}["'];?`);

  return regex.test(text);
}

async function insertImport(
  document: vscode.TextDocument,
  importStatement: string,
) {
  const edit = new vscode.WorkspaceEdit();
  const insertPosition = getImportInsertPosition(document);

  edit.insert(document.uri, insertPosition, `${importStatement}\n`);

  await vscode.workspace.applyEdit(edit);
}

function getImportInsertPosition(
  document: vscode.TextDocument,
): vscode.Position {
  let line = 0;

  while (
    line < document.lineCount &&
    document.lineAt(line).text.trim() === ""
  ) {
    line++;
  }

  while (line < document.lineCount) {
    const text = document.lineAt(line).text.trim();

    if (
      text === '"use client";' ||
      text === "'use client';" ||
      text === '"use client"' ||
      text === "'use client'" ||
      text === '"use server";' ||
      text === "'use server';" ||
      text === '"use server"' ||
      text === "'use server'"
    ) {
      line++;

      while (
        line < document.lineCount &&
        document.lineAt(line).text.trim() === ""
      ) {
        line++;
      }

      continue;
    }

    break;
  }

  return new vscode.Position(line, 0);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function deactivate() {}
