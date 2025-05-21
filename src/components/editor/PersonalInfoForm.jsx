import React from "react";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PersonalInfoForm({ data, onChange, onAiRequest, aiLoading }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={data.full_name || ""}
              onChange={(e) => handleChange("full_name", e.target.value)}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john.doe@example.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(123) 456-7890"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="City, State"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={data.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="website">Website / Portfolio</Label>
            <Input
              id="website"
              value={data.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="johndoe.com"
              className="mt-1"
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="summary">Professional Summary</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              onClick={() => onAiRequest(data.summary)}
              disabled={aiLoading}
            >
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              {aiLoading ? "Generating..." : "Generate with AI"}
            </Button>
          </div>
          <Textarea
            id="summary"
            value={data.summary || ""}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="A brief summary of your professional background and career goals..."
            className="mt-1 resize-none"
            rows={5}
          />
          <p className="text-xs text-gray-500 mt-1">
            A compelling summary helps employers quickly understand your value proposition. Keep it concise (3-5 sentences).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}