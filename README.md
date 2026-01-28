# Twillo Setup Frontend
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Installations requried
Node JS 22.21.1
Get the setup commands from the link below
[Node JS](https://nodejs.org/en/download).

If already installed then run.
```
npm i
#or
yarn

```
### Env Setup
Add .env file in the root project if you are using mac or linux 
use
```
cp .env.example .env
```
The update the env values with the requried values in the env file
some of the values that will not be requried in the local development is already shared in the .env.example

## Run Development Server

```bash
npm run dev
# or
yarn dev
```

## Key Design Decisions

### Framework Choice
I chose **Next.js** with the App Router for this project as it provides good SEO experience and built in router so i dont need to handle the routing part.

### State Management
Using  **TanStack Query (React Query)** because:
- It handles caching, refetching, and background updates automatically
- Built-in loading and error states make the UI code cleaner
- keeps refreshing the data at my defined interval without refresh. 

### Styling Approach
I used **Tailwind CSS** for styling because to keep the css build optimized and
we can easlily customize the theme in future using the config file or extended css.

### Component Structure
I kept components relatively simple and focused on single responsibilities:
- created folder structure assets, components, hooks, lib, provider, types

## What I Would Improve With More Time

- Unit tests for hooks and utility functions by integrating Jest
- Implement Localization using i18next.
- Work on the SEO part updating the page metadata.
- Implement virtual scrolling for large call lists like adding pagination or infinite scroll instead of loading all calls or can use intersection observer to have this infinite scroll.
- Implement refresh token mechanism
- Move token storage to httpOnly cookies instead of localStorage.

## Contributor
Manish Singh
