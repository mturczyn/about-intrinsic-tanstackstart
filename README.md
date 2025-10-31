# About

This repo is another version of my web page about myself, this time using Tanstack Start.

# Deployment

The service currently is hosted on cloudflare, for which warngler is used to deploy the app.

Use below command to login

```
npx wrangler login
```

To ensure logged in user

```
npx wrangler whoami
```

To deploy the app use

```
npm run build;
npm run deploy;
```
