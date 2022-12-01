# Social_Connect_App
So this application is a social app that help us to get information from all around and from different people.
Here you can comment on people post and let them know what you think

Here are some GUIDELINES for the installation of thsi Application
You just need to perform a single operation yes you heard it right a single operation
You just need to pull this code from github into you local machine 
And then you just need to execute this comment in a docker client on top of docker daemaon
Remember to install Docekr before running this file


****IMP***
PLEASE ACCEPT ALL THE CURRENT CHANGES IN SOCIAL_CONNECT_APP_FRONTEND TO RESOLVE ALL THE COMMIT

COMMANDS:
docker-compose up -d --build

This Command will execute your docker-compose and the Dockerfiles which in turn build the applications for you.

After Running this command you can see four container running individually at different ports;
React-App : PORT 3000:3000
Django-App : PORT 8000:8000
Postgre-DB : PORT 5432:5432
Solr : PORT : 8983
