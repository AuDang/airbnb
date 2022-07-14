<h1 align="center"> Luxbnb</h1>


Luxbnb is a full-stack web application clone of <a href="https://airbnb.com/">Luxbnb</a>. Luxbnb allows users create and join channels, interact with other users via a live chat, and send direct messages to other users or groups of users.

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
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)


## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

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

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Features
[Back to top](#table-of-contents)

<a href="https://github.com/AuDang/lux-bnb/wiki">See wiki page for feature list</a>

### Splash Page
Landing page for when users first arrive at Chatter. Users can sign in, sign up, or explore the site through a demo user without signing up. Check out the live site <a href="https://lux-bnb.herokuapp.com/" target="_blank">here</a>! 
![Splash Page]

## Database Schema
[Back to top](#table-of-contents)

![Database Schema](https://user-images.githubusercontent.com/96894806/170581187-3d274be1-5f04-45fa-84fd-e0625a57f4df.png)

## Future Features
[Back to top](#table-of-contents)
