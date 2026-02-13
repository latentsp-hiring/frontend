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
