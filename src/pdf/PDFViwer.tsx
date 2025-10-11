"user client";

import { PDFViewer } from "@react-pdf/renderer";

export default function PDFViwer({ children }: { children: React.ReactElement }) {
  return <PDFViewer className="w-screen h-screen fixed left-0 top-0 z-50" >{children}</PDFViewer>;
}
