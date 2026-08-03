"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // Use the public client ID. In Next.js, env vars for the browser must be prefixed with NEXT_PUBLIC_
  // Since we just added GOOGLE_CLIENT_ID to .env without NEXT_PUBLIC_, we should inject it here 
  // or instruct the user to prefix it. Let's just use the string for now to ensure it works on the client.
  const clientId = "498167243673-5llost0t37jmi0bqt5iutbaqiravt2am.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
