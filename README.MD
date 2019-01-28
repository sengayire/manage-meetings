[![Maintainability](https://api.codeclimate.com/v1/badges/730b5c8ecdf49b97d939/maintainability)](https://codeclimate.com/repos/5c374a9e21a6d10240009535/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/andela/mrm_front/badge.svg?t=h371yr)](https://coveralls.io/github/andela/mrm_front)
[![Test Coverage](https://api.codeclimate.com/v1/badges/730b5c8ecdf49b97d939/test_coverage)](https://codeclimate.com/repos/5c374a9e21a6d10240009535/test_coverage)


# MRM
The Andela Meeting Room management solution

### Product Road Map
check the product scope and roadmap [here](https://docs.google.com/spreadsheets/d/1Uc5q1sCm4n-71K5iyiu7t5_uRKgRCqNl1nh1BZp15s4/edit#gid=0)

## Getting started


### Automatic Installation (Using Docker)

#### Prerequisites
- Install [Docker](https://docs.docker.com/docker-for-mac/install/) and get it running on your machine


### Installing with docker
- Install docker
	```
    brew cask install docker
    ```
    OR
    
    [install via dmg file](https://docs.docker.com/docker-for-mac/install/)
    
- Create a new directory 
	```
    mkdir <directory name>
    ```
- In that directory clone both the frontend and backend applications
	- Change working directory to the newly created one `cd <directory name>`
    - Clone the frontend application `https://github.com/andela/mrm_front.git`
	- Clone the backend application `git clone https://github.com/andela/mrm_api.git`

#### running the application
- Create environment variables for the backend application and save them in `mrm_api/.env` file
    ```
    APP_SETTINGS="testing" # set app Enviroment.
    SECRET_KEY="some-very-long-string-of-random-characters"
    DEV_DATABASE_URL="" # Db for Development.
    TEST_DATABASE_URL="" # Db for Testing
    DATABASE_URL="" # Db for Production
    MAIL_SERVER=""# SMTP server
    MAIL_PORT="" # server port
    MAIL_USE_TLS="" # Using TLS?
    MAIL_USERNAME="" # converge username
    MAIL_PASSWORD="" # password
    CELERY_BROKER_URL="" # redis url
    CELERY_RESULT_BACKEND="" # redis url
    C_FORCE_ROOT=true
    ```
    
- Create environment variables for frontend in `mrm_front/.env` application
	```
    # change this to production if in production
    NODE_ENV=development
    # the mrm domain name (this should change to the staging or production url)
    MRM_URL=http://mrm-dev.andela.com:8080
    # the url of the mrm staging api (It should change to production URL if in production)
    MRM_API_URL=http://mrm-dev.andela.com:8000/mrm
    # the andela url to handle login
    ANDELA_LOGIN_URL=############
    # the analytics page url for axios requests
    BASE_URL=http://mrm-dev.andela:8000/analytics
    # the andela api url
    ANDELA_API_URL=############
    FIREBASE_API_KEY=############
    FIREBASE_PROJECT_ID=############
    FIREBASE_DATABASE_NAME=############
	```

- Starting the containers.
    ```
    make build
    ```
    This will create 5 services
    	
     - database
     - backend
     - frontend
     - redis
     - test

    Start the backend gunicorn server
    ```
    make run-app
    ```
    
- Running frontend tests
	```
    make frontend-tests
    ```
- Running migrations

    - Initial migration commands
        ```
        make migrate-initial message="Migration message"
        ```
    - If you have one migration file in the alembic/version folder. Run the commands below:
        ```
        make migrate
        ```
    - If you have more than 2 migration files in the alembic/versions folder. Rum the commands bellow
        ```
        make migrate message="Migration message"
        ```
- Show services
	```
    make services
    ```
- Check the status
	```
    make status
    ```
- Start services individually
	```
    make start service=<service name>
    ```
- Create services individually
	```
    make create service=<service name>
    ```
- Stop all services
	```
    make down
    ```
- Stop services individually
	```
    make stop service=<service name>
    ```
- Remove services individually
	```
    make remove service=<service name>
    ```
- Restarting a service
	```
    make restart service=<service name>
    ```
- Kill services
	```
    make kill
    ```
- Remove a container
	```
    make remove
    ```
- SSH into a container
	```
    make ssh service=<service name>
    ```

##### Importing a database dump to the docker database container
  - Create a dump from a database, preferrably `--no-owner` flag
	```
	pg_dump -d <dbname> -U <postgres-user> -h <localhost/ipaddress> --no-owner -F p --column-inserts > converge.sql
	```
  - Import the database
  	```
    make import dump="<path to dump file>"
  	```

Further instructions on the backend, kindly visite the mrm_api repo [here](https://github.com/andela/mrm_api)

### Installing without docker
    $ git clone https://github.com/andela/mrm_front.git
    $ cd mrm_front


#### Prerequisites
Ensure you have [NodeJS](https://nodejs.org/en/) environment and [YARN](https://yarnpkg.com/en/) package manager globally installed on your system.

#### Installing
    $ git clone https://github.com/andela/mrm_front.git
    $ cd mrm_front
    $ yarn install

### Running the application
##### 1. Setting environment variables
Create a .env file in the root folder of the application where you are to add your environment variables.
The contents of the .env file are pinned on the `mrm-coverge` channel. Reach out to [@shemogumbe](https://github.com/shemogumbe) if you cant find them.
> Remember some parts of the application won't run if you don't have them

##### 2. Updating the ```etc/hosts``` file
The application runs on mrm-dev.andela.com in development mode. This can be enabled by adding mrm-dev.andela.com to the etc/hosts file as described below.
- On Mac OS using the vim editor.
```
$ sudo vim /etc/hosts
```

Then add this line to your file
```
127.0.0.1		mrm-dev.andela.com
```

You might need to flush your dns cache to reflect the changes in your etc/hosts file by running.
```
sudo killall -HUP mDNSResponder
```
Though you can as well do it manually by running the development server in the new terminal window.

##### 3. Run the development server by running the command below
```
yarn start
```


#### Running tests
`yarn test --coverage`


### Built With
* [ReactJS](https://reactjs.org/) - The javascript client library.
* [NodeJs](https://nodejs.org/en/) - The run time environment.
* [SCSS](http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html) -the CSS pre-processor


### Contributing
Contribtions must follow among other guidelines:

* 1. [Airbnb style guide for react](https://github.com/airbnb/javascript/tree/master/react)
* 2. [Andela Engineering playbook](https://github.com/andela/engineering-playbook)
* 3. [Airbnb style guide for ES6/ES7](https://github.com/airbnb/javascript)
