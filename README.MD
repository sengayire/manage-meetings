[![Maintainability](https://api.codeclimate.com/v1/badges/96eb001b4748df1f3688/maintainability)](https://codeclimate.com/repos/5b06cdaec544c6027e008559/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/andela/mrm_front/badge.svg?t=h371yr)](https://coveralls.io/github/andela/mrm_front) [![Test Coverage](https://api.codeclimate.com/v1/badges/96eb001b4748df1f3688/test_coverage)](https://codeclimate.com/repos/5b06cdaec544c6027e008559/test_coverage)

## MRM
The Andela Meeting Room management solution

### Product Road Map
check the product scope and roadmap [Link]#()

### Getting started

#### Prerquisites
Ensure you have [NodeJS](https://nodejs.org/en/) environment and [YARN](https://github.com/airbnb/javascript) package manager globally installed on your system.

#### Installing

#### Running the application
##### 1. Setting environment variables
Create a .env file in the root folder of the application where you are to add your environment variables.
Add ```NODE_ENV=development``` if you are running the application in development mode.

##### 2. Updating the ```etc/hosts``` file
The application runs on mrm-dev.andela.com in development mode. This can be enabled by adding mrm-dev.andela.com to the etc/hosts file as decribed below.
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

### Built With
* [ReactJS](https://reactjs.org/) - The javascript client library.
* [NodeJs](https://nodejs.org/en/) - The run time environment.
* [SCSS](http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html) -the CSS pre-processor


### Contributing
Contribtions must follow among other guidelines:

* 1. [Airbnb style guide for react](https://github.com/airbnb/javascript/tree/master/react)
* 2. [Andela Engineering playbook](https://github.com/andela/engineering-playbook)
* 3. [Airbnb style guide for ES6/ES7](https://github.com/airbnb/javascript)
