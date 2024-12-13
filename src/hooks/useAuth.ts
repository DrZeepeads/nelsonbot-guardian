import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Placeholder for actual authentication logic
      console.log('Login attempted with:', email);
      setUser({
        id: '1',
        name: 'Test User',
        email: email
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const logout = useCallback(() => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }, [toast]);

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };
};