import NextAuth from "next-auth"

// import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
// import Auth0 from "next-auth/providers/auth0"
// import Authentik from "next-auth/providers/authentik"
// import AzureAD from "next-auth/providers/azure-ad"
import AzureADB2C from "next-auth/providers/azure-ad-b2c"
// import Battlenet from "next-auth/providers/battlenet"
// import Box from "next-auth/providers/box"
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
// import Bungie from "next-auth/providers/bungie"
// import Cognito from "next-auth/providers/cognito"
// import Coinbase from "next-auth/providers/coinbase"
// import Discord from "next-auth/providers/discord"
// import Dropbox from "next-auth/providers/dropbox"
// import DuendeIDS6 from "next-auth/providers/duende-identity-server6"
// import Eveonline from "next-auth/providers/eveonline"
// import Facebook from "next-auth/providers/facebook"
// import Faceit from "next-auth/providers/faceit"
// import FortyTwoSchool from "next-auth/providers/42-school"
// import Foursquare from "next-auth/providers/foursquare"
// import Freshbooks from "next-auth/providers/freshbooks"
// import Fusionauth from "next-auth/providers/fusionauth"
// import GitHub from "next-auth/providers/github"
// import Gitlab from "next-auth/providers/gitlab"
// import Google from "next-auth/providers/google"
// import Hubspot from "next-auth/providers/hubspot"
// import Instagram from "next-auth/providers/instagram"
// import Kakao from "next-auth/providers/kakao"
// import Keycloak from "next-auth/providers/keycloak"
// import Line from "next-auth/providers/line"
// import LinkedIn from "next-auth/providers/linkedin"
// import Mailchimp from "next-auth/providers/mailchimp"
// import Mailru from "next-auth/providers/mailru"
// import Medium from "next-auth/providers/medium"
// import Naver from "next-auth/providers/naver"
// import Netlify from "next-auth/providers/netlify"
// import Okta from "next-auth/providers/okta"
// import Onelogin from "next-auth/providers/onelogin"
// import Osso from "next-auth/providers/osso"
// import Osu from "next-auth/providers/osu"
// import Passage from "next-auth/providers/passage"
// import Patreon from "next-auth/providers/patreon"
// import Pinterest from "next-auth/providers/pinterest"
// import Pipedrive from "next-auth/providers/pipedrive"
// import Reddit from "next-auth/providers/reddit"
// import Salesforce from "next-auth/providers/salesforce"
// import Slack from "next-auth/providers/slack"
// import Spotify from "next-auth/providers/spotify"
// import Strava from "next-auth/providers/strava"
// import Todoist from "next-auth/providers/todoist"
// import Trakt from "next-auth/providers/trakt"
// import Twitch from "next-auth/providers/twitch"
// import Twitter from "next-auth/providers/twitter"
// import UnitedEffects from "next-auth/providers/united-effects"
// import Vk from "next-auth/providers/vk"
// import Wikimedia from "next-auth/providers/wikimedia"
// import Wordpress from "next-auth/providers/wordpress"
// import WorkOS from "next-auth/providers/workos"
// import Yandex from "next-auth/providers/yandex"
// import Zitadel from "next-auth/providers/zitadel"
// import Zoho from "next-auth/providers/zoho"
// import Zoom from "next-auth/providers/zoom"

import type { NextAuthConfig } from "next-auth"

const BUFFER_TIME = 5 * 60;

const azureAdB2cTokentUrl = `https://${process.env.AZURE_AD_B2C_TENANT_ID}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_ID}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/token`;

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(azureAdB2cTokentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.AZURE_AD_B2C_CLIENT_ID as string,
        refresh_token: token.refreshToken as string,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      token.accessToken = data.access_token;
      token.refreshToken = data.refresh_token;
      token.tokenExpiresAt = Math.floor(
        data.expires_in + Date.now() / 1000
      );
    }
  } catch (error) {
    console.error('Failed to refresh access token', error);
    token.error = 'RefreshAccessTokenError';
  }

  return token;
}

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    // Apple,
    // Atlassian,
    // Auth0,
    // Authentik,
    // AzureAD,
    AzureADB2C(({
      id: 'azure-ad-b2c',
      name: 'Azure AD B2C',
      tenantId: process.env.AZURE_AD_B2C_TENANT_ID as string,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID as string,
      // clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
      issuer: `https://${process.env.AZURE_AD_B2C_TENANT_ID}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_GUID}/v2.0/`,
      wellKnown: `https://${process.env.AZURE_AD_B2C_TENANT_ID}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_ID}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/v2.0/.well-known/openid-configuration`,
      authorization: {
        url: `https://${process.env.AZURE_AD_B2C_TENANT_ID}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_ID}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/authorize`,
        params: {
          scope: `offline_access openid ${process.env.AZURE_AD_B2C_CLIENT_ID}`,
        },
      },
      token: `https://${process.env.AZURE_AD_B2C_TENANT_ID}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_ID}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/token`,
      checks: ['pkce'],
      client: {
        token_endpoint_auth_method: 'none',
      },
    })),
    // Battlenet,
    // Box,
    // BoxyHQSAML,
    // Bungie,
    // Cognito,
    // Coinbase,Wavo7648
    // Discord,
    // Dropbox,
    // DuendeIDS6,
    // Eveonline,
    // Facebook,
    // Faceit,
    // FortyTwoSchool,
    // Foursquare,
    // Freshbooks,
    // Fusionauth,
    // GitHub,
    // Gitlab,
    // Google,
    // Hubspot,
    // Instagram,
    // Kakao,
    // Keycloak,
    // Line,
    // LinkedIn,
    // Mailchimp,
    // Mailru,
    // Medium,
    // Naver,
    // Netlify,
    // Okta,
    // Onelogin,
    // Osso,
    // Osu,
    // Passage,
    // Patreon,
    // Pinterest,
    // Pipedrive,
    // Reddit,
    // Salesforce,
    // Slack,
    // Spotify,
    // Strava,
    // Todoist,
    // Trakt,
    // Twitch,
    // Twitter,
    // UnitedEffects,
    // Vk,
    // Wikimedia,
    // Wordpress,
    // WorkOS,
    // Yandex,
    // Zitadel,
    // Zoho,
    // Zoom,
  ],
  basePath: "/auth",
  callbacks: {
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    async jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
    
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.tokenExpiresAt = account.expires_at;
      }
    
      if (Date.now() / 1000 < (token.tokenExpiresAt as number) - BUFFER_TIME) {
        return token;
      }
    
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
