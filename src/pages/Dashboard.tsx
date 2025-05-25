
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import ChatInterface from '@/components/ChatInterface';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Users,
  Bot,
  Activity,
  ArrowRight
} from "lucide-react";
import { useChatbotService } from '@/hooks/useChatbotService';

const Dashboard: React.FC = () => {
  const { chatbots, isLoading } = useChatbotService();
  
  // Calculate stats
  const stats = {
    totalChatbots: chatbots.length,
    activeChatbots: chatbots.filter(c => c.status === 'active').length,
    totalDocuments: chatbots.reduce((acc, c) => acc + (c.documents?.length || 0), 0),
    processingChatbots: chatbots.filter(c => c.status === 'processing').length,
  };

  const recentChatbots = chatbots.slice(0, 3);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your chatbots.</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg">
            <Link to="/create-chatbot">
              <Plus className="h-4 w-4 mr-2" />
              Create Chatbot
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Chatbots</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalChatbots}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Bot className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Chatbots</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeChatbots}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Documents</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalDocuments}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processing</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.processingChatbots}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Chatbots */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900">Recent Chatbots</CardTitle>
                <Button variant="ghost" asChild className="text-indigo-600 hover:text-indigo-700">
                  <Link to="/manage-chatbots">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentChatbots.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No chatbots yet</h3>
                    <p className="text-gray-600 mb-6">Create your first chatbot to get started</p>
                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                      <Link to="/create-chatbot">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Chatbot
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentChatbots.map((chatbot) => (
                      <div key={chatbot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                            {chatbot.bot_icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{chatbot.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={
                                chatbot.status === 'active' 
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                  : chatbot.status === 'processing'
                                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                                  : 'bg-gray-100 text-gray-800 border-gray-200'
                              }>
                                {chatbot.status}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {chatbot.documents?.length || 0} docs
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/chat/${chatbot.id}`}>
                            <MessageSquare className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full justify-start h-auto p-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                  <Link to="/create-chatbot">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Create Chatbot</div>
                        <div className="text-sm opacity-90">Start building your AI assistant</div>
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" asChild className="w-full justify-start h-auto p-4 border-gray-200 hover:bg-gray-50">
                  <Link to="/manage-chatbots">
                    <div className="flex items-center gap-3">
                      <Bot className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Manage Chatbots</div>
                        <div className="text-sm text-gray-600">View and edit your chatbots</div>
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" asChild className="w-full justify-start h-auto p-4 border-gray-200 hover:bg-gray-50">
                  <Link to="/analytics">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">View Analytics</div>
                        <div className="text-sm text-gray-600">Track performance metrics</div>
                      </div>
                    </div>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
