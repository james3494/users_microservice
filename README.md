# users microservice
A microservice for users associated with jamesmabon.co.uk

## To Do
 - rewrite errors to return informative and standardised messages
    - make errorHandling NOT use a standardised format tied to expressCallback. This could also involve making catchError work for erros not thrown by the throwError (myError) method

 - create a 'getFullUser' endpoint which is accessible to admins
 - write tests!
 - write documentation in order to clear up exactly what I'm after.

 - salt and hash validation in /entities/hashMachine.js
 - way of sharing validation between front and back end
 - move out validation to a seperate module and have functions return something more useful

 - change sessions to return just a status then another endpoint to get info (more of a todo for gateway)

 - add / remove friend functionality
 - delete user functionality? (would be useful for testing)
 - create a ping endpoint

 - look into whether the correct headers are being used

 - change admin from groups to an object called admin with Booleans. eg admin = { user: true }

 - tidy up filtering users


