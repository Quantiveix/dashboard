import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

/**
 * This page handles the OAuth callback from Google (and any other SSO providers).
 * Clerk redirects back here after the user authenticates with the provider.
 * AuthenticateWithRedirectCallback automatically processes the token and
 * then redirects the user to `redirectUrlComplete` (i.e., /dashboard).
 */
const SSOCallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Completing sign in...</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
};

export default SSOCallback;
