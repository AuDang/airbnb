<h1 align="center"> Luxbnb</h1>


Luxbnb is a full-stack web application clone of <a href="https://airbnb.com/">Airbnb</a>. Luxbnb allows users create and join channels, interact with other users via a live chat, and send direct messages to other users or groups of users.

<a href="https://lux-bnb.herokuapp.com/" target="_blank"><strong>Explore the website »</strong></a><br/>


<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#future-features">Future Features</a></li>
  </ol>
 </details>

## Technologies Used

![Python](https://img.shields.io/badge/-Python-F9DC3E.svg?logo=Python&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)



## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/AuDang/lux-bnb.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```
3. Install dependencies for frontend react-app
  ```bash
  cd react-app
  npm install
  ```
4. Create a PostgreSQL use and database 
   ```bash
   CREATE USER luxbnb_dev WITH PASSWORD 'INPUT-PASSWORD-HERE' CREATEDB;
   ```
   
   ```bash
   CREATE DATABASE luxbnb_db WITH OWNER luxbnb_dev;
   ```
5. Create a **.env** file based on the example with proper settings for your
   development environment
   
   ```bash
    DATABASE_URL=postgresql://luxbnb_dev:Any_password_here@localhost/luxbnb_app
   ```

6. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

8. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Features
[Back to top](#table-of-contents)

<a href="https://github.com/AuDang/lux-bnb/wiki">See wiki page for feature list</a>


## Future Features
[Back to top](#table-of-contents)

### Favorites
* Users will be able to add their favorite spots to a their favorites page

### Dynamic Search
* Users will be able to search for a spot by their name or location
