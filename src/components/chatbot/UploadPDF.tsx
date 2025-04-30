
import React, { useCallback } from 'react';
import { Upload, File } from "lucide-react";

interface UploadPDFProps {
  pdfFile: File | null;
  setPdfFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadPDF: React.FC<UploadPDFProps> = ({ pdfFile, setPdfFile }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      }
    }
  }, [setPdfFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  }, [setPdfFile]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upload Your PDF</h2>
      <p className="text-gray-600 mb-6">
        Upload a single PDF document that your chatbot will use to answer questions. 
        For best results, ensure your PDF is clearly written and well-formatted.
      </p>
      
      {!pdfFile ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-900">Drag & drop your PDF here</h3>
            <p className="mt-1 text-sm text-gray-500">Or click to browse from your device</p>
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="mt-4 cursor-pointer gradient-bg rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none"
            >
              Select PDF
            </label>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center">
            <File className="h-10 w-10 text-databot-purple" />
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-900">{pdfFile.name}</h3>
              <p className="text-sm text-gray-500">
                {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setPdfFile(null)}
              className="text-red-600 hover:text-red-800 ml-4"
            >
              Remove
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Tips for best results</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Use PDFs with clear, well-formatted text</li>
          <li>Make sure the PDF is not password protected</li>
          <li>For best performance, keep file size under 10MB</li>
          <li>Text-based PDFs work better than scanned documents</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadPDF;
