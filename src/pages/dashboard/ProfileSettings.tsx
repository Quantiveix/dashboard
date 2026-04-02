import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield, Bell, Palette, Globe } from "lucide-react";

const ProfileSettings = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, push: false, weekly: true, alerts: true });
  const [preferences, setPreferences] = useState({ darkMode: true, compactView: false, animations: true });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = "w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:glow-border transition-all";

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${enabled ? "bg-primary" : "bg-border"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${enabled ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Profile & Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        {/* Profile */}
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6" style={{ animation: "slide-up-fade 0.5s ease-out forwards" }}>
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Profile Information</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border-2 border-primary/10 transition-all shadow-sm">
                {name.charAt(0) || "U"}
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold text-foreground tracking-tight leading-none mb-1">{name || "User"}</p>
                <p className="text-[11px] text-muted-foreground uppercase font-semibold tracking-widest opacity-60">Verified Active User</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all">
              Save Changes
            </button>
            {saved && <p className="text-xs text-primary animate-slide-up-fade">Profile updated!</p>}
          </form>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6" style={{ animation: "slide-up-fade 0.5s ease-out 0.1s forwards", opacity: 0 }}>
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notification Preferences</h2>
            {Object.entries(notifs).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div>
                  <span className="text-sm text-foreground capitalize">{key} notifications</span>
                  <p className="text-[10px] text-muted-foreground">
                    {key === "email" ? "Receive updates via email" :
                     key === "push" ? "Browser push notifications" :
                     key === "weekly" ? "Weekly summary digest" : "Transaction alerts"}
                  </p>
                </div>
                <Toggle enabled={val} onToggle={() => setNotifs({ ...notifs, [key]: !val })} />
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="rounded-lg border border-destructive/30 bg-card p-4 sm:p-6" style={{ animation: "slide-up-fade 0.5s ease-out 0.3s forwards", opacity: 0 }}>
            <h2 className="text-sm font-semibold text-destructive mb-3">Danger Zone</h2>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="flex items-center gap-2 rounded-md border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full justify-center"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
