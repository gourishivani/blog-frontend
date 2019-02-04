# BlogFrontend
Front end for Blog Application. 

This application allows users to create and view blogs. The app can be accessed based on Anonymous User and Logged In User:

Anonymous user should be able to:
1. See a list of all the users and a link to their blog posts
2. View blog posts written by any blogger
3. See comments for any blog post
4. Login to comment on a post or create a new post in their blog space
5. Register providing email, username, password and spacename

Logged In User should be able to
1. Publishes blog post with title and description
2. View their account details and posts created
Do all the things the anonymous user is able to do.

Powered by: AngularJS Version 7.x
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Requirements
You need to have the following installed to get this running locally:
- NPM (This has been tested with version 6.4.1)
- NodeJS (This has been tested with version 10.15.0)
- angular/cli (This has been tested with version 7.0.3)

## Installation Instructions
* Install NodeJS and NPM from https://nodejs.org/en/download/.
To make sure you have the right versions, please run the following commands and check against the recommended version
`node -v`
`npm -v
* Install Angular CLI
`npm install -g @angular/cli@7.0.3`
* Download the project source code from https://github.com/gourishivani/blog-frontend and cd into this folder.
* Install all required npm packages by running npm install from the command line in the project root folder (where the package.json is located).
* Start the application from the command line in the project root folder:
 `ng serve --open`  
* Open browser at http://localhost:4200 if it is not already open. This should load the Login Page.
* Load the back end code from here https://github.com/gourishivani/spring-rest-blog and follow the instructions to get the backend running

## Running unit tests
Unit Tests have not been included due to time constraints

## Running end-to-end tests
End-to-End Tests have not been included due to time constraints

## Improvements
* Tests Tests & Tests! There are no meaningful tests at the moment. The UI was only manually tested. 
* Form validation is very basic. Message could have been displayed based on the exact error condition. For example, if minimum validation fails, message related to minLength could be displayed.
* Form Binding could be done using Angular FormBuilder. Right now, I use 2 way binding support in all of the forms. This may not be needed for create only forms 
* Api Call State is handled in a very basic way. I have used a very simple state management components to display loading, error & success cases. However, ngrx could make this state management a lot more manageable. This article has been quite helpful to that end: https://blog.angularindepth.com/handle-api-call-state-nicely-445ab37cc9f8
* Data is directly loaded in the components for this prototype. However, this may not be a scalable solution in large real world applications. This also breaks the single responsibility principle. Ideally, the components should only be responsible to know how they can get the data. Resolvers may be used to take the responsibility of fetching the data.  There is also no distinction between a presentational component and Container Component
* Pagination: There is no support for pagination. The services request for all the data from the backend
* More issue links can be found here: [Issue-Links](https://github.com/gourishivani/blog-frontend/issues) file.


