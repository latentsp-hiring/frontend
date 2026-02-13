"use client";

import dynamic from "next/dynamic";

const PdfDocumentViewer = dynamic(
  () =>
    import("@/components/pdf-viewer").then((mod) => mod.PdfDocumentViewer),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <PdfDocumentViewer url="/pdfs/paystub.pdf" />
    </div>
  );
}
