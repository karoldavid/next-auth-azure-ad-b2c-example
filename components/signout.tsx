'use client';

import { useEffect } from 'react';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';

interface MySession extends Session {
    accessToken: string;
  }

const azureAdB2cLogoutUrl = `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_SIGNOUT_POLICY}/oauth2/v2.0/logout`;

const handleSignOut = async () => {
    const session = await getSession() as MySession;
    const idToken = session?.accessToken;
    
    const logoutUrl = `${azureAdB2cLogoutUrl}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
         process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI ?? ''
    )}`;

    await signOut({ callbackUrl: logoutUrl });
    window.location.href = logoutUrl;
};

const SignOut = () => {
    useEffect(() => {
    handleSignOut();
  }, []);

  return null;
};

export default SignOut;

