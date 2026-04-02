import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(5, score);
  };

  const strengthScore = getPasswordStrength(password);
  
  const getStrengthText = (score: number) => {
    if (score === 0) return "";
    if (score <= 2) return "Weak";
    if (score === 3) return "Fair";
    if (score === 4) return "Good";
    return "Strong";
  };
  
  const getStrengthColor = (score: number) => {
    if (score <= 2) return "bg-red-500";
    if (score === 3) return "bg-yellow-500";
    if (score === 4) return "bg-blue-500";
    return "bg-green-500";
  };
  
  const getTextColor = (score: number) => {
    if (score <= 2) return "text-red-500";
    if (score === 3) return "text-yellow-500";
    if (score === 4) return "text-blue-500";
    return "text-green-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);
    
    if (result.success) {
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } else {
      setError(result.error || "Signup failed");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className={`w-full max-w-sm rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-8 shadow-2xl ${shaking ? "animate-shake" : ""}`}>
          <div className="text-center mb-8">
            <img src="/Logo.svg" alt="QuantiveIx Logo" className="h-20 w-auto mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">Create your account</p>
          </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Your name"
                />
              </div>
            </div>
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
                  placeholder="you@example"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Password</label>
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
            
            {password.length > 0 && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-300">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">Password strength</span>
                  <span className={`font-semibold ${getTextColor(strengthScore)}`}>{getStrengthText(strengthScore)}</span>
                </div>
                <div className="flex gap-1 h-1.5 w-full">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div 
                      key={index} 
                      className={`h-full flex-1 rounded-full transition-all duration-300 ${
                        index <= strengthScore ? getStrengthColor(strengthScore) : "bg-border/60"
                      }`} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {error && <p className="text-sm text-destructive font-medium bg-destructive/10 p-2.5 rounded-lg border border-destructive/20 text-center animate-in fade-in slide-in-from-top-1">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-primary/20 mt-4"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between overflow-hidden bg-background border-l border-border p-12">
        {/* Abstract theme color shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-primary/10 blur-[150px]" />
          <div className="absolute bottom-[40%] right-[20%] w-[40%] h-[40%] rounded-full bg-accent/30 blur-[100px]" />
        </div>
        
        <div className="relative z-10 flex items-center justify-end gap-3 left-0 right-0 animate-in fade-in slide-in-from-top-4 duration-1000">
          <img src="/Logo.svg" alt="QuantiveIx Logo" className="h-16 w-auto" />
        </div>

        <div className="relative z-10 max-w-lg mt-auto text-right ml-auto pb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <h2 className="text-4xl text-foreground font-light tracking-tight mb-6 leading-tight font-mulish">
            Unleash your team's <br/><span className="font-semibold text-primary">full potential.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-sm ml-auto font-medium font-mulish">
             Unlock a universe of features designed to scale your operations effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
