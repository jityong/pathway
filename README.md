## Details

Hosted on Hostinger VPS server.   
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

