# Boogle Game

This is a Boogle game developed using React and Ruby on Rails. The implementation
has been made as simple as possible. 

A Heroku free dyano based deployment can be found at https://playboogle.herokuapp.com/ . You may need to wait or retry
after a while, if the deployment is in sleep state.


#### Run it locally:
* Go to the main folder of this project.
* Start your rails server: `rails s`
* Navigate to http://localhost:3000 in your browser.

### Environment
* Ruby version 2.7.0
* Rails version 6.0.3.1
* react version 16.13.1
* yarn version 1.22.4
* yard version 0.9.25
* webpacker version 4.2.2

### System dependencies
It should have Ruby on Rails version 6 working and required javascript packages and ruby gems should be installed using 
`yarn install` and `bundle install` .


### Docs generation
Docs generated from code comments using yard. The command executed in the project folder :

  `yard doc app/controllers/` 

### How to run the test suite
* Go the project folder.
* Run the rspec command to run rails test cases: `rspec -f d`
* Run the react tests: `yarn jest`



#### Author
Manish Shrestha (manishshrestha2006 at gmail dot com)


