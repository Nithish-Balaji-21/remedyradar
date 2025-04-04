
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";

// Define user types
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  medicalHistory?: string[];
}

// Sample users for demonstration
const DEMO_USERS = [
  {
    id: "u1",
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
    role: "user" as UserRole,
    medicalHistory: ["Allergy to peanuts", "Asthma"]
  },
  {
    id: "u2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole,
    medicalHistory: []
  }
];

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for saved login info on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would call an API endpoint
    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userInfo: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        medicalHistory: foundUser.medicalHistory
      };
      
      setUser(userInfo);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userInfo.name}!`,
      });
      
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if email is already registered
    if (DEMO_USERS.some(u => u.email === email)) {
      toast({
        title: "Registration Failed",
        description: "This email is already registered. Try logging in instead.",
        variant: "destructive"
      });
      return false;
    }

    // In a real app, this would call an API endpoint to create a new user
    const newUser: User = {
      id: `u${DEMO_USERS.length + 1}`,
      name,
      email,
      role: 'user',
    };

    // For demo purposes only
    DEMO_USERS.push({
      ...newUser,
      password,
      medicalHistory: []
    });

    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast({
      title: "Registration Successful",
      description: `Welcome, ${name}! Your account has been created.`,
    });
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
