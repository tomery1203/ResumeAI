import React, { useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";

export default function ResumePreview({ resumeData }) {
  const resumeRef = useRef(null);
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      if (!resumeRef.current) {
        console.error("Resume content not found");
        return;
      }

      const fileName = `${resumeData.title || 'Resume'}.pdf`;
      
      // Create canvas from the resume div
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "white"
      });
      
      // A4 dimensions in mm (210 x 297)
      const imgWidth = 210;
      const pixelRatio = canvas.width / imgWidth;
      const imgHeight = canvas.height / pixelRatio;
      
      // Create PDF of A4 size
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(
        canvas.toDataURL('image/png'), 
        'PNG', 
        0, 
        0, 
        imgWidth, 
        imgHeight
      );
      
      // Save PDF
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  const renderTemplate = () => {
    switch (resumeData.template) {
      case "minimal":
        return <MinimalTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;
      case "modern":
        return <ModernTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      case "executive":
        return <ExecutiveTemplate data={resumeData} />;
      default:
        return <ProfessionalTemplate data={resumeData} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-t-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-medium">Resume Preview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={downloading}
          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-indigo-200"
        >
          <Download className="h-4 w-4 mr-1" />
          {downloading ? "Processing..." : "Download PDF"}
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-100 rounded-b-lg shadow-inner border border-t-0 border-gray-100">
        <div ref={resumeRef} className="bg-white shadow-sm mx-auto my-8 max-w-[800px] min-h-[1000px]">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}