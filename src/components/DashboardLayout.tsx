
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { File, LogOut, Upload, LayoutDashboard } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, this would make an API call to log the user out
    toast.success("Logged out successfully");
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-databot-darkblue text-white flex-shrink-0">
        <div className="p-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Databotics</span>
          </Link>
        </div>
        
        <nav className="mt-8">
          <div className="px-4">
            <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              General
            </p>
            
            <div className="mt-3 space-y-2">
              <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-databot-blue text-white">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              
              <Link to="/create-chatbot" className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-databot-blue hover:text-white">
                <Upload className="mr-3 h-5 w-5" />
                Create Chatbot
              </Link>
              
              <Link to="/manage-chatbots" className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-databot-blue hover:text-white">
                <File className="mr-3 h-5 w-5" />
                Manage Chatbots
              </Link>
            </div>
          </div>
          
          <div className="px-4 mt-8">
            <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              Account
            </p>
            
            <div className="mt-3 space-y-2">
              <Link to="/profile" className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-databot-blue hover:text-white">
                Profile
              </Link>
              
              <Link to="/billing" className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-databot-blue hover:text-white">
                Billing
              </Link>
              
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex w-full items-center px-4 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-databot-blue hover:text-white"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
