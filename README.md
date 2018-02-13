# CoolJam

CoolJam is a simple React-Graphcool starter kit. It aims at helping React developers to discover Graphcool Framework *hands on*. Used in conjunction with a CDN like Netlify, you get a powerful JAMStack to deploy without ever leaving the CLI.

**Write code, push your service to Graphcool and your front end to Netlify. Never handle any DevOps or server side scaling again!**

Note that this repository is young and will probably become the subject of numerous changes - and, we hope, debates!

Want to see a live example? [Here it is](https://cooljam.netlify.com/)!

# What does it provide?

We've packed a bit of everything, just to get you (and us) started. After getting a hand on the folder structure plus example code, you'll be able to *deploy a production app in no time*. Well, soon.

At this time you get:

* A simple Github authentication example. It can easily be enhanced, or replaced by any Graphcool template.

* The simplest possible permission system, using custom permission queries. Just here to get you started tweaking.

* An example React app, where users can authenticate using their Github account and query their profile. It is structured in a comprehensive way, using Apollo and Recompose.

* A complete Webpack script, with advanced configuration. It generates a production grade application, getting advantage of Babel dual import to extract CSS & JS chunks asynchronously.

# How do I get started?

If you are really new to Graphql, Graphcool or Apollo, you will probably have to read their respective docs. Free accounts on Graphcool cloud, Netlify and Github are mandatory to run the full example.

### First things first

In order to run the full example, you will need to register an OAuth2 app in your Github settings.

First time doing this? [Read more here](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)!

Once done:

* Set **homepage URL** to `http://localhost:8080` and **Authorization callback URL** to `http://localhost:8080/callback`
* Paste the given client ID to `config/project.js`
* Then paste client ID and secret to lines 14 and 15 of `.envrc`

Note that Graphcool resolver functions need access to environment variables. You can use a [direnv](https://direnv.net/) to achieve this. Simply run `direnv allow .` to switch to the `.envrc` environment.

### Push your first Graphcool service

Now that we've created our Github Oauth 2 app and updated our environment variables, let's clone this repository and push it to the cloud. We need a valid API endpoint to start the React application!

    # clone the repo
    git clone https://github.com/THook/CoolJam

    # cd to it
    cd CoolJam

    # install the dependencies
    npm install

    # install graphcool to manage your service
    npm install -g graphcool

    # deploy your Graphcool service to the cloud
    graphcool deploy


After pushing your service to the cloud, you should see some information on what's been going on :

Graphcool created a new service. It created:

* A **User** type and 5 new fields
* 2 **resolver functions** which handle authentication
* 4 **model permissions** related to User type

How? Cause we told it to! See `graphcool.yml` at the root of your folder to get a taste of how things are happening.



### Setup your React app

Now, our app needs to know where it should query the data. Copy the **Simple API Endpoint** and paste it on lines 4 and 5 of `config/project.js`. These fields will be used to instantiate the Apollo client in `kit/lib/apollo.js`.


### Create your first user

It seems like we're all set! All we need to do is to start our `webpack-dev-server` to get the app running:

    # start the development server
    npm start

Go to `localhost:8080` and click the Login button. After entering your credentials, you are redirected to `/callback`, which will trigger authentication.

See line 46 of `app/index.js` to witness how our React app handles authentication, redirects to profile and then performs a query over graphql.

### Build front end, then push!

What if we could push our newly created app to a CDN and get a nice URL to send to our friends and moms? I use Netlify but any will do!

    # install Netlify
    npm install netlify-cli -g

    # build our app to production grade bundle
    npm run browser

    # our bundled app now lives in `./dist`
    cd dist

    # push to Netlify
    netlify create


*Voilà!* Your app should now be living somewhere on the cloud, ready to authenticate Github users and... printing their IDs. Maybe we could offer a bit more?

# Hands on!


It was a bit long indeed! I hope everything went fine on your side. Please report any issue you may have encountered.

It's now time for you to jam!

### What you could do next

* Right now, our resolver functions only create and query our `githubuserId`. What if you enhanced our User model with, let's say name and email address?
* What if you introduced a Post model? See commented lines in `types.graphql` file
* `permissions/user/readUser.graphql` gives you a little hint on how our users could make their profile public or not...
* Our `App` class in `app/index.js` never "knows" if our user is logged in or not. Maybe it should?
* Our Profile page is loaded asynchronously. Maybe the Logout page could be too?
* ...


# Ressources

This repository is only intended to make you grasp the Graphcool Framework a bit faster. But it's still a long way! Please consider reading Graphcool docs for any further tweaking. More particularly, please give some attention to authorization and permissions.

These ressources should be useful to you:

* [Graphcool](https://www.graph.cool/docs) documentation
* [React-apollo](https://s3.amazonaws.com/apollo-docs-1.x/index.html) documentation (v1)
* [Netlify documentation](https://www.netlify.com/docs/) plus [it's CLI](https://www.netlify.com/docs/cli/)
* [Code-splitting](https://medium.com/faceyspacey/webpacks-import-will-soon-fetch-js-css-here-s-how-you-do-it-today-4eb5b4929852) with Webpack
* A useful list of [Graphcool templates](https://github.com/graphcool/templates)
* What [JAMStack](https://jamstack.org/) stands for



Made by Hugo Villain
