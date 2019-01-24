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

#### Installing
    $ git clone https://github.com/andela/mrm_front.git
    $ cd mrm_front
    $ docker-compose build


### Manual Installation

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



#### Run the containers by running the commands below(Using Docker)
- To start application
```
   $ docker-compose run -p 8080:8080/tcp app
```
- To run the test
```
   docker-compose run test
```

### Built With
* [ReactJS](https://reactjs.org/) - The javascript client library.
* [NodeJs](https://nodejs.org/en/) - The run time environment.
* [SCSS](http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html) -the CSS pre-processor


### Contributing
Contribtions must follow among other guidelines:

* 1. [Airbnb style guide for react](https://github.com/airbnb/javascript/tree/master/react)
* 2. [Andela Engineering playbook](https://github.com/andela/engineering-playbook)
* 3. [Airbnb style guide for ES6/ES7](https://github.com/airbnb/javascript)
