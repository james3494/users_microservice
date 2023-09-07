# users microservice
A microservice for users associated with the Take Out app.

## To Do
 - salt and hash validation in /entities/hashMachine.js

 - think about whether controllers are returning the required things. This might be a case of doing it in conjunction with working on the app frontend
   - this may vary depending on who's calling it. for example getUser will depend on whether its an admin, that user, or a different user.DO we want different endpoints for this or the same ones with a flag?
   - also do we want different endpoints for changing restricted things? like groups or friends?

 - check the jwt is updated whenever groups, admin or friends are modified

 - extra endpoints:
    - endpoints to do with friends functionality. Like add / remove friend, accept invitation etc. THIS IS NOT A PRIORITY



