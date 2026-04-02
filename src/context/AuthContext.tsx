import React, { createContext, useContext, useMemo, type ReactNode } from "react";
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from "@clerk/clerk-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser, isLoaded: userLoaded } = useUser();
  const { signOut, isLoaded: authLoaded } = useClerkAuth();
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  const user = useMemo(() => {
    if (!clerkUser) return null;
    return {
      id: clerkUser.id,
      name: clerkUser.fullName || clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress.split("@")[0] || "User",
      email: clerkUser.primaryEmailAddress?.emailAddress || "",
      avatar: clerkUser.imageUrl,
    };
  }, [clerkUser]);

  const login = async (email: string, password: string) => {
    if (!signInLoaded) return { success: false, error: "Auth not loaded" };
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      if (result.status === "complete") {
        if (setActive) {
          await setActive({ session: result.createdSessionId });
        }
        return { success: true };
      } else {
        return { success: false, error: "Further action required: " + result.status };
      }
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || "Login failed" };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!signUpLoaded) return { success: false, error: "Auth not loaded" };
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" "),
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || "Signup failed" };
    }
  };

  const loginWithGoogle = async () => {
    if (!signInLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/dashboard`,
      });
    } catch (err) {
      console.error("Google Auth failed", err);
    }
  };

  const logout = async () => {
    await signOut();
  };

  const updateUser = () => {
    // Note: In a real app with Clerk, you'd use clerkUser.update({ ... })
    // For now, we just acknowledge that updateUser is handled by Clerk's core state
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoaded: userLoaded && authLoaded && signInLoaded && signUpLoaded,
      login, 
      signup, 
      loginWithGoogle,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
