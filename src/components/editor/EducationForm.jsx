import React, { useState } from "react";
import { Plus, X, ChevronDown, ChevronUp } from "lucide-react";
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

export default function EducationForm({ education = [], onChange }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);

  const emptyEducation = {
    institution: "",
    degree: "",
    field_of_study: "",
    location: "",
    start_date: "",
    end_date: "",
    current: false,
    description: "",
    achievements: []
  };

  const handleAddNew = () => {
    setCurrentEducation(emptyEducation);
    setEditIndex(-1);
    setIsDialogOpen(true);
  };

  const handleEdit = (edu, index) => {
    setCurrentEducation({ ...edu });
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDelete = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    onChange(newEducation);
  };

  const handleCurrentChange = (checked) => {
    setCurrentEducation(prev => ({
      ...prev,
      current: checked,
      end_date: checked ? "" : prev.end_date
    }));
  };

  const handleSave = () => {
    const newEducation = [...education];
    
    if (editIndex >= 0) {
      newEducation[editIndex] = currentEducation;
    } else {
      newEducation.push(currentEducation);
    }
    
    onChange(newEducation);
    setIsDialogOpen(false);
  };

  const handleAddAchievement = () => {
    setCurrentEducation(prev => ({
      ...prev,
      achievements: [...prev.achievements, ""]
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...currentEducation.achievements];
    newAchievements[index] = value;
    
    setCurrentEducation(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const handleRemoveAchievement = (index) => {
    const newAchievements = [...currentEducation.achievements];
    newAchievements.splice(index, 1);
    
    setCurrentEducation(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const reorderEducation = (index, direction) => {
    if (
      (direction === "up" && index === 0) || 
      (direction === "down" && index === education.length - 1)
    ) {
      return;
    }
    
    const newEducation = [...education];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    [newEducation[index], newEducation[targetIndex]] = 
      [newEducation[targetIndex], newEducation[index]];
    
    onChange(newEducation);
  };

  return (
    <>
      <Card className="mb-6 border-none shadow-sm">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-lg flex justify-between items-center">
            Education
            <Button 
              onClick={handleAddNew}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {education.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No education added yet. Click "Add Education" to get started.
              </p>
            </div>
          ) : (
            <Accordion type="multiple" defaultValue={["0"]} className="space-y-4">
              {education.map((edu, index) => (
                <AccordionItem key={index} value={index.toString()} className="border rounded-lg px-4">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div className="flex items-start">
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-base">{edu.degree} {edu.field_of_study ? `in ${edu.field_of_study}` : ""}</h3>
                        <p className="text-sm text-gray-500">{edu.institution}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p>{edu.location || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p>
                            {edu.start_date || "Start date"} - {edu.current ? "Present" : edu.end_date || "End date"}
                          </p>
                        </div>
                      </div>
                      
                      {edu.description && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Description</p>
                          <p className="text-sm">{edu.description}</p>
                        </div>
                      )}
                      
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Achievements</p>
                          <ul className="list-disc list-inside space-y-1">
                            {edu.achievements.map((achievement, i) => (
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
                            onClick={() => reorderEducation(index, "up")}
                            disabled={index === 0}
                            className="h-8 w-8"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => reorderEducation(index, "down")}
                            disabled={index === education.length - 1}
                            className="h-8 w-8"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(edu, index)}
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
            <DialogTitle>{editIndex >= 0 ? "Edit Education" : "Add Education"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  placeholder="University of California, Berkeley"
                  value={currentEducation?.institution || ""}
                  onChange={(e) => setCurrentEducation({...currentEducation, institution: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    placeholder="Bachelor of Science"
                    value={currentEducation?.degree || ""}
                    onChange={(e) => setCurrentEducation({...currentEducation, degree: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="field_of_study">Field of Study</Label>
                  <Input
                    id="field_of_study"
                    placeholder="Computer Science"
                    value={currentEducation?.field_of_study || ""}
                    onChange={(e) => setCurrentEducation({...currentEducation, field_of_study: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Berkeley, CA"
                  value={currentEducation?.location || ""}
                  onChange={(e) => setCurrentEducation({...currentEducation, location: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    placeholder="Aug 2016"
                    value={currentEducation?.start_date || ""}
                    onChange={(e) => setCurrentEducation({...currentEducation, start_date: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    placeholder="May 2020"
                    value={currentEducation?.end_date || ""}
                    onChange={(e) => setCurrentEducation({...currentEducation, end_date: e.target.value})}
                    disabled={currentEducation?.current}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="current-education"
                  checked={currentEducation?.current || false}
                  onCheckedChange={handleCurrentChange}
                />
                <Label htmlFor="current-education">I'm currently studying here</Label>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your studies, relevant coursework, etc."
                  value={currentEducation?.description || ""}
                  onChange={(e) => setCurrentEducation({...currentEducation, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Achievements & Activities</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddAchievement}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add
                  </Button>
                </div>
                
                {currentEducation?.achievements?.length > 0 ? (
                  <div className="space-y-2">
                    {currentEducation.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={achievement}
                          onChange={(e) => handleAchievementChange(index, e.target.value)}
                          placeholder="Dean's List, 3.8 GPA, Student Club Leader"
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
                    Add honors, awards, extracurricular activities, or relevant projects.
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
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