import React, { useState } from "react";
import { ArrowLeft, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResumeHeader({ title, onTitleChange, onBackClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleSaveTitle = () => {
    if (tempTitle.trim() !== "") {
      onTitleChange(tempTitle);
    } else {
      setTempTitle(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      setTempTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
        <Button
          variant="ghost" 
          size="icon"
          onClick={onBackClick}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        {isEditing ? (
          <div className="flex items-center w-full md:w-auto">
            <Input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveTitle}
              autoFocus
              className="text-2xl font-bold px-2 py-1 h-auto border-indigo-300 focus:border-indigo-500"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveTitle}
              className="ml-2"
            >
              <Check className="h-5 w-5 text-indigo-600" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="ml-2 text-gray-400 hover:text-indigo-600"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}