"use client"

import { SignInPage, Testimonial } from "@/components/ui/sign-in";
import { auth } from "@/lib/supabase";
import { useState } from "react";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity."
  },
];

export default function SignInPageDemo() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else if (data.user) {
        setMessage("Sign in successful! Redirecting...");
        console.log("✅ Sign in successful, redirecting to dashboard");
        // Set user in localStorage for demo mode
        if (error === null) {
          localStorage.setItem('arcane_user', JSON.stringify({
            email: data.user.email,
            id: data.user.id
          }));
        }
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 1500);
      }
    } catch (error) {
      setMessage("An unexpected error occurred");
      console.error("Sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await auth.signInWithGoogle();
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Redirecting to Google...");
        console.log("🔄 Redirecting to Google OAuth");
        // For mock mode, redirect immediately to dashboard
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 1000);
      }
    } catch (error) {
      setMessage("An unexpected error occurred");
      console.error("Google sign in error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetPassword = async () => {
    const email = prompt("Enter your email address:");
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await auth.resetPassword(email);
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Password reset email sent! Check your inbox.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateAccount = () => {
    window.location.href = "/signup";
  }

  const handleBackToHome = () => {
    window.location.href = "/";
  }

  return (
    <div className="bg-background text-foreground">
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-primary text-primary-foreground shadow-lg">
          {message}
        </div>
      )}
      <SignInPage
        title={<span className="font-light text-foreground tracking-tighter">Welcome to <span className="font-bold">Arcane.AI</span></span>}
        description="Sign in to access your AI-powered workspace and continue your journey with us"
        heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
        testimonials={sampleTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={handleCreateAccount}
        onBackToHome={handleBackToHome}
        loading={loading}
      />
    </div>
  );
}
