import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { supabase } from '@/lib/supabase';

type UserRole = 'student' | 'teacher' | 'admin' | null;

interface UserData {
  role: UserRole;
  name: string | null;
  avatar: string | null;
  email: string | null;
}

interface AuthContextType {
  userRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyPasswordResetCode: (email: string, code: string) => Promise<boolean>;
  userName: string | null;
  userAvatar: string | null;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  isAuthenticated: false,
  login: async () => {},
  loginWithGoogle: () => {},
  logout: () => {},
  resetPassword: async () => false,
  requestPasswordReset: async () => false,
  verifyPasswordResetCode: async () => false,
  userName: null,
  userAvatar: null,
  userEmail: null
});

export const useAuth = () => useContext(AuthContext);

// Helper to get cookie data
const getUserFromCookies = (): UserData | null => {
  const userDataStr = Cookies.get('userData');
  if (!userDataStr) return null;
  
  try {
    return JSON.parse(userDataStr);
  } catch (error) {
    console.error('Error parsing user data from cookies:', error);
    return null;
  }
}

// Helper to set cookie data
const setUserCookies = (userData: UserData) => {
  // Set cookies to expire in 7 days
  Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
}

// Helper to clear cookie data
const clearUserCookies = () => {
  Cookies.remove('userData');
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    return getUserFromCookies() || {
      role: null,
      name: null,
      avatar: null,
      email: null
    };
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getUserFromCookies();
  });
  
  const navigate = useNavigate();

  // Update cookies whenever user data changes
  useEffect(() => {
    if (isAuthenticated && userData.role) {
      setUserCookies(userData);
    }
  }, [userData, isAuthenticated]);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      console.log(`Attempting ${role} login for email: ${email}`);
      let userData;
      let userError;
      let tableName = '';
      
      // Determine which table to check based on role
      if (role === 'student') {
        tableName = 'users';
      } else if (role === 'teacher') {
        tableName = 'faculty';
      } else if (role === 'admin') {
        tableName = 'admin_users';
      }
      
      // Check if user exists in the appropriate table
      console.log(`Checking ${role} login in ${tableName} table for email: ${email}`);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('email', email)
        .single();
      
      userData = data;
      userError = error;
      
      if (userError || !userData) {
        console.error('User lookup error:', userError);
        throw new Error('Invalid credentials. Please check your email and password.');
      }
      
      console.log(`User found, verifying password for ${email}`);
      // Directly compare passwords
      const isPasswordValid = password === userData.password;
      
      if (!isPasswordValid) {
        console.error('Password verification failed');
        throw new Error('Invalid credentials. Please check your email and password.');
      }
      
      // Successfully authenticated - set user data
      console.log(`Successfully authenticated ${role}`);
      const newUserData = {
        role,
        name: userData.username,
        avatar: `https://i.pravatar.cc/150?u=${userData.username}`,
        email
      };
      
      setUserData(newUserData);
      setIsAuthenticated(true);
      setUserCookies(newUserData);
      
    } catch (error: any) {
      console.error('Login error:', error);
      throw error; // Re-throw for the login component to handle
    }
  };

  const loginWithGoogle = () => {
    // Simulate Google auth success
    // In a real application, you would integrate with Google OAuth API
    
    // Generate random role for demo purposes
    const roles: UserRole[] = ['student', 'teacher', 'admin'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)] as UserRole;
    
    // Mock Google user data
    const randomId = Math.floor(Math.random() * 1000);
    const newUserData = {
      role: randomRole,
      name: `Google User ${randomId}`,
      avatar: `https://i.pravatar.cc/150?u=google${randomId}`,
      email: `user${randomId}@gmail.com`
    };
    
    setUserData(newUserData);
    setIsAuthenticated(true);
    setUserCookies(newUserData);
    
    toast({
      title: "Google Sign-in Successful",
      description: `Welcome, ${newUserData.name}!`,
    });
    
    navigate('/');
  };

  const logout = () => {
    setUserData({
      role: null,
      name: null,
      avatar: null,
      email: null
    });
    setIsAuthenticated(false);
    clearUserCookies();
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/login');
  };
  
  // Mock function to request a password reset (would connect to backend API in real app)
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    // In a real app, this would call an API to send a password reset email
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Password Reset Requested",
          description: `If an account exists with ${email}, you will receive a reset code.`,
        });
        resolve(true);
      }, 2000);
    });
  };

  // Mock function to verify a password reset code (would connect to backend API in real app)
  const verifyPasswordResetCode = async (email: string, code: string): Promise<boolean> => {
    // In a real app, this would verify the code with a backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, consider any code valid
        resolve(true);
      }, 2000);
    });
  };

  // Mock function to reset a password (would connect to backend API in real app)
  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    // In a real app, this would update the password in a database
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been updated. You can now log in with your new password.",
        });
        resolve(true);
      }, 2000);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      userRole: userData.role, 
      isAuthenticated, 
      login, 
      loginWithGoogle,
      logout,
      resetPassword,
      requestPasswordReset,
      verifyPasswordResetCode,
      userName: userData.name,
      userAvatar: userData.avatar,
      userEmail: userData.email
    }}>
      {children}
    </AuthContext.Provider>
  );
};
