[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

### Perennial: Renewals Tracking App

Perennial is a single page application designed for keeping track of a user's upcoming monthly or yearly renewals.

I came up with the idea for Perennial after my husband and I realized our car registration was expired...by almost a year. It got me thinking about all of the subscriptions, plans, etc. that we have to keep track of and how tough it can be to keep it all straight. I wanted to create a user-friendly application that store all of the data a user might need about their renewals, including expiration dates, comments, and instructions on each individual renewal.

## Setup Steps:

- Fork and clone this repository.
- Run install command to install all dependencies
- Use start command to spin up the server.

## Important Links:
- [Perennial API Repository](https://github.com/MelNesbitt12/Perennial-api)
- Deployed API
- Deployed Client

## Planning Story:


## User Stories:
- As a user I want to sign in/up
- As a user I want to Create a new renewal
- As a user I want to View multiple renewals
- As a user I want to View a single renewal
- As a user I want to Update a renewal I own
- As a user I want to Delete a renewal I own
- As a user I want to be able to comment on renewals I own
- As a user I want to see an expiration countdown on each renewal

## Technologies Used:
- React
- HTML/CSS
- Bootstrap
- Javascript
- Handlebars

## Tasks

Instead of `grunt`, this template uses `npm` as a task runner. This is more
conventional for modern Express apps, and it's handy because we'll definitely
use `npm` anyway. These are the commands available:

| Command                | Effect                                                                                                      |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| `npm run server`       | Starts a development server with `nodemon` that automatically refreshes when you change something.                                                                                         |
| `npm test`             | Runs automated tests.                                                                                       |
| `npm run debug-server` | Starts the server in debug mode, which will print lots of extra info about what's happening inside the app. |

## API

Use this as the basis for your own API documentation. Add a new third-level
heading for your custom entities, and follow the pattern provided for the
built-in user authentication documentation.

Scripts are included in [`curl-scripts`](curl-scripts) to test built-in actions.
Add your own scripts to test your custom API.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

## Tasks

Developers should run these often!

- `npm run nag`: runs code quality analysis tools on your code and complains.
- `npm run make-standard`: reformats all your code in the JavaScript Standard
  Style.
- `npm run start`: generates bundles, watches, and livereloads.
- `npm run build`: place bundled styles and scripts where `index.html` can find
    them
- `npm run deploy`: builds and deploys master branch

## Unsolved Issues:

## Images

## Wireframes:
[Perennial Authentication Page](https://imgur.com/a/Ghm1qyk)
[Perennial Main Page](https://imgur.com/a/Wt4OxzE)
[Perennial Create/Update Form](https://imgur.com/a/eGwyIrM)
[Perennial Show One Renewal](https://imgur.com/a/edskC2Z)
