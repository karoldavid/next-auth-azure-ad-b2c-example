# Next.js with NextAuth.js and Azure AD B2C Example

This repository provides a practical example of integrating Next.js version 14, NextAuth.js version 5 (beta version, soon to be [Auth.js](https://authjs.dev/)), and Azure AD B2C for Single Page Applications with Signin User Flow. 

The implementation of Login, Logout, and Refresh Token Rotation features is designed to help other developers get a quick start.

For the NextAuth.js Upgrade Guide (v5) click [here](https://authjs.dev/guides/upgrade-to-v5).

## Getting Started

### Configure Azure AD B2C

Follow the instructions to obtain the necessary credentials:

- [Create a Tenant](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant)
- [Register a Single Page Application](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-spa)
- [Create a SignIn User Flow](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows?pivots=b2c-user-flow)

### Setup and Run

1. **Clone this repository:**

```
git clone https://github.com/karoldavid/next-auth-azure-ad-b2c-example.git
```

2. **Install dependencies:**

```
cd next-auth-azure-ad-b2c-example
yarn
```

3. **Configure your Azure AD B2C settings:**

Update the [.env.local.example](./.env.local.example) file with your B2C configuration and rename it to `.env.local`.

4. **Run the application:**

```
npm run dev
```

5. Visit `http://localhost:3000` in your browser.

## Implemented Features

### Login

- [auth.ts](./auth.ts)

### Logout

- [components/auth-components.tsx](./components/auth-components.tsx)
- [app/signout/page.tsx](./app/signout/page.tsx)
- [components/signout.tsx](./components/signout.tsx)

### Refresh Token Rotation

- [auth.ts](./auth.ts)

## Resources

The following resources were helpful in implementing these features:

- Original Repository: [NextAuth.js Example App](https://github.com/nextauthjs/next-auth-example)
 - NextAuth.js Upgrade Guide (v5): https://authjs.dev/guides/upgrade-to-v5
- Login: [NextAuth.js issue comment](https://github.com/nextauthjs/next-auth/issues/7810#issuecomment-1680240435)
- Logout: [Next Auth Azure Ad B2C signout problem session kills on app but not on azure AD](https://stackoverflow.com/questions/74557856/next-auth-azure-ad-b2c-signout-problem-session-kills-on-app-but-not-on-azure-ad)
- Refresh Token Rotation: [NextAuth.js Refresh Token Rotation Tutorial](https://next-auth.js.org/v3/tutorials/refresh-token-rotation), [NextAuth Refresh Tokens Example](https://github.com/lawrencecchen/next-auth-refresh-tokens/blob/main/pages/api/auth/%5B...nextauth%5D.js)

## License

This project is licensed under the terms of the MIT license. For more details, see the [LICENSE](./LICENSE.md) file in the repository.