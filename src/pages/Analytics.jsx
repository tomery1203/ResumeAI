import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Eye, Download, Share2 } from "lucide-react";

// Placeholder data - replace with actual data fetching and processing
const placeholderData = {
  totalViews: 1250,
  totalDownloads: 320,
  totalShares: 85,
  viewsOverTime: [
    { name: 'Jan', views: 100 }, { name: 'Feb', views: 150 }, { name: 'Mar', views: 200 },
    { name: 'Apr', views: 180 }, { name: 'May', views: 250 }, { name: 'Jun', views: 300 },
  ],
  templateUsage: [
    { name: 'Professional', value: 400 }, { name: 'Modern', value: 300 },
    { name: 'Creative', value: 200 }, { name: 'Minimal', value: 100 },
  ],
  topResumes: [
    { id: 1, title: "Senior Software Engineer", views: 350 },
    { id: 2, title: "Product Manager", views: 280 },
    { id: 3, title: "UX Designer", views: 210 },
  ]
};

export default function AnalyticsPage() {
  // In a real app, you'd fetch this data
  const data = placeholderData;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Analytics</h1>
        <p className="text-gray-500 mt-1">Track the performance of your resumes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalViews}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalDownloads}</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalShares}</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-indigo-600" />
              Resume Views Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Line Chart */}
            <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Line chart representation here</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-purple-600" />
              Template Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Pie Chart */}
            <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Pie chart representation here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-emerald-600" />
            Top Performing Resumes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topResumes.map((resume) => (
              <div key={resume.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{resume.title}</p>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-700">{resume.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-12 text-center">
        <p className="text-gray-500">Advanced analytics and custom reporting coming soon.</p>
      </div>
    </div>
  );
}