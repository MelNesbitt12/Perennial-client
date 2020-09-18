### Perennial: Renewals Tracking App

Perennial is a single page application designed for keeping track of a user's upcoming monthly or yearly renewals.

I came up with the idea for Perennial after my husband and I realized our car registration was expired...by almost a year. It got me thinking about all of the subscriptions, plans, etc. that we have to keep track of and how tough it can be to keep it all straight. I wanted to create a user-friendly application that store all of the data a user might need about their renewals, including expiration dates, comments, and instructions on each individual renewal.

## Setup Steps:

- Fork and clone this repository.
- Create and checkout to a new branch to begin your work.
- Run `npm install` to install all dependencies
- Use `npm start` to spin up the server.

## Important Links:
- [Perennial API Repository](https://github.com/MelNesbitt12/Perennial-api)
- Deployed API
- Deployed Client

## Planning Story:
For this project, I wanted to be as organized as possible from the start, so I used smartsheet to make a list of all requirements I needed to meet in order to reach MVP, as well as a list of stretch goals/extras I wanted to incorporate if I had time. After creating and populating my smartsheet, I moved on to my ERD and wireframes, as well as user stories.

I began by setting up both my front and back end repositories and using curl scripts to check authentication on both the front and back end. After confirming my curl scripts worked, I focused on the back end: creating my renewal resource and all its endpoints, testing my ability to CRUD the resource with curl scripts, and adding the relationship and ownership of the user to the renewal resource.

Then I moved on to the front end: I created my resource, tested CRUD (create, update, delete, index and show) with curl scripts and in the browser, and made sure that all actions had success and failure messages associated with them.

Styling came last - for this project, I wanted to continue to practice using Bootstrap, so I incorporated Cards and a Jumbotron. I also did most of my styling with inline CSS.

## User Stories:
- As a user I want to sign in/up
- As a user I want to be able to change my password
- As a user I want to be able to log out
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


## Tasks

`npm` is used as a task runner for this project. These are the commands available:

| Command                | Effect                                                                                                      |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| `npm run server`       | Starts a development server with `nodemon` that automatically refreshes when you change something.                                                                                         |
| `npm test`             | Runs automated tests.                                                                                       |
| `npm run debug-server` | Starts the server in debug mode, which will print lots of extra info about what's happening inside the app. |


### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/renewals`            | `renewals#index`  |
| GET    | `/renewals/:id`        | `renewal#show`    |
| POST   | `/renewals/create-renewal`| `renewal#create`|
| PATCH  | `/renewals/:id/update` | `renewal#update`  |
| DELETE | `/renewals/:id`        | `renewal#delete`  |

## Tasks

Developers should run these often!

- `npm run nag`: runs code quality analysis tools on your code and complains.
- `npm run make-standard`: reformats all your code in the JavaScript Standard
  Style.
- `npm run start`: generates bundles, watches, and livereloads.
- `npm run build`: place bundled styles and scripts where `index.html` can find
    them
- `npm run deploy`: builds and deploys master branch

## Unsolved Problems:
Version 2:
- I would like to create a subdocument within the Renewal model for comments.
- I want users to be able to add hyperlinks (instead of just text links) to the `URL` section of the create renewal form, so that they can click the link from the show page and be taken straight to their subscription or service renewal page
- I want to explore bootstrap styling and have my individual resource cards lay out side-by-side instead of stacked on the index page.

## Images
![Perennial App](https://user-images.githubusercontent.com/59749085/93626999-4841fb00-f9b2-11ea-9071-871391b79d3d.png)

## Wireframes:
![Perennial Main Page](https://user-images.githubusercontent.com/59749085/93627011-4c6e1880-f9b2-11ea-8328-c2d334aa9ff6.jpg)
![Perennial Create/Update Form](https://user-images.githubusercontent.com/59749085/93627019-4f690900-f9b2-11ea-8d1b-fa58706230c8.jpg)
![Perennial Show One Renewal](https://user-images.githubusercontent.com/59749085/93627032-542dbd00-f9b2-11ea-94e4-afd8ba0c951b.jpg)
