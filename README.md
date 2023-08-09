# users microservice
A microservice for users associated with the Take Out app.

## To Do
 - write documentation in order to clear up exactly what I'm after. This is long term and kind of covered by writing tests

 - salt and hash validation in /entities/hashMachine.js
 - way of sharing validation between front and back end
 - move out validation to a seperate module and have functions return something more useful

 - look into whether the correct headers are being used

 - tidy up filtering users

 - think about whether controllers are returning the required things. This might be a case of doing it in conjunction with working on the app frontend

 - check the jwt is updated whenever groups, admin or friends are modified

 - extra endpoints:
    - 'getFullUser' endpoint which is accessible to admins
    - endpoints to do with friends functionality. Like add / remove friend, accept invitation etc. THIS IS NOT A PRIORITY



