# Next Smart Snippets

Smart Next.js snippets for Visual Studio Code.

This extension provides practical snippets for modern Next.js App Router development, with automatic imports and client component setup where needed.

## Features

- Next.js page component snippets
- Next.js layout snippets
- `next/image` snippets with automatic import
- `next/link` snippets with automatic import
- Route Handler snippets
- Static metadata snippets
- Dynamic `generateMetadata` snippets
- Not Found page snippets
- `useRouter` snippets with automatic `"use client"`
- `useSearchParams` snippets with automatic `"use client"`
- Automatic named import merging
- Duplicate import prevention
- Context-aware snippet prioritization

## Snippets

| Prefix | Description |
| --- | --- |
| `nxpage` | Next.js page component |
| `nximage` | Next.js Image component |
| `nxlink` | Next.js Link component |
| `nxlayout` | Next.js App Router layout |
| `nxapi` | Next.js Route Handler |
| `nxnotfound` | Next.js Not Found page |
| `nxmetadata` | Static Next.js metadata |
| `nxgmetadata` | Dynamic `generateMetadata` |
| `nxrouter` | `useRouter` Client Component |
| `nxsearchparams` | `useSearchParams` Client Component |

## Examples

### `nxpage`

```tsx
export default function Page() {
  return (
    <div>
      
    </div>
  );
}
```

### `nxlink`

```tsx
import Link from "next/link";

<Link href="/" className="">
  Text
</Link>
```

### `nximage`

```tsx
import Image from "next/image";

<Image
  src="/image.png"
  alt=""
  width={500}
  height={500}
  className=""
/>
```

### `nxlayout`

```tsx
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
```

### `nxapi`

```ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello World",
  });
}
```

### `nxmetadata`

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Title",
  description: "Description",
  openGraph: {
    title: "Title",
    description: "Description",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Title",
    description: "Description",
    images: ["/og-image.png"],
  },
};
```

### `nxgmetadata`

```tsx
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: slug,
    description: "Description",
    openGraph: {
      title: slug,
      description: "Description",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: slug,
      description: "Description",
      images: ["/og-image.png"],
    },
  };
}
```

### `nxrouter`

```tsx
"use client";

import { useRouter } from "next/navigation";

export default function RouterComponent() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
    >
      Navigate
    </button>
  );
}
```

### `nxsearchparams`

```tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsComponent() {
  const searchParams = useSearchParams();
  const value = searchParams.get("key");

  return (
    <div>
      {value}
    </div>
  );
}
```

## Smart Imports

The extension automatically inserts imports when needed.

For example:

```tsx
import { usePathname } from "next/navigation";
```

Using `nxrouter` will merge the import:

```tsx
import { usePathname, useRouter } from "next/navigation";
```

It also prevents duplicate imports.

## Client Components

Snippets that require React client-side hooks automatically add:

```tsx
"use client";
```

when necessary.

If `"use client"` already exists, it will not be duplicated.

If `"use server"` is detected, the extension will not automatically convert the file to a Client Component.

## Context-Aware Suggestions

All snippets remain available, but some snippets are prioritized depending on the current file.

Examples:

- `nxpage` is prioritized in `page.tsx`
- `nxlayout` is prioritized in `layout.tsx`
- `nxapi` is prioritized in `route.ts`
- `nxnotfound` is prioritized in `not-found.tsx`
- Metadata snippets are prioritized in `page.tsx` and `layout.tsx`

## Development

Install dependencies:

```bash
pnpm install
```

Build:

```bash
pnpm build
```

Run the extension in development mode:

1. Open the project in Visual Studio Code.
2. Press `F5`.
3. A new Extension Development Host window will open.

## Package

Install `vsce` if necessary:

```bash
pnpm add -D @vscode/vsce
```

Create a VSIX package:

```bash
pnpm package
```

Then install the generated `.vsix` from:

```text
Extensions: Install from VSIX...
```

in the Visual Studio Code Command Palette.

## Requirements

- Visual Studio Code
- Next.js App Router
- TypeScript or JavaScript

## License

MIT