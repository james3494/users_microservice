# users microservice
A microservice for users associated with the Take Out app.

## To Do
 - write documentation in order to clear up exactly what I'm after. This is long term and kind of covered by writing tests

 - salt and hash validation in /entities/hashMachine.js

 - look into whether the correct headers are being used

 - think about whether controllers are returning the required things. This might be a case of doing it in conjunction with working on the app frontend
   - this may vary depending n wh's cslling it. for example getUser will depend on whether its an admin, that user, or a different user.DO we want different endpoints for this or the same ones with a flag?
   - also do we want different endpoints for changing restricted things? like groups or friends?

- add phone number and profile pic to user entity

 - check the jwt is updated whenever groups, admin or friends are modified

 - update testing to same structure as takeout microservice

 - extra endpoints:
    - 'getFullUser' endpoint which is accessible to admins
    - endpoints to do with friends functionality. Like add / remove friend, accept invitation etc. THIS IS NOT A PRIORITY



