# Frontend Take-Home Test: PDF Document Viewer

**Time limit:** 60 minutes
**Stack:** React 19, TypeScript, Tailwind CSS, `react-pdf`

---

## Context

You're building a PDF viewer component for a document review workflow. Users upload paystub PDFs and need to inspect them before confirming. The viewer should let users navigate pages, zoom, and rotate the document.

## Setup

### Prerequisites

- Node 22+
- pnpm (`npm install -g pnpm`)

### Getting started

```bash
cd recruitment/pdf-viewer-test
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You should see a page with a sample PDF already rendering (first page, no controls). Your job is to make it interactive.

### Sample PDFs

Two test PDFs are provided in the `public/` folder:

- `public/sample-single-page.pdf` — a single-page document
- `public/sample-multi-page.pdf` — a multi-page document (5 pages)

The page already passes `sample-multi-page.pdf` to the viewer component. You can switch between them to test both cases.

---

## Starter Code

The project is a minimal Next.js app with `react-pdf` already configured. The file you'll be working in is:

```
src/components/pdf-document-viewer.tsx
```

It currently renders a PDF but has **no controls and no state management**. The `react-pdf` setup (worker config, `Document`/`Page` components, CSS imports) is done for you — don't worry about that part.

For UI primitives (buttons, icons), use whatever you prefer — install a component library like `shadcn/ui`, use `lucide-react` for icons, or write your own. This is your call.

---

## Requirements

Build an interactive PDF viewer with the following features:

### 1. State management with `useReducer`

Manage all viewer state through a single reducer. Your state should track at minimum:

- Current page number
- Total page count
- Zoom scale
- Rotation angle

Design your own `State` and `Action` types. We care about the type design — use discriminated unions for actions.

### 2. Toolbar

A floating toolbar above the PDF with these controls:

| Control             | Behavior                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **Zoom out** (−)    | Decrease scale by 0.25. Min scale: 1x (100%)                                                |
| **Zoom level**      | Display current zoom as percentage (e.g. "125%")                                            |
| **Zoom in** (+)     | Increase scale by 0.25. Max scale: 3x (300%)                                                |
| **Rotate left**     | Rotate 90° counterclockwise                                                                 |
| **Rotate right**    | Rotate 90° clockwise                                                                        |
| **Page navigation** | Previous/next buttons with "page/total" display. Only show when document has multiple pages |

Disable buttons at their limits (can't zoom below 100%, can't go past first/last page).

### 3. Responsive fit-to-container

The PDF page should fit within its container:

- Use a `ResizeObserver` to track the container dimensions
- Calculate the page width so the rendered page fits within the container without overflow
- When zoomed beyond 100%, the container should become scrollable
- Rotation should be accounted for (a rotated page has swapped aspect ratio)

**Hint:** `react-pdf`'s `Page` component accepts a `width` prop. You can get the intrinsic page dimensions from the `PDFDocumentProxy` returned by `Document`'s `onLoadSuccess`:

```ts
const page = await pdfProxy.getPage(pageNumber);
const viewport = page.getViewport({ scale: 1 });
// viewport.width, viewport.height
```

### 4. Loading and error states

- Show a spinner while the PDF is loading
- Show an error message if the PDF fails to load
- The toolbar should only appear once the document has loaded successfully

---

## What We're Evaluating

| Area                    | What we look for                                                              |
| ----------------------- | ----------------------------------------------------------------------------- |
| **TypeScript**          | Clean type definitions, discriminated unions, no `any`                        |
| **State design**        | Reducer correctness, immutable updates, derived state kept out of the reducer |
| **React patterns**      | Proper use of hooks, refs, effects with correct dependency arrays             |
| **Component structure** | Readable JSX, logical grouping, appropriate prop threading                    |
| **CSS / Layout**        | Tailwind proficiency, responsive container handling                           |
| **Edge cases**          | Disabled states, boundary conditions, new document resets                     |

We are **not** evaluating:

- Visual design or pixel-perfection (functional layout is fine)
- Test coverage (skip tests for this exercise)
- Performance optimization beyond basics

---

## Provided Files Reference

### `src/components/pdf-document-viewer.tsx` (starter)

```tsx
"use client";

import { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type PdfDocumentViewerProps = {
  url: string;
};

export const PdfDocumentViewer = ({ url }: PdfDocumentViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* TODO: Toolbar — only visible after document loads */}

      <div ref={containerRef} className="absolute inset-x-0 top-0 bottom-0">
        <Document
          key={url}
          file={url}
          className="flex min-h-full"
          externalLinkTarget="_blank"
        >
          <Page
            pageNumber={1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading={null}
            className="m-auto"
          />
        </Document>
      </div>
    </div>
  );
};
```

---

## Submission

Commit your changes and push to the repository. Our primary review focus is `pdf-document-viewer.tsx`, but we'll look at everything you added.

If you have time remaining, feel free to add any improvements you think are valuable — but a working implementation of the core requirements is more important than extras.

Good luck!
