"use client";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface QuillViewerProps {
  value: string;
}

const QuillViewer = ({ value }: QuillViewerProps) => {
  return (
    <div className="rounded-quill-container quill-viewer-mode">
      <ReactQuill
        value={value}
        readOnly
        theme="snow"
        modules={{ toolbar: false }}
      />
    </div>
  );
};

export default QuillViewer;
