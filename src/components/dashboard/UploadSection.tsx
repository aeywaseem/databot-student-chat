
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UploadPDF from '@/components/chatbot/UploadPDF';

interface UploadSectionProps {
  pdfFile: File | null;
  setPdfFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleUploadPDF: () => Promise<void>;
  isUploading: boolean;
  uploadProgress: number;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  pdfFile,
  setPdfFile,
  handleUploadPDF,
  isUploading,
  uploadProgress
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your Document</CardTitle>
        <CardDescription>
          Upload a PDF to create an AI chatbot that can answer questions about it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <UploadPDF pdfFile={pdfFile} setPdfFile={setPdfFile} />
          {pdfFile && (
            <Button 
              onClick={handleUploadPDF} 
              className="w-full gradient-bg"
              disabled={isUploading}
            >
              {isUploading ? `Uploading... ${uploadProgress}%` : "Process Document"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadSection;
