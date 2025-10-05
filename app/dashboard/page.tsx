"use client"

import { useEffect, useState } from "react";
import { auth } from "@/lib/supabase";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";

export default function Dashboard() {
  const [user, setUser] = useState<any>({ email: "demo@example.com", id: "demo-user" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🏠 Dashboard component mounted - v0 AI Chat should appear");
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      console.log("🔍 Checking user authentication...");

      // First check localStorage for demo user
      const storedUser = localStorage.getItem('arcane_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log("✅ Found stored user:", userData.email);
        setUser(userData);
        return;
      }

      // Then check Supabase for real user
      const { user, error } = await auth.getCurrentUser();
      if (error) {
        console.error("❌ Error getting user:", error.message);
        setUser({ email: "demo@example.com", id: "demo-user" });
      } else if (user) {
        console.log("✅ User authenticated:", user.email);
        setUser(user);
      } else {
        console.log("❌ No authenticated user found");
        setUser({ email: "demo@example.com", id: "demo-user" });
      }
    } catch (error) {
      console.error("❌ Auth check error:", error);
      setUser({ email: "demo@example.com", id: "demo-user" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Arcane.AI Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl mx-auto px-4">
          <VercelV0Chat />
        </div>
      </main>
    </div>
  );
}
