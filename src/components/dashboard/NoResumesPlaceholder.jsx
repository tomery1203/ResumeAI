import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoResumesPlaceholder() {
  return (
    <div className="text-center py-20 px-4">
      <div className="mx-auto w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
        <FileText className="h-10 w-10 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your first resume</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Get started by creating a professional resume with our AI-powered resume builder
      </p>
      <Link to={createPageUrl("Editor")}>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Plus className="mr-2 h-5 w-5" /> Create New Resume
        </Button>
      </Link>
      
      <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m12 8 4 4-4 4"></path>
              <path d="M8 12h8"></path>
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Easy to use</h3>
          <p className="text-gray-500 text-sm">
            Our intuitive interface guides you through the resume creation process step by step
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"></path>
              <path d="M8 4h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
              <path d="M10 8v6"></path>
              <path d="M13 8v6"></path>
              <path d="M16 8v6"></path>
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Professional templates</h3>
          <p className="text-gray-500 text-sm">
            Choose from a variety of ATS-optimized templates designed by professionals
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
              <path d="M5.8 11.3 2 22l10.7-3.79"></path>
              <path d="M4 3h16v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"></path>
              <path d="M4 7h16"></path>
              <path d="M4 11h16"></path>
              <path d="M11 15h1"></path>
              <path d="m22 22-3.5-10.5"></path>
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">AI-powered suggestions</h3>
          <p className="text-gray-500 text-sm">
            Get intelligent content suggestions to enhance your resume quality and job relevance
          </p>
        </div>
      </div>
    </div>
  );
}