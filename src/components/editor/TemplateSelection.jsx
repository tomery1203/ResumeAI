import React from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TemplateSelection({ selected, onChange }) {
  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple design that focuses on content"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional format ideal for corporate environments"
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with stylish elements"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Unique layout for design and creative fields"
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated design for leadership positions"
    }
  ];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="px-6 pt-6 pb-3">
        <CardTitle className="text-lg">Resume Template</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={cn(
                "cursor-pointer border rounded-lg p-4 flex flex-col transition-all",
                selected === template.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30"
              )}
              onClick={() => onChange(template.id)}
            >
              <div className="relative">
                <div className="h-32 w-full bg-white border rounded flex items-center justify-center overflow-hidden">
                  <div className={`w-full h-full ${getTemplatePreview(template.id)}`} />
                </div>
                
                {selected === template.id && (
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
              
              <div className="mt-3">
                <h3 className={cn(
                  "font-medium text-sm",
                  selected === template.id ? "text-indigo-700" : "text-gray-900"
                )}>
                  {template.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Tips for choosing a template:</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Match the template style to your industry standards</li>
            <li>More traditional fields prefer conservative designs</li>
            <li>Creative industries allow for more unique layouts</li>
            <li>All templates are ATS-friendly to ensure your resume gets through</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get template-specific preview styles
function getTemplatePreview(templateId) {
  switch (templateId) {
    case "minimal":
      return "bg-[url('https://images.unsplash.com/photo-1631634576591-13bd34afdf3a?q=80&w=256&auto=format&fit=crop')]";
    case "professional":
      return "bg-[url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=256&auto=format&fit=crop')]";
    case "modern":
      return "bg-[url('https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=256&auto=format&fit=crop')]";
    case "creative":
      return "bg-[url('https://images.unsplash.com/photo-1626425083816-8e0d9a592dfb?q=80&w=256&auto=format&fit=crop')]";
    case "executive":
      return "bg-[url('https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=256&auto=format&fit=crop')]";
    default:
      return "bg-gray-100";
  }
}