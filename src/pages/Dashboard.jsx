
import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Resume } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  FileText, 
  Calendar, 
  Copy, 
  Download, 
  Edit, 
  Trash2,
  Clock,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import NoResumesPlaceholder from "../components/dashboard/NoResumesPlaceholder";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
        
        const resumeData = await Resume.list("-created_date");
        setResumes(resumeData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleDeleteResume = async (id) => {
    try {
      await Resume.delete(id);
      setResumes(resumes.filter(resume => resume.id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const handleDuplicateResume = async (resume) => {
    try {
      const { id, created_date, updated_date, ...resumeData } = resume;
      const newTitle = `${resume.title} (Copy)`;
      await Resume.create({
        ...resumeData,
        title: newTitle
      });
      
      const updatedResumes = await Resume.list("-created_date");
      setResumes(updatedResumes);
    } catch (error) {
      console.error("Error duplicating resume:", error);
    }
  };

  const filteredResumes = resumes.filter(resume => 
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTemplateLabel = (template) => {
    const templates = {
      minimal: { label: "Minimal", color: "bg-gray-100 text-gray-800" },
      professional: { label: "Professional", color: "bg-blue-100 text-blue-800" },
      modern: { label: "Modern", color: "bg-indigo-100 text-indigo-800" },
      creative: { label: "Creative", color: "bg-purple-100 text-purple-800" },
      executive: { label: "Executive", color: "bg-emerald-100 text-emerald-800" }
    };
    
    return templates[template] || { label: template, color: "bg-gray-100 text-gray-800" };
  };

  const handleDownloadPDF = async (resume) => {
    // Navigate to preview page with the ID
    navigate(`${createPageUrl("Preview")}?id=${resume.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resume Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage and create your professional resumes</p>
        </div>
        <div className="w-full md:w-auto">
          <Link to={createPageUrl("Editor")}>
            <Button className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" /> Create New Resume
            </Button>
          </Link>
        </div>
      </div>

      {!loading && resumes.length === 0 ? (
        <NoResumesPlaceholder />
      ) : (
        <>
          <div className="relative my-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search resumes by title..."
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <Card key={index} className="overflow-hidden border-border/40 shadow-sm">
                  <CardHeader className="p-6">
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter className="px-6 py-4 bg-gray-50 flex justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                  </CardFooter>
                </Card>
              ))
            ) : filteredResumes.length > 0 ? (
              filteredResumes.map((resume) => (
                <Card key={resume.id} className="overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-start justify-between">
                      <div className="truncate mr-2">{resume.title}</div>
                      <Badge className={`${getTemplateLabel(resume.template).color} ml-2 shrink-0`}>
                        {getTemplateLabel(resume.template).label}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      Updated {format(new Date(resume.updated_date), "MMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-start gap-1 mb-1">
                        <FileText className="h-4 w-4 mt-0.5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-700">{resume.personal_info?.full_name || "No name"}</p>
                          <p>{resume.personal_info?.email || "No email"}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {resume.work_experience && resume.work_experience.length > 0 && (
                          <Badge variant="outline" className="bg-blue-50">
                            {resume.work_experience.length} Experience
                          </Badge>
                        )}
                        {resume.education && resume.education.length > 0 && (
                          <Badge variant="outline" className="bg-emerald-50">
                            {resume.education.length} Education
                          </Badge>
                        )}
                        {resume.skills && resume.skills.length > 0 && (
                          <Badge variant="outline" className="bg-amber-50">
                            {resume.skills.length} Skills
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 bg-gray-50 flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(resume.created_date), "MMM d, yyyy")}
                    </div>
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="19" cy="12" r="1"></circle>
                              <circle cx="5" cy="12" r="1"></circle>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link to={`${createPageUrl("Editor")}?id=${resume.id}`}>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Resume
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem onClick={() => handleDuplicateResume(resume)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadPDF(resume)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDeleteResume(resume.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No resumes found</h3>
                <p className="text-gray-500 mb-4">We couldn't find any resumes matching your search criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
