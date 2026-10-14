import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile } from '../types/academic';
import { defaultStudentProfile } from '../data/mockData';

export type UserRole = 'student' | 'admin';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatarUrl: string;
  token?: string;
}

interface AuthContextType {
  currentUser: UserSession;
  studentProfile: StudentProfile;
  isLoggedIn: boolean;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updated: Partial<StudentProfile>) => void;
}

const defaultStudentUser: UserSession = {
  id: 'usr-alex-chen',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  role: 'student',
  title: 'B.Tech CS • Sem 6',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJpAKlL7dgNkOTy17C3yryfCi178Azhkn5ffQu23U5Li-YVpDC1zWIKKTB2ip4dcnoEablXMDnb8-lUPL85KutgM3Dj8JfnHXeqffvWJsEhhs8d-oy8c_IiCzN1ymaFFYW_2Cw5EpioKangVl9mr5OEH-zENcU_VvYkwQ8kVZqnXUARmKdOnjVtj-6nM2hT5ffHOYUJ4N3wJS0uJOql4uM_gU9DolSxcRIzmqf--9x12ey6Rh7zzI'
};

const defaultAdminUser: UserSession = {
  id: 'usr-sarah-jenkins',
  name: 'Prof. Sarah Jenkins',
  email: 'sarah.jenkins@university.edu',
  role: 'admin',
  title: 'CS Faculty Academic Counselor & HOD',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8LTqB1Y-NKhvkBKMDsk9rPs_YYke1Tn6RF7B3FHIS1T7AvHEvGEyValmlDpCeVYyH-FnW79TO26f7rDklg88jfzDjsO4H-uXBh1o2qAKVWISM3ZDHOLs2g9E6TrpiH-oYXb3aN9foMEuhNpKkSYjPVjs_NTgDM0GeFpr68i_pbhIZIHhxnmAbyMx9w1-Q4omeBi3hJn-q5X8fVeHxba-sl9SSTdrF_L-3vCc1j7nepxUU6ye_amo'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserSession>(() => {
    try {
      const stored = localStorage.getItem('studentai_auth_user');
      return stored ? JSON.parse(stored) : defaultStudentUser;
    } catch {
      return defaultStudentUser;
    }
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const stored = localStorage.getItem('studentai_student_profile');
      return stored ? JSON.parse(stored) : defaultStudentProfile;
    } catch {
      return defaultStudentProfile;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    try {
      localStorage.setItem('studentai_auth_user', JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Failed to persist user session', e);
    }
  }, [currentUser]);

  const login = (email: string, role: UserRole = 'student') => {
    setIsLoggedIn(true);
    if (role === 'admin' || email.includes('admin') || email.includes('faculty')) {
      setCurrentUser(defaultAdminUser);
    } else {
      setCurrentUser({
        ...defaultStudentUser,
        email: email || defaultStudentUser.email
      });
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const switchRole = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentUser(defaultAdminUser);
    } else {
      setCurrentUser(defaultStudentUser);
    }
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setStudentProfile(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem('studentai_student_profile', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      studentProfile,
      isLoggedIn,
      login,
      logout,
      switchRole,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
