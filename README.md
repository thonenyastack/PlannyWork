## Table of contents

- [ General Info ](#general-info)
- [ Demo ](#demo)
- [ Technologies Backend](#technologies)
- [ Technologies UI/Frontend](#technologies_ui)
- [ Setup ](#setup)
- [ Deployment | CI/CD ](#deployment)

## General Info :clipboard:

This is the jobsheets dashboard application mainly powered by Node.js(backend) and ReactJS(Backend). The Backend Server' core features are to handle user' role based authenication and RESTful API calls. State management in UI is used react context.

The app allow users to manage jobsheets for Field Service Engineers and Application Specialist for Medical Company and to provide consolidated view of jobsheets to their respective supervisor.

## Demo

The client app is being hosted on AWS at "link"

## Technologies Backend

- NodeJS
- ExpressJS
- JWT
- MongoDB
- AmazonAWS

## Technologies UI/Frontend

- ReactJS
- ReactContext
- StyledComponent
- Jest
- AmazonAWS

## Setup

- Prerequisites
  - MongoDB Atlas Account
  - JWT secret setup
    Must have a mongo db account and create a Dabase/Collection for the server. Get the connection string and store it .env file. Add JWT secret in the .env file as well.

To run this project locally on your machine.

- Fork the repo

```
$ npm run setup-production

```

That's it. The application is built and deployed locally. It is available at localhost:5000
