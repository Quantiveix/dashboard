import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between overflow-hidden bg-background border-r border-border p-12">
        {/* Abstract theme color shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-primary/10 blur-[150px]" />
          <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-accent/30 blur-[100px]" />
        </div>
        
        <div className="relative z-10 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-1000">
          <img src="/Logo.svg" alt="QuantiveIx Logo" className="h-16 w-auto" />
        </div>

        <div className="relative z-10 max-w-lg mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <h2 className="text-4xl text-foreground font-light tracking-tight mb-6 font-mulish">
            Building the next generation of <span className="font-semibold text-primary">digital experiences.</span>
          </h2>
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground font-mulish">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-foreground overflow-hidden"><img src="/m1.png" alt="user" className="w-full h-full object-cover" /></div>
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-foreground overflow-hidden"><img src="/w1.png" alt="user" className="w-full h-full object-cover" /></div>
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-foreground overflow-hidden"><img src="/w2.png" alt="user" className="w-full h-full object-cover" /></div>
            </div>
            <p>Trusted by over <span className="text-foreground font-semibold">100,000+</span> teams</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className={`w-full max-w-sm rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-8 shadow-2xl ${shaking ? "animate-shake" : ""}`}>
          <div className="text-center mb-8">
            <img src="/Logo.svg" alt="QuantiveIx Logo" className="h-20 w-auto mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">Sign in to your account</p>
          </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive font-medium bg-destructive/10 p-2.5 rounded-lg border border-destructive/20 text-center animate-in fade-in slide-in-from-top-1">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-primary/20 mt-4"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50"></span>
          </div>
          <span className="relative bg-card px-3 text-xs uppercase tracking-widest text-muted-foreground font-semibold">Or continue with</span>
        </div>

        <button
          onClick={() => loginWithGoogle()}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-background/50 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-all active:scale-95"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
