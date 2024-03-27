'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

const azureAdB2cLogoutUrl = `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_SIGNOUT_POLICY}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
  process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI ?? ''
)}`;

const handleSignOut = async () => {
    await signOut({ callbackUrl: azureAdB2cLogoutUrl });
    window.location.href = azureAdB2cLogoutUrl;
};

const SignOut = () => {
    useEffect(() => {
    handleSignOut();
  }, []);

  return null;
};

export default SignOut;