
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, BarChart3, Shield, Clock, Headphones } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Headphones className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">HelpDesk Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Streamline Your
            <span className="text-blue-600"> Support Operations</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Powerful helpdesk solution designed for modern teams. Manage tickets, track issues, and deliver exceptional customer support with ease.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link to="/signup">
              <Button size="lg" className="px-8 py-4 text-lg">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900">Everything you need to succeed</h3>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive tools to manage your support operations efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Ticket Management</CardTitle>
              <CardDescription>
                Organize and track support requests with our intuitive ticket system
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Work together seamlessly with role-based access and internal comments
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Gain insights into your support performance with detailed analytics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Enterprise-grade security with role-based permissions and data protection
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>
                Stay informed with instant notifications and real-time ticket updates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Headphones className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>AI-Powered Support</CardTitle>
              <CardDescription>
                Leverage AI assistance to resolve tickets faster and improve efficiency
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">
              Ready to transform your support operations?
            </h3>
            <p className="mt-4 text-xl text-blue-100">
              Join thousands of teams already using HelpDesk Portal
            </p>
            <div className="mt-10">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-50"
                >
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center space-x-2">
            <Headphones className="h-6 w-6 text-blue-400" />
            <span className="text-white font-semibold">HelpDesk Portal</span>
          </div>
          <p className="mt-4 text-center text-gray-400">
            © 2024 HelpDesk Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
