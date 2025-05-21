import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SkillsForm({ skills = [], onChange }) {
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("intermediate");
  
  const addSkill = () => {
    if (newSkill.trim()) {
      const skill = {
        name: newSkill.trim(),
        level: newSkillLevel
      };
      
      const updatedSkills = [...skills, skill];
      onChange(updatedSkills);
      setNewSkill("");
    }
  };
  
  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    onChange(updatedSkills);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const skillLevels = {
    beginner: { label: "Beginner", color: "bg-blue-100 text-blue-800 border-blue-200" },
    intermediate: { label: "Intermediate", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    advanced: { label: "Advanced", color: "bg-purple-100 text-purple-800 border-purple-200" },
    expert: { label: "Expert", color: "bg-violet-100 text-violet-800 border-violet-200" }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="px-6 pt-6 pb-3">
        <CardTitle className="text-lg">Skills</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex gap-2 mb-4">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill (e.g. JavaScript, Project Management)"
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Select
            value={newSkillLevel}
            onValueChange={setNewSkillLevel}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Skill level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={addSkill}
            className="bg-indigo-600 hover:bg-indigo-700 min-w-[100px]"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`${skillLevels[skill.level]?.color || skillLevels.intermediate.color} text-sm py-1.5 px-3`}
              >
                {skill.name}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(index)}
                  className="h-4 w-4 ml-1 text-gray-500 hover:text-red-600 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
            <p className="text-gray-500">
              Add skills relevant to the job you're applying for. These will help with ATS matching.
            </p>
          </div>
        )}
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Tips for adding effective skills:</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Include a mix of technical and soft skills</li>
            <li>Prioritize skills mentioned in the job description</li>
            <li>Be specific (e.g. "JavaScript" instead of "Programming")</li>
            <li>Only include skills you're comfortable discussing in an interview</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}