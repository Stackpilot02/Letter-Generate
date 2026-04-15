"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Username atau password salah");
      } else {
        router.push("/dashboard");
        router.refresh(); // Force refresh to update navigation state
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden rounded-3xl relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-indigo-500"></div>
      
      <div className="p-8 pb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Login Admin</h2>
        <p className="text-slate-300 text-sm">Masukkan kredensial Anda untuk mengakses sistem</p>
      </div>
      <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
        <div className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-3 rounded-lg text-sm text-center font-medium">
              {error}
            </div>
          )}
          <div className="space-y-3">
            <Label htmlFor="username" className="text-slate-200 font-medium">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-12 rounded-xl"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-slate-200 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-12 rounded-xl"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all font-medium rounded-xl text-base mt-2" 
          disabled={isLoading}
        >
          {isLoading ? "Memverifikasi..." : "Masuk ke Dashboard"}
        </Button>
      </form>
    </div>
  );
}
