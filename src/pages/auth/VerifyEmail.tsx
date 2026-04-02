import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { KeyRound, ArrowLeft } from "lucide-react";

const VerifyEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setError("");
    if (!code) {
      setError("Please enter the verification code");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }

    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard");
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Verification failed");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <div className={`w-full max-w-sm rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-8 shadow-2xl relative z-10 ${shaking ? "animate-shake" : ""}`}>
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground font-mulish">Verify your email</h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            We've sent a 6-digit code to <br/>
            <span className="text-foreground font-semibold font-mulish">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Verification Code</label>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="000000"
              className="w-full text-center tracking-[1em] font-bold text-lg rounded-xl border border-border bg-background/50 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mulish"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-destructive font-medium bg-destructive/10 p-2.5 rounded-lg border border-destructive/20 text-center animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        <button 
          onClick={() => navigate("/signup")}
          className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8 hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to signup
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
