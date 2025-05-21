import React, { useState, useEffect } from "react";
import { Resume } from "@/api/entities";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createPageUrl } from "@/utils";
import ResumePreview from "../components/preview/ResumePreview";

export default function PreviewPage() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        
        if (id) {
          const resume = await Resume.get(id);
          setResumeData(resume);
        } else {
          // No ID provided, redirect to dashboard
          navigate(createPageUrl("Dashboard"));
        }
      } catch (error) {
        console.error("Error loading resume:", error);
        navigate(createPageUrl("Dashboard"));
      } finally {
        setLoading(false);
      }
    };
    
    loadResume();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex mb-6">
          <Skeleton className="h-10 w-10 mr-2" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-[80vh] w-full rounded-md" />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg text-gray-600">Resume not found</p>
        <Button 
          onClick={() => navigate(createPageUrl("Dashboard"))}
          className="mt-4"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline"
          onClick={() => navigate(createPageUrl("Dashboard"))}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">{resumeData.title}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden h-[80vh]">
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  );
}