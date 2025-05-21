import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import MinimalTemplate from "../components/preview/templates/MinimalTemplate";
import ProfessionalTemplate from "../components/preview/templates/ProfessionalTemplate";
import ModernTemplate from "../components/preview/templates/ModernTemplate";
import CreativeTemplate from "../components/preview/templates/CreativeTemplate";
import ExecutiveTemplate from "../components/preview/templates/ExecutiveTemplate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [previewData] = useState({ // Sample data for preview
    title: "Sample Role",
    personal_info: {
      full_name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      location: "New York, NY",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.com",
      summary: "A highly motivated professional with experience in project management and software development."
    },
    work_experience: [
      { company: "Tech Solutions Inc.", position: "Software Engineer", location: "San Francisco, CA", start_date: "Jan 2020", end_date: "Present", current: true, description: "Developed and maintained web applications.", achievements: ["Led a team of 5 developers.", "Improved application performance by 20%."] }
    ],
    education: [
      { institution: "State University", degree: "B.S. in Computer Science", field_of_study: "Computer Science", location: "Anytown, USA", start_date: "Aug 2016", end_date: "May 2020", description: "Relevant coursework in data structures and algorithms." }
    ],
    skills: [{name: "JavaScript", level: "expert"}, {name: "React", level: "advanced"}, {name: "Node.js", level: "intermediate"}],
    languages: [{language: "English", proficiency: "native"}, {language: "Spanish", proficiency: "professional_working"}],
    certifications: [{name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2021"}],
    projects: [{name: "Personal Portfolio Website", description: "Designed and developed a personal portfolio to showcase projects."}]
  });
  
  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple design that focuses on content without distractions.",
      features: ["Clean layout", "Modern typography", "Minimalist styling", "ATS-optimized"],
      component: <MinimalTemplate data={previewData} />
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional format ideal for corporate environments and conventional industries.",
      features: ["Classic structure", "Formal presentation", "Conventional sections", "ATS-friendly"],
      component: <ProfessionalTemplate data={previewData} />
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with stylish elements for progressive companies.",
      features: ["Two-column layout", "Progress bars", "Timeline visualization", "Visual highlights"],
      component: <ModernTemplate data={previewData} />
    },
    {
      id: "creative",
      name: "Creative",
      description: "Unique layout for design and creative fields with visual flair.",
      features: ["Distinctive header", "Color accents", "Modern card design", "Visual hierarchy"],
      component: <CreativeTemplate data={previewData} />
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated design for leadership positions emphasizing experience.",
      features: ["Refined typography", "Formal structure", "Distinguished layout", "Emphasis on achievements"],
      component: <ExecutiveTemplate data={previewData} />
    }
  ];
  
  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    // Here you would typically save this preference to user settings or apply it to the current resume
    console.log("Selected template:", id);
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight lg:text-5xl">
          Find Your Perfect Resume Template
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Choose from our professionally designed, ATS-friendly templates to make your resume stand out.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out flex flex-col",
              selectedTemplate === template.id 
                ? "ring-2 ring-indigo-600 shadow-2xl scale-105" 
                : "hover:shadow-xl hover:scale-102"
            )}
          >
            <CardHeader className="p-0">
              <div className="relative group">
                <div className="h-64 w-full bg-gray-100 border-b overflow-hidden">
                  <div className={`w-full h-full bg-[url('https://images.unsplash.com/photo-${
                    template.id === "minimal" ? "1631634576591-13bd34afdf3a" :
                    template.id === "professional" ? "1586281380349-632531db7ed4" :
                    template.id === "modern" ? "1586281380117-5a60ae2050cc" :
                    template.id === "creative" ? "1626425083816-8e0d9a592dfb" :
                    template.id === "executive" ? "1586281380117-5a60ae2050cc" :
                    "1517248888709-79c96915deba" 
                  }?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-300`}/>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[90vh] p-0">
                    <DialogHeader className="p-4 border-b">
                      <DialogTitle>{template.name} Template Preview</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-auto h-[calc(90vh-65px)]">
                      <div className="bg-white shadow-lg mx-auto my-4 w-[210mm] min-h-[297mm] scale-[0.8] origin-top">
                        {template.component}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
              <CardDescription className="text-sm mb-4">{template.description}</CardDescription>
              <ul className="space-y-1 text-xs text-gray-600">
                {template.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 bg-gray-50/50">
              <Button 
                className={cn(
                  "w-full",
                  selectedTemplate === template.id 
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                )}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {selectedTemplate === template.id ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Selected
                  </>
                ) : (
                  "Select Template"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}