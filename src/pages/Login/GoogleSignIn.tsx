import React, { useEffect } from "react";
import { useAuth } from "./useAuth";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleSignIn = () => {
  const { login } = useAuth();

  const GOOGLE_CLIENT_ID =
    "546399378040-d9fn58j3dkqgtbl34skrj8blghkodqnj.apps.googleusercontent.com";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin")!,
          {
            theme: "outline",
            size: "large",
            width: "100%",
          },
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response: any) => {
    const user = parseJwt(response.credential);

    login({
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  };

  const parseJwt = (token: string): any => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <div id="google-signin" style={{ width: "100%", textAlign: "center" }} />
  );
};

export default GoogleSignIn;
