# Book list

[![Test project](https://github.com/eliasylanen/books/actions/workflows/main.yml/badge.svg)](https://github.com/eliasylanen/books/actions/workflows/main.yml)

An excercise app using various newer technologies to test if they're worth using in actual projects.

## Tech stack

### Client

- React
- TypeScript
- tRPC with React Query
- Vite

### Server

- tRPC
- SQLite
- Zod

## Getting started

> The application requires an SQLite database file. A sample database is provided with the repo in the `server/` directory.

Copy the `.env.example` file to `.env` and ensure that the given defaults match your development environment. Other environment variables are also required for the app to work, but they have sensible defaults.
The service uses NPM workspaces, so just running `npm ci` in the root directory will install all dependencies and do the necessary configurations.

## Running the app

> Remember to source the .env file before running the server. [Autoenv](https://github.com/hyperupcall/autoenv) is highly recommended to automate this.

The app uses separate codebases for the client and server, which both need to be running for everything to work. Both have their respective `npm start` commands, but you can also run `npm start` in the root directory to set them both up at the same time. By default the client will be run on [localhost:5173](localhost:5173) and the server at [localhost:3000](localhost:3000).

As a POC, running the app in this case means running the respective dev servers; no separate production build is provided.

## Development

As mentioned before, the app only provides dev servers, meaning that developing the app uses the same commands as starting it up. Both the client and server react to code changes automatically and reload the service when necessary.

## Docker

The app can also be run in Docker. The `docker-compose.yml` file in the root directory will set up the client and server containers and connect them to each other. Running `docker compose up -d` sets up both containers in the background. The addresses will be the same as without using Docker.

If app development is done in Docker, it's recommended to uncomment the `volumes:` sections from the `docker-compose.yml` file. This way the containers will use the local files instead of the ones in the container, which eliminates the need for rebuilding the containers after every change.

## Tests

The app has a few basic E2E tests made with Playwright, which can be run with `npm run test`. The command also autostarts the application in the background.

## Types and code style

The app uses ESLint and Prettier for code style and TypeScript for type checking. The client and server have their own TS configurations, but ESLint and Prettier configurations are shared. The app also uses Husky to run the linters and type checker before committing.

## CI/CD

The app uses GitHub Actions for CI/CD. The workflow is triggered on every push, as well as manually from the Actions tab. The workflow runs checks the app's TS types, and run the E2E tests.

## Auto-generated boilerplate

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
parserOptions: {
  ecmaVersion: 'latest',
  sourceType: 'module',
  project: ['./tsconfig.json', './tsconfig.node.json'],
  tsconfigRootDir: __dirname,
},
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
