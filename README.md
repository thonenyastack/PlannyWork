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

The NodeJS app including UI is being hosted on AWS at [link](http://43.207.141.249:5000)

** Login Credentials **
username/password show as below.

```
- Demo User: demo_user_A@mail.com/abcd1234
- Demo Supervisor: demo_supervisor@mail.com/test1616

```

![Landing Page](https://raw.githubusercontent.com/thonenyastack/PlannyWorkFullStackApp/develop/UI_Demo_Images/landingpage.png)

<img src="https://cdn.rawgit.com/thonenyastack/PlannyWorkFullStackApp/develop/UI_Demo_Images/overview.png" alt="Overview Page" alt="Overview">

<img src="https://cdn.rawgit.com/thonenyastack/PlannyWorkFullStackApp/develop/UI_Demo_Images/alljobsheets.png" alt="All Jobs Page" title="AllJobSheet"
style="display: inline-block; margin:0 auto; padding=20px; max-width: 640px;">

<img src="https://cdn.rawgit.com/thonenyastack/PlannyWorkFullStackApp/develop/UI_Demo_Images/createjob.png" alt="All Jobs Page" title="Ceate Jobsheet"
style="display: inline-block; margin:0 auto; padding=20px; max-width: 640px;">

## Technologies Backend

- NodeJS
- ExpressJS
- JWT
- MongoDB
- AmazonAWS(EC2)

## Technologies UI/Frontend

- ReactJS
- ReactContext
- StyledComponent
- Jest
- AmazonAWS

## Setup

- Prerequisites
  - MongoDB Atlas Account -
    Must have a mongo db account and create a Dabase/Collection for the server. Get the connection string and store it .env file.
  - JWT secret setup -
    Add JWT secret in the .env file as well.

To run this project locally on your machine.

- Fork the repo

````

$ npm run setup-production

```

That's it. The application is built and deployed locally. It is available at localhost:5000
```
````
