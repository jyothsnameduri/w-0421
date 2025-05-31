
import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import EmployeeDashboard from '@/components/Dashboard/EmployeeDashboard';

const Dashboard: React.FC = () => {
  const { profile, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Route to appropriate dashboard based on role
  switch (profile?.role) {
    case 'admin':
      return <div>Admin Dashboard (Coming Soon)</div>;
    case 'agent':
      return <div>Agent Dashboard (Coming Soon)</div>;
    default:
      return <EmployeeDashboard />;
  }
};

export default Dashboard;
