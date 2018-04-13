
## MRM
The Andela Meeting Room management solution

### Product Road Map
check the product scope and roadmap [Link]#()

### Getting started

#### Prerquisites
Ensure you have [NodeJS](https://nodejs.org/en/) environment and [YARN](https://github.com/airbnb/javascript) package manager globally installed on your system.

#### Installing

#### Running the application
Run the dev server by running the command below
``` 
yarn start 
```
The application runs on mrm-dev.andela.com in development mode. This can be enabled by adding mrm-dev.andela.com to the etc/hosts file as decribed below.
- On Mac OS using the vim editor.
```
sudo vim /etc/hosts
```

Then add this line to your file
``` 
127.0.0.1		mrm-dev.andela.com 
```

If it doesn’t work out of the box, You might need to flush your dns cache to reflect the changes in your etc/hosts file by running.
``` 
sudo killall -HUP mDNSResponder 
```

You can as well do it manually by running the dev server in the new terminal window.


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
