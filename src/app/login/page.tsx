"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, accept any login 
    router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <form onSubmit={handleLogin} className="flex w-[400px] flex-col gap-4 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-900">Sign In to NetcheQ</h1>        

        <div>
          <Label htmlFor="email" className="text-blue-800">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="border-blue-300 focus:border-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-blue-800">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="border-blue-300 focus:border-blue-500"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Demo hint for investors */}    
        <p className="text-xs text-center text-blue-600 mt-4">
          Demo: Any email/password will work
        </p>

        {/* Create account link */}
        <p className="text-sm text-center text-blue-700">
          Don't have an account?{" "}
          <a href="/register" className="font-semibold hover:underline">
            Create one
          </a>
        </p>
      </form>
    </div>
  );
}
