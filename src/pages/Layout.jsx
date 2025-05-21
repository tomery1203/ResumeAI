
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { 
  FileText, 
  LayoutDashboard,
  PencilRuler, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (pageName) => {
    const pageUrl = createPageUrl(pageName);
    return location.pathname === pageUrl;
  };

  const handleLogout = async () => {
    await User.logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              ResumeAI
            </h1>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-1 flex-grow">
          <Link
            to={createPageUrl("Dashboard")}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive("Dashboard")
                ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to={createPageUrl("Editor")}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive("Editor")
                ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <PencilRuler className="h-5 w-5" />
            <span>Resume Editor</span>
          </Link>
        </nav>

        <div className="p-4 border-t mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Log out</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile header */}
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            ResumeAI
          </h1>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
