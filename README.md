# PDF Document Viewer

A PDF viewer component for a document review workflow. Users upload paystub PDFs and need to inspect them before confirming.

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS
- `react-pdf` (pre-configured with worker setup)
- `lucide-react` for icons
- `shadcn/ui` available for UI primitives

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You should see a page with a sample PDF already rendering (first page, no controls).

Two test PDFs are provided in `public/pdfs/`. You can switch between them to test single-page and multi-page documents.

## Assignment

The file you'll be working in is `components/pdf-viewer.tsx`. It currently renders a PDF but has no controls and no state management. The `react-pdf` setup (worker config, `Document`/`Page` components, CSS imports) is done for you.

Build an interactive, responsive PDF viewer. When complete, the viewer should satisfy all of the following:

### Toolbar

- [ ] **Floating toolbar** above the PDF, only visible after the document loads
- [ ] **Zoom out** — decreases scale by 0.25, minimum 1x (100%)
- [ ] **Zoom level** — displays current zoom as percentage (e.g. "125%")
- [ ] **Zoom in** — increases scale by 0.25, maximum 3x (300%)
- [ ] **Rotate left** — rotates 90° counterclockwise
- [ ] **Rotate right** — rotates 90° clockwise
- [ ] **Page navigation** — previous/next buttons with "page / total" display
- [ ] **Open page** - Open pdf as a new tab so the user can use built-in pdf viewer of the browser
- [ ] **Page navigation** only shown when the document has multiple pages
- [ ] **Buttons are disabled** at their limits (min zoom, max zoom, first page, last page)

### Responsive Layout

- [ ] Mobile friendly
- [ ] PDF page fits within its container without overflow
- [ ] When zoomed beyond 100%, the container becomes scrollable
- [ ] Rotation is accounted for (rotated pages have swapped dimensions)

### Footer

- [ ] Fixed footer pinned to the bottom of the page
- [ ] **Upload** button that logs the selected file to the console

### Loading & Error States

- [ ] Spinner shown while the PDF is loading
- [ ] Error message shown if the PDF fails to load
- [ ] Toolbar only appears after the document has loaded successfully

### Bonus (verbal discussion)

- How would you handle uploading files up to 15MB to a third-party API when hosted on a serverless platform (e.g. Vercel, Netlify)?
