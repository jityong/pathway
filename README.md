
![homepage](public/readMeFiles/homepage.png "homepage")

Please visit us at https://www.pathwaynuhs.com/ [Project has been discontinued]

## Introduction

Currently a BETA version, we are working closely alongside NUHS (National University Health System).

We aim to inform users about CHAS clinics near them & provide them with price comparisons between polyclinics and CHAS clinic prices. We are making use of accurate data provided by NUHS to calculate various prices based on the type of CHAS subsidy that is applicable to the user (namely Blue, Green & Orange) as well as their Nationality. 

In our BETA phase, we are targetting mainly diabetic patients because there is a large demographics of diabetic patients in Singapore who needs to have frequent follow-up treatments. As such, we aim to use the pilot version of the app to help these users make more informed decisions about their choices of follow-up treatment. 






## Details

Hosted on AWS EC2 Instance.   
`pm2 list` to view the backend services that is running.  
`/etc/nginx/default` is where the nginx configuration is.  
`/var/www/pathway` is the location of the source files.  

* Perform `npm run-script build` and push new build into github before pulling from the VPS.
> Unable to build inside VPS due to limited RAM in the VPS. 

To test locally, pull this repo and create .env file in /backend directory, then key in:
```
API_KEY=<enter API KEY>
```
and save. 
> This is done to hide the api key for geocoding. Api Key used for the map has been restricted to only the pathwaynuhs.com domain, while Api Key for geocoding has been restricted to our server's IP address use only.

Rename db_copy.js to be db.js and fill in the DB information.

For more info on backend svc, access our ubuntu server and there will be a readme.txt file inside /var/www/pathway/backend.

