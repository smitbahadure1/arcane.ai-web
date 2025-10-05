"use client"

import { SignUpPage, Testimonial } from "@/components/ui/sign-up";
import { auth } from "@/lib/supabase";
import { useState } from "react";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Emma Wilson",
    handle: "@emmacodes",
    text: "Joining Arcane.AI was the best decision for my productivity. The AI tools are incredibly intuitive!"
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Alex Thompson",
    handle: "@alextech",
    text: "The onboarding process was seamless, and I was up and running with AI assistance in minutes."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/42.jpg",
    name: "Sofia Rodriguez",
    handle: "@sofiadesigns",
    text: "Finally, an AI platform that understands what creators need. Highly recommend!"
  },
];

export default function SignUpPageDemo() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await auth.signUp(email, password);
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else if (data.user) {
        setMessage("Account created successfully! Please check your email to verify your account.");
        // Optionally redirect to sign-in page after a delay
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
      }
    } catch (error) {
      setMessage("An unexpected error occurred");
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await auth.signInWithGoogle();
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Redirecting to Google...");
      }
    } catch (error) {
      setMessage("An unexpected error occurred");
      console.error("Google sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInRedirect = () => {
    window.location.href = "/signin";
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
      <SignUpPage
        title={<span className="font-light text-foreground tracking-tighter">Join <span className="font-bold">Arcane.AI</span></span>}
        description="Create your account and start your AI-powered journey with us today"
        heroImageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=2160&q=80"
        testimonials={sampleTestimonials}
        onSignUp={handleSignUp}
        onGoogleSignUp={handleGoogleSignUp}
        onSignInRedirect={handleSignInRedirect}
        onBackToHome={handleBackToHome}
        loading={loading}
      />
    </div>
  );
}
