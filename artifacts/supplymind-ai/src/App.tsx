import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Route, Switch, Router as WouterRouter } from 'wouter';

import { Toaster } from '@/components/ui/sonner';
import { AppLayout } from '@/components/layout/AppLayout';
import { AuthProvider, useAuth } from '@/lib/auth';

import NotFound from '@/pages/not-found';
import Forbidden from '@/pages/errors/Forbidden';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import VerifyEmail from '@/pages/auth/VerifyEmail';
import Dashboard from '@/pages/dashboard/Dashboard';
import PurchaseRequests from '@/pages/procurement/PurchaseRequests';
import PurchaseOrders from '@/pages/procurement/PurchaseOrders';
import Vendors from '@/pages/procurement/Vendors';
import RFQs from '@/pages/procurement/RFQs';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <AppLayout>{children}</AppLayout>;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/403" component={Forbidden} />

      <Route path="/">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/procurement/requests">
        <ProtectedRoute>
          <PurchaseRequests />
        </ProtectedRoute>
      </Route>
      <Route path="/procurement/orders">
        <ProtectedRoute>
          <PurchaseOrders />
        </ProtectedRoute>
      </Route>
      <Route path="/procurement/rfqs">
        <ProtectedRoute>
          <RFQs />
        </ProtectedRoute>
      </Route>
      <Route path="/procurement/vendors">
        <ProtectedRoute>
          <Vendors />
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
