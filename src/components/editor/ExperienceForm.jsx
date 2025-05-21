import React, { useState } from "react";
import { Plus, X, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function ExperienceForm({ experiences = [], onChange, onAiRequest, aiLoading }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);

  const emptyExperience = {
    company: "",
    position: "",
    location: "",
    start_date: "",
    end_date: "",
    current: false,
    description: "",
    achievements: []
  };

  const handleAddNew = () => {
    setCurrentExperience(emptyExperience);
    setEditIndex(-1);
    setIsDialogOpen(true);
  };

  const handleEdit = (experience, index) => {
    setCurrentExperience({ ...experience });
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDelete = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    onChange(newExperiences);
  };

  const handleCurrentChange = (checked) => {
    setCurrentExperience(prev => ({
      ...prev,
      current: checked,
      end_date: checked ? "" : prev.end_date
    }));
  };

  const handleSave = () => {
    const newExperiences = [...experiences];
    
    if (editIndex >= 0) {
      newExperiences[editIndex] = currentExperience;
    } else {
      newExperiences.push(currentExperience);
    }
    
    onChange(newExperiences);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleAddAchievement = () => {
    setCurrentExperience(prev => ({
      ...prev,
      achievements: [...prev.achievements, ""]
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...currentExperience.achievements];
    newAchievements[index] = value;
    
    setCurrentExperience(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const handleRemoveAchievement = (index) => {
    const newAchievements = [...currentExperience.achievements];
    newAchievements.splice(index, 1);
    
    setCurrentExperience(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const reorderExperience = (index, direction) => {
    if (
      (direction === "up" && index === 0) || 
      (direction === "down" && index === experiences.length - 1)
    ) {
      return;
    }
    
    const newExperiences = [...experiences];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    [newExperiences[index], newExperiences[targetIndex]] = 
      [newExperiences[targetIndex], newExperiences[index]];
    
    onChange(newExperiences);
  };

  return (
    <>
      <Card className="mb-6 border-none shadow-sm">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-lg flex justify-between items-center">
            Work Experience
            <Button 
              onClick={handleAddNew}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {experiences.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No work experience added yet. Click "Add Experience" to get started.
              </p>
            </div>
          ) : (
            <Accordion type="multiple" defaultValue={["0"]} className="space-y-4">
              {experiences.map((exp, index) => (
                <AccordionItem key={index} value={index.toString()} className="border rounded-lg px-4">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div className="flex items-start">
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-base">{exp.position}</h3>
                        <p className="text-sm text-gray-500">{exp.company}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p>{exp.location || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p>
                            {exp.start_date || "Start date"} - {exp.current ? "Present" : exp.end_date || "End date"}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm text-gray-500">Description</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                            onClick={() => onAiRequest(exp.description)}
                            disabled={aiLoading}
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            {aiLoading ? "Generating..." : "Improve with AI"}
                          </Button>
                        </div>
                        <p className="text-sm mb-2">{exp.description || "No description provided."}</p>
                      </div>
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Key Achievements</p>
                          <ul className="list-disc list-inside space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm">{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => reorderExperience(index, "up")}
                            disabled={index === 0}
                            className="h-8 w-8"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => reorderExperience(index, "down")}
                            disabled={index === experiences.length - 1}
                            className="h-8 w-8"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(exp, index)}
                            className="mr-2"
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editIndex >= 0 ? "Edit Experience" : "Add Experience"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="position">Job Title</Label>
                <Input
                  id="position"
                  placeholder="Software Engineer"
                  value={currentExperience?.position || ""}
                  onChange={(e) => setCurrentExperience({...currentExperience, position: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={currentExperience?.company || ""}
                  onChange={(e) => setCurrentExperience({...currentExperience, company: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="New York, NY"
                  value={currentExperience?.location || ""}
                  onChange={(e) => setCurrentExperience({...currentExperience, location: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    placeholder="Jan 2020"
                    value={currentExperience?.start_date || ""}
                    onChange={(e) => setCurrentExperience({...currentExperience, start_date: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    placeholder="Dec 2021"
                    value={currentExperience?.end_date || ""}
                    onChange={(e) => setCurrentExperience({...currentExperience, end_date: e.target.value})}
                    disabled={currentExperience?.current}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="current-job"
                  checked={currentExperience?.current || false}
                  onCheckedChange={handleCurrentChange}
                />
                <Label htmlFor="current-job">I currently work here</Label>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your responsibilities and achievements..."
                  value={currentExperience?.description || ""}
                  onChange={(e) => setCurrentExperience({...currentExperience, description: e.target.value})}
                  rows={4}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Key Achievements</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddAchievement}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add
                  </Button>
                </div>
                
                {currentExperience?.achievements?.length > 0 ? (
                  <div className="space-y-2">
                    {currentExperience.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={achievement}
                          onChange={(e) => handleAchievementChange(index, e.target.value)}
                          placeholder="Increased sales by 20%"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveAchievement(index)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Add specific achievements to highlight your impact. Use numbers and metrics when possible.
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}