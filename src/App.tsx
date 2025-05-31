
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/components/Layout/MainLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />
              } 
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              {/* Employee Routes */}
              <Route path="tickets" element={<div>My Tickets (Coming Soon)</div>} />
              <Route path="tickets/new" element={<div>Create Ticket (Coming Soon)</div>} />
              <Route path="tickets/:id" element={<div>Ticket Details (Coming Soon)</div>} />
              <Route path="ai-chat" element={<div>AI Chat (Coming Soon)</div>} />
              
              {/* Agent Routes */}
              <Route path="agent/dashboard" element={
                <ProtectedRoute allowedRoles={['agent', 'admin']}>
                  <div>Agent Dashboard (Coming Soon)</div>
                </ProtectedRoute>
              } />
              <Route path="agent/tickets" element={
                <ProtectedRoute allowedRoles={['agent', 'admin']}>
                  <div>Agent Ticket Queue (Coming Soon)</div>
                </ProtectedRoute>
              } />
              <Route path="agent/assigned" element={
                <ProtectedRoute allowedRoles={['agent', 'admin']}>
                  <div>My Assigned Tickets (Coming Soon)</div>
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div>Admin Dashboard (Coming Soon)</div>
                </ProtectedRoute>
              } />
              <Route path="admin/analytics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div>Analytics (Coming Soon)</div>
                </ProtectedRoute>
              } />
              <Route path="admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div>User Management (Coming Soon)</div>
                </ProtectedRoute>
              } />
              <Route path="admin/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div>Settings (Coming Soon)</div>
                </ProtectedRoute>
              } />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
