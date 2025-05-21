import React, { useState, useEffect } from "react";
import { Resume } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Save, Sparkles, AlertCircle, InfoIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import ResumeHeader from "../components/editor/ResumeHeader";
import PersonalInfoForm from "../components/editor/PersonalInfoForm";
import ExperienceForm from "../components/editor/ExperienceForm";
import EducationForm from "../components/editor/EducationForm";
import SkillsForm from "../components/editor/SkillsForm";
import AdditionalSectionsForm from "../components/editor/AdditionalSectionsForm";
import ResumePreview from "../components/preview/ResumePreview";

export default function Editor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [resumeData, setResumeData] = useState({
    title: "Untitled Resume",
    template: "professional",
    personal_info: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      summary: ""
    },
    work_experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
    projects: []
  });
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);

  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple design"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional format for corporate roles"
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with stylish elements"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Unique layout for creative fields"
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated design for leadership positions"
    }
  ];

  useEffect(() => {
    const loadResume = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        
        if (id) {
          const resume = await Resume.get(id);
          setResumeData(resume);
          setResumeId(id);
        }
      } catch (error) {
        console.error("Error loading resume:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadResume();
  }, []);

  const handleChange = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleNestedChange = (section, nestedSection, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: data
      }
    }));
  };

  const saveResume = async () => {
    setSaving(true);
    try {
      if (resumeId) {
        await Resume.update(resumeId, resumeData);
      } else {
        const newResume = await Resume.create(resumeData);
        setResumeId(newResume.id);
      }
      // Navigate to dashboard after save
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setSaving(false);
    }
  };

  const getAiSuggestion = async (section, currentContent) => {
    setAiLoading(true);
    setAiSuggestion(null);
    
    try {
      let prompt = "";
      let targetField = "";
      
      if (section === "summary") {
        prompt = `Generate a professional and compelling resume summary for a ${resumeData.title} position. 
        Work experience: ${JSON.stringify(resumeData.work_experience)}
        Education: ${JSON.stringify(resumeData.education)}
        Skills: ${JSON.stringify(resumeData.skills.map(s => s.name))}
        Current summary (improve this): ${currentContent || "No existing summary"}`;
        targetField = "summary";
      } else if (section === "experience") {
        const expIndex = resumeData.work_experience.findIndex(exp => exp.description === currentContent);
        const experience = resumeData.work_experience[expIndex];
        
        prompt = `Generate a compelling and quantified job description bullet points for the position of ${experience.position} at ${experience.company}.
        The industry is likely ${resumeData.title}.
        When possible, include metrics and achievements with numbers.
        Focus on accomplishments, not just responsibilities.
        Current description (improve this): ${currentContent || "No existing description"}`;
        targetField = "experience_description";
      }

      const response = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            improved_content: { type: "string" },
            explanation: { type: "string" }
          }
        }
      });

      setAiSuggestion({
        field: targetField,
        original: currentContent,
        improved: response.improved_content,
        explanation: response.explanation
      });
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const applySuggestion = () => {
    if (!aiSuggestion) return;
    
    if (aiSuggestion.field === "summary") {
      handleNestedChange("personal_info", "summary", aiSuggestion.improved);
    } else if (aiSuggestion.field === "experience_description") {
      const updatedExperiences = [...resumeData.work_experience];
      const expIndex = updatedExperiences.findIndex(exp => exp.description === aiSuggestion.original);
      if (expIndex !== -1) {
        updatedExperiences[expIndex] = {
          ...updatedExperiences[expIndex],
          description: aiSuggestion.improved
        };
        handleChange("work_experience", updatedExperiences);
      }
    }
    
    setAiSuggestion(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost" 
            size="icon"
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-10 w-full mb-6" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
          </div>
          <div className="hidden lg:block">
            <Skeleton className="h-[600px] w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ResumeHeader 
        title={resumeData.title}
        onTitleChange={(title) => handleChange("title", title)}
        onBackClick={() => navigate(createPageUrl("Dashboard"))}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="additional">Additional</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <PersonalInfoForm 
                data={resumeData.personal_info} 
                onChange={(data) => handleChange("personal_info", data)}
                onAiRequest={(summary) => getAiSuggestion("summary", summary)}
                aiLoading={aiLoading}
              />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceForm 
                experiences={resumeData.work_experience} 
                onChange={(data) => handleChange("work_experience", data)}
                onAiRequest={(description) => getAiSuggestion("experience", description)}
                aiLoading={aiLoading}
              />
            </TabsContent>
            
            <TabsContent value="education">
              <EducationForm 
                education={resumeData.education} 
                onChange={(data) => handleChange("education", data)} 
              />
            </TabsContent>
            
            <TabsContent value="skills">
              <SkillsForm 
                skills={resumeData.skills} 
                onChange={(data) => handleChange("skills", data)} 
              />
            </TabsContent>
            
            <TabsContent value="additional">
              <AdditionalSectionsForm
                certifications={resumeData.certifications}
                languages={resumeData.languages}
                projects={resumeData.projects}
                onChange={(section, data) => handleChange(section, data)}
              />
            </TabsContent>
          </Tabs>
          
          {/* Template selection - moved from separate page */}
          <Card className="mb-6 border-none shadow-sm">
            <CardHeader className="px-6 pt-6 pb-3">
              <CardTitle className="text-lg">Resume Template</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={cn(
                      "cursor-pointer border rounded-lg p-3 flex flex-col transition-all h-24",
                      resumeData.template === template.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30"
                    )}
                    onClick={() => handleChange("template", template.id)}
                  >
                    <div className="relative flex-grow">
                      {resumeData.template === template.id && (
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white rounded-full p-1">
                          <Check className="h-2 w-2" />
                        </div>
                      )}
                    </div>
                    <div className="mt-auto">
                      <h3 className={cn(
                        "font-medium text-sm",
                        resumeData.template === template.id ? "text-indigo-700" : "text-gray-900"
                      )}>
                        {template.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 truncate">{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {aiSuggestion && (
            <Alert className="mb-6 bg-indigo-50 border-indigo-200">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <AlertTitle className="text-indigo-700">AI Suggestion</AlertTitle>
              <AlertDescription className="mt-2">
                <p className="text-gray-600 mb-2">{aiSuggestion.explanation}</p>
                <div className="bg-white rounded-md p-3 border border-indigo-100 text-sm">
                  {aiSuggestion.improved}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    onClick={applySuggestion}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Apply Suggestion
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setAiSuggestion(null)}
                  >
                    Dismiss
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="border-t pt-6 flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              <InfoIcon className="h-4 w-4 mr-1" />
              All changes are automatically saved to preview
            </div>
            <Button 
              onClick={saveResume} 
              disabled={saving}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Resume"}
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:block sticky top-4 h-[calc(100vh-8rem)] overflow-auto">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
      
      {/* Mobile preview button */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button 
          onClick={() => navigate(`${createPageUrl("Preview")}?id=${resumeId}`)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full h-14 w-14 p-0 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </Button>
      </div>
    </div>
  );
}