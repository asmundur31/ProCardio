# ProCardio - Running throug Central Park

This repository has all the code and data concerning the Treadmill project for HL2032/HE1040/HL2041 HT22 Medical Engineering, Project Course, Autumn 2022.

# The Project
This is a software that allows you to run on a treadmill and experience a real time elevation and video speed changes.
The system records your runs and you can view your statistics on the run and other data.

Here is the software in use.

![The software in use!](./TreadmillInUse.png "Treadmill in use")

The main parts of our system are the Monark treadmill, TV screen, raspberry pi computer and a laptop, but you can read more about it in our [Final Paper](https://github.com/asmundur31/ProCardio/blob/main/FinalPaperTreadmill.pdf)

Also our [Final Presentation](https://github.com/asmundur31/ProCardio/blob/main/ProCardioFinalPresentation.pdf)

# Get started
To use the software, it can be done in two ways.
1. run it by visiting [ProCardio](https://treadmill.dev.kthcloud.com/home) the website
2. run it on localhost

## 1. Run it through link
We have deployed our code to the KTH Cloud in collabiration with other students Bachelors project. You can visit [the website](https://treadmill.dev.kthcloud.com/home) where you can run the existing routes and tests. There you can also take a look at previous recordings.

## 2. Run it on localhost
To be able to run it locally a few things need to be configured.

You need to make sure you have (the links provided are good sources to help you get started)
1. Git installed. ([Git](https://github.com/git-guides/install-git))
2. Node package manager (NPM) installed. ([Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
3. Postgres database server setup on your computer. ([PostgreSQL](https://www.postgresql.org/docs/current/tutorial-install.html))
4. Create a database on that server (can be what ever you whant). ([Create a database](https://www.postgresql.org/docs/current/sql-createdatabase.html))
5. .env file for environmental variables

        PORT=3000
        CLOUDINARY_URL=... Here we used a cloudinary service
        DATABASE_URL=postgresql://<Username>:<Password>@localhost:5432/<DatabaseName>
6. Optional cloudinary service [Cloudinary](https://cloudinary.com/).

We used the cloudinary service to host our images and videos. You can also skip it but then you need to make sure you reference the images and videos correctly in the code.

The cloudinary service is free (at least in december 2022).

**When you have all these things you can continue here.**

1. Clone/Download this repository on to your computer, wherever you whant.
        
        cd .../your-path/
        git clone https://github.com/asmundur31/ProCardio
2. Now go into the project by performing

        cd ProCardio
3. Install all dependencies by performing

        npm install
4. Setup the database (create tables and setting some data)

        npm run setup
5. Run the program in development mode

        npm run dev
6. or in production mode

        npm run prod


# Add a new route/test

How we added the routes/test was that we found a running video on [Youtube](https://www.youtube.com/) and collected a elevation data from Google Earth from the same routes as in the video.

The elevation data files look like:

        {
          "name": "Park Run",
          "type": "route",
          "route": "/static/routes/ParkRun.geojson", <-- Link to self
          "video": "https://res.cloudinary.com/dwqpirk6g/video/upload/v1666974731/Treadmill/ParkRunSmall_wdbj1f.mp4",
          "thumbnail": "https://res.cloudinary.com/dwqpirk6g/image/upload/v1666974741/Treadmill/ParkRun_qnmwvr.png",
          "description": "Very nice and cosy run in Central Park.",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "track_fid": 0,
                "track_seg_id": 0,
                "track_seg_point_id": 0,
                "ele": 32.503
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  -73.957159792,
                  40.797959496
                ]
              }
            },
            more features...
          ]
        }
Where we have a link to the video, link to the thumbnail and a link to the route/test (link to itself).
This applies both for the routes and tests.

You need to add this file to either
                
        ./static/routes
        or
        ./static/tests

For video we used the cloudinary service, but it could be anywhere.

<p align="center">
  <img src="https://github.com/asmundur31/ProCardio/actions/workflows/build-and-push.yml/badge.svg" alt="build">
</p>
