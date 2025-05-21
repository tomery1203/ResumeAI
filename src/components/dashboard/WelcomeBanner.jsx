import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function WelcomeBanner({ user, resumeCount }) {
  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Calculate progress percentage (max out at 100%)
  const progressPercentage = Math.min(resumeCount * 20, 100);

  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none shadow-lg mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">
              {getGreeting()}, {user?.full_name || "there"}!
            </h2>
            <p className="mt-1 text-indigo-100">
              {resumeCount > 0
                ? `You have ${resumeCount} resume${resumeCount > 1 ? "s" : ""} in your account`
                : "Get started by creating your first resume"}
            </p>
          </div>
          
          {resumeCount > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-full md:w-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-indigo-100">Resume Profile</span>
                <span className="text-sm font-semibold">{progressPercentage}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-indigo-100 mt-2">
                {progressPercentage < 100
                  ? "Keep building your profile to unlock more features"
                  : "Profile complete! You've unlocked all features"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}