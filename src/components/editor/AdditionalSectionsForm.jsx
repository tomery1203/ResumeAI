import React, { useState } from "react";
import { X, Plus, LanguagesIcon, Award, Brush } from "lucide-react"; // Changed Certificate to Award
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdditionalSectionsForm({ certifications = [], languages = [], projects = [], onChange }) {
  const [accordionValue, setAccordionValue] = useState(["certifications"]);
  
  // Certifications Dialog
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState({ name: "", issuer: "", date: "", expires: "", url: "" });
  const [editCertIndex, setEditCertIndex] = useState(-1);
  
  // Languages Dialog
  const [langDialogOpen, setLangDialogOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({ language: "", proficiency: "professional_working" });
  const [editLangIndex, setEditLangIndex] = useState(-1);
  
  // Projects Dialog
  const [projDialogOpen, setProjDialogOpen] = useState(false);
  const [currentProj, setCurrentProj] = useState({ 
    name: "", description: "", url: "", start_date: "", end_date: "", technologies: [] 
  });
  const [editProjIndex, setEditProjIndex] = useState(-1);
  const [newTechnology, setNewTechnology] = useState("");

  // Certification handlers
  const handleAddCert = () => {
    setCurrentCert({ name: "", issuer: "", date: "", expires: "", url: "" });
    setEditCertIndex(-1);
    setCertDialogOpen(true);
  };
  
  const handleEditCert = (cert, index) => {
    setCurrentCert({ ...cert });
    setEditCertIndex(index);
    setCertDialogOpen(true);
  };
  
  const handleSaveCert = () => {
    const newCertifications = [...certifications];
    
    if (editCertIndex >= 0) {
      newCertifications[editCertIndex] = currentCert;
    } else {
      newCertifications.push(currentCert);
    }
    
    onChange("certifications", newCertifications);
    setCertDialogOpen(false);
  };
  
  const handleDeleteCert = (index) => {
    const newCertifications = [...certifications];
    newCertifications.splice(index, 1);
    onChange("certifications", newCertifications);
  };

  // Language handlers
  const handleAddLang = () => {
    setCurrentLang({ language: "", proficiency: "professional_working" });
    setEditLangIndex(-1);
    setLangDialogOpen(true);
  };
  
  const handleEditLang = (lang, index) => {
    setCurrentLang({ ...lang });
    setEditLangIndex(index);
    setLangDialogOpen(true);
  };
  
  const handleSaveLang = () => {
    const newLanguages = [...languages];
    
    if (editLangIndex >= 0) {
      newLanguages[editLangIndex] = currentLang;
    } else {
      newLanguages.push(currentLang);
    }
    
    onChange("languages", newLanguages);
    setLangDialogOpen(false);
  };
  
  const handleDeleteLang = (index) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    onChange("languages", newLanguages);
  };

  // Project handlers
  const handleAddProj = () => {
    setCurrentProj({ 
      name: "", description: "", url: "", start_date: "", end_date: "", technologies: [] 
    });
    setEditProjIndex(-1);
    setProjDialogOpen(true);
  };
  
  const handleEditProj = (proj, index) => {
    setCurrentProj({ ...proj });
    setEditProjIndex(index);
    setProjDialogOpen(true);
  };
  
  const handleSaveProj = () => {
    const newProjects = [...projects];
    
    if (editProjIndex >= 0) {
      newProjects[editProjIndex] = currentProj;
    } else {
      newProjects.push(currentProj);
    }
    
    onChange("projects", newProjects);
    setProjDialogOpen(false);
  };
  
  const handleDeleteProj = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    onChange("projects", newProjects);
  };

  // Project technology handlers
  const handleAddTechnology = () => {
    if (newTechnology.trim()) {
      setCurrentProj({
        ...currentProj,
        technologies: [...(currentProj.technologies || []), newTechnology.trim()]
      });
      setNewTechnology("");
    }
  };
  
  const handleRemoveTechnology = (index) => {
    const newTechnologies = [...currentProj.technologies];
    newTechnologies.splice(index, 1);
    setCurrentProj({
      ...currentProj,
      technologies: newTechnologies
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  // Helper to map proficiency levels to more readable format
  const getProficiencyLabel = (proficiency) => {
    const labels = {
      elementary: "Elementary",
      limited_working: "Limited Working",
      professional_working: "Professional Working",
      full_professional: "Full Professional",
      native: "Native / Bilingual"
    };
    return labels[proficiency] || proficiency;
  };

  const getProficiencyColor = (proficiency) => {
    const colors = {
      elementary: "bg-blue-100 text-blue-800",
      limited_working: "bg-indigo-100 text-indigo-800",
      professional_working: "bg-purple-100 text-purple-800",
      full_professional: "bg-violet-100 text-violet-800",
      native: "bg-green-100 text-green-800"
    };
    return colors[proficiency] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Accordion 
        type="multiple" 
        value={accordionValue} 
        onValueChange={setAccordionValue}
        className="space-y-4"
      >
        {/* Certifications Section */}
        <AccordionItem value="certifications" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="px-6 py-4 hover:no-underline bg-white">
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-indigo-600" /> {/* Changed Certificate to Award */}
              <span className="font-semibold">Certifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <div className="mb-4">
              <Button 
                onClick={handleAddCert}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Certification
              </Button>
            </div>
            
            {certifications.length > 0 ? (
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-500">
                        {cert.issuer} {cert.date && `• ${cert.date}`}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditCert(cert, index)}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteCert(index)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No certifications added yet.</p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        
        {/* Languages Section */}
        <AccordionItem value="languages" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="px-6 py-4 hover:no-underline bg-white">
            <div className="flex items-center">
              <LanguagesIcon className="w-5 h-5 mr-2 text-indigo-600" />
              <span className="font-semibold">Languages</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <div className="mb-4">
              <Button 
                onClick={handleAddLang}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Language
              </Button>
            </div>
            
            {languages.length > 0 ? (
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{lang.language}</div>
                      <Badge className={getProficiencyColor(lang.proficiency)}>
                        {getProficiencyLabel(lang.proficiency)}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditLang(lang, index)}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteLang(index)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No languages added yet.</p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        
        {/* Projects Section */}
        <AccordionItem value="projects" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="px-6 py-4 hover:no-underline bg-white">
            <div className="flex items-center">
              <Brush className="w-5 h-5 mr-2 text-indigo-600" />
              <span className="font-semibold">Projects</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <div className="mb-4">
              <Button 
                onClick={handleAddProj}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Project
              </Button>
            </div>
            
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((proj, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{proj.name}</div>
                        {proj.start_date && (
                          <div className="text-sm text-gray-500">
                            {proj.start_date} {proj.end_date && `- ${proj.end_date}`}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditProj(proj, index)}
                          className="text-gray-500 hover:text-indigo-600"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteProj(index)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {proj.description && (
                      <div className="mt-2 text-sm">{proj.description}</div>
                    )}
                    
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {proj.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline" className="bg-indigo-50">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No projects added yet.</p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Certification Dialog */}
      <Dialog open={certDialogOpen} onOpenChange={setCertDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editCertIndex >= 0 ? "Edit Certification" : "Add Certification"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="cert_name">Certification Name</Label>
              <Input
                id="cert_name"
                placeholder="AWS Certified Solutions Architect"
                value={currentCert?.name || ""}
                onChange={(e) => setCurrentCert({...currentCert, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="cert_issuer">Issuing Organization</Label>
              <Input
                id="cert_issuer"
                placeholder="Amazon Web Services"
                value={currentCert?.issuer || ""}
                onChange={(e) => setCurrentCert({...currentCert, issuer: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cert_date">Issue Date</Label>
                <Input
                  id="cert_date"
                  placeholder="May 2022"
                  value={currentCert?.date || ""}
                  onChange={(e) => setCurrentCert({...currentCert, date: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="cert_expires">Expiration Date (optional)</Label>
                <Input
                  id="cert_expires"
                  placeholder="May 2025"
                  value={currentCert?.expires || ""}
                  onChange={(e) => setCurrentCert({...currentCert, expires: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cert_url">Credential URL (optional)</Label>
              <Input
                id="cert_url"
                placeholder="https://www.credential.net/..."
                value={currentCert?.url || ""}
                onChange={(e) => setCurrentCert({...currentCert, url: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCertDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCert}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Language Dialog */}
      <Dialog open={langDialogOpen} onOpenChange={setLangDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editLangIndex >= 0 ? "Edit Language" : "Add Language"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                placeholder="Spanish"
                value={currentLang?.language || ""}
                onChange={(e) => setCurrentLang({...currentLang, language: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="proficiency">Proficiency Level</Label>
              <Select
                value={currentLang?.proficiency || "professional_working"}
                onValueChange={(value) => setCurrentLang({...currentLang, proficiency: value})}
              >
                <SelectTrigger id="proficiency">
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="limited_working">Limited Working</SelectItem>
                  <SelectItem value="professional_working">Professional Working</SelectItem>
                  <SelectItem value="full_professional">Full Professional</SelectItem>
                  <SelectItem value="native">Native / Bilingual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setLangDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLang}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={projDialogOpen} onOpenChange={setProjDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editProjIndex >= 0 ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="proj_name">Project Name</Label>
              <Input
                id="proj_name"
                placeholder="E-commerce Website Redesign"
                value={currentProj?.name || ""}
                onChange={(e) => setCurrentProj({...currentProj, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="proj_description">Description</Label>
              <Textarea
                id="proj_description"
                placeholder="Briefly describe the project, your role, and key accomplishments"
                value={currentProj?.description || ""}
                onChange={(e) => setCurrentProj({...currentProj, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="proj_url">Project URL (optional)</Label>
              <Input
                id="proj_url"
                placeholder="https://github.com/username/project"
                value={currentProj?.url || ""}
                onChange={(e) => setCurrentProj({...currentProj, url: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="proj_start_date">Start Date (optional)</Label>
                <Input
                  id="proj_start_date"
                  placeholder="Jan 2022"
                  value={currentProj?.start_date || ""}
                  onChange={(e) => setCurrentProj({...currentProj, start_date: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="proj_end_date">End Date (optional)</Label>
                <Input
                  id="proj_end_date"
                  placeholder="Mar 2022"
                  value={currentProj?.end_date || ""}
                  onChange={(e) => setCurrentProj({...currentProj, end_date: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label>Technologies Used</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  placeholder="React, Node.js, etc."
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button 
                  onClick={handleAddTechnology}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {currentProj?.technologies && currentProj.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {currentProj.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-indigo-50 flex items-center gap-1">
                      {tech}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTechnology(index)}
                        className="h-4 w-4 p-0 text-gray-500 hover:text-red-600 hover:bg-transparent"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setProjDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProj}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}