<div align="center">
	<h3 align="center">Expo Template</h3>
	<p>Reusable company starter for Expo React Native apps. Auth, theming, i18n, and a mock API on top of Expo Router, HeroUI Native, and Uniwind - ready to build a new app from.</p>
	<div>
		<img src="https://img.shields.io/badge/-Typescript-3178C6?logo=typescript&logoColor=white" alt="Typescript">
		<img src="https://img.shields.io/badge/-Expo-000020?logo=expo&logoColor=white" alt="Expo">
		<img src="https://img.shields.io/badge/-React%20Native-20232A?logo=react&logoColor=61DAFB" alt="React Native">
		<img src="https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
		<img src="https://img.shields.io/badge/-Zod-3E67B1?logo=zod&logoColor=white" alt="Zod">
	</div>
</div>

---

### 🚀 Features

- File-based navigation with [Expo Router](https://docs.expo.dev/router/introduction) and a bottom-tab layout
- Auth flow with in-memory access token, persisted session, and login/logout mutations via TanStack Query
- Login, home, and profile (edit profile / change password) screens built with [HeroUI Native](https://heroui.com/docs/native) components
- Shared UI components (`ThemedText`, `ThemedView`, `ListRow`, `EmptyState`, `ErrorState`, tab bars) matching a common in-house design pattern
- Theming via HeroUI Native + [Uniwind](https://docs.uniwind.dev) (Tailwind CSS for React Native), with light/dark mode
- i18n with `i18next`/`react-i18next` - manual language switching (`vi`/`en`), namespaced translation files
- Form validation with `react-hook-form` + `zod`, including a shared error map for translated messages
- Mock API via `axios-mock-adapter`, toggled with an env var, so the app runs end-to-end without a real backend
- State management with `zustand` (persisted UI preferences: theme, language)
- TypeScript with `strict: true` and a `@/*` path alias to `./src/*`

### 🔨 Installation Guide

Follow these steps to install and run the app.

**Requirements**

Software:

- [Node.js](https://nodejs.org/en/download) (LTS, v20 or higher)
- [Yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app, or an Android/iOS simulator, for running the app

Hardware:

- RAM: 4GB or higher
- CPU: Any modern processor

**Preparation**

- Clone this repository and install dependencies:
  ```bash
  git clone <repository_url>
  cd expo-template
  yarn install
  ```
- Create a `.env` file and set the variables below (see [.env.example](.env.example)).

  ```
  # Optional - defaults let the app run fully mocked out of the box
  EXPO_PUBLIC_API_BASE_URL=https://api.example.com
  EXPO_PUBLIC_API_MOCK=1
  ```

**Mock API**

`EXPO_PUBLIC_API_MOCK=1` (the default) intercepts requests with
`axios-mock-adapter` and serves seeded users from `src/mocks/seed/users.seed.ts` -
useful for developing the app or a new feature before a real backend exists.
Set it to `0` and point `EXPO_PUBLIC_API_BASE_URL` at a real API to disable
mocking.

**Running the App**

- Start the development server:
  ```bash
  yarn start:dev
  ```
- Start directly on a platform:
  ```bash
  yarn start:android
  yarn start:ios
  ```
- Run a native build:
  ```bash
  yarn android
  yarn ios
  ```

In the output, you'll find options to open the app in a
[development build](https://docs.expo.dev/develop/development-builds/introduction/),
an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/),
an [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), or
[Expo Go](https://expo.dev/go).

### Project structure

You can start developing by editing the files inside `src/app` (routes) and
`src/features` (screen logic). This project uses
[file-based routing](https://docs.expo.dev/router/introduction).

```
src/
  app/            Expo Router routes (screens, layouts)
  features/       Feature modules (auth, profile) - schemas, api, hooks, components
  components/     Shared UI components (ThemedText, ListRow, tab bars, ...)
  lib/            Infra: api client, i18n, auth token/session storage, react-query
  mocks/          axios-mock-adapter handlers and seed data
  stores/         Zustand stores (UI preferences)
  hooks/          Shared hooks (translation, zod error map, color scheme)
  configs/        Env config
```

### Adding a new language

1. Add the language code to `Language` in `src/lib/i18n/index.ts`.
2. Create a matching folder under `src/lib/i18n/locales/<code>/` with the same
   namespace files as `en`/`vi` (`common`, `tabs`, `profile`, `settings`,
   `auth`, `validation`).
3. Register the new resources in `src/lib/i18n/index.ts`.

### Learn more

- [HeroUI Native components](https://heroui.com/docs/native) — full component reference
- [Expo documentation](https://docs.expo.dev/) — Expo fundamentals and guides
- [Uniwind documentation](https://docs.uniwind.dev) — Tailwind for React Native
- [Expo Router](https://docs.expo.dev/router/introduction) — file-based routing
