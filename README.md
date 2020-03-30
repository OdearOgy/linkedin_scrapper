# Linkedin Profile Scrapper

First install node modules by running
`yarn`
in the command line

## Logged in scrapping

You can scrap any profile from linkedin using your login information.

To do that

-   Create .env file in project folder

-   Add following lines

        IN_LINKEDIN_EMAIL=<Your linkedin email>

        IN_LINKEDIN_PASSWORD=<Your linkedin password>

-   Run scrapper

        node ./src/scrapper.js <linkedin url> logged

-   This will create a json file in project folder with the person's `fist_last_name.json`

## Scrapping from html file

You can scrap any linkedin profile by just downloading it's html page then running the scrapper to create json file with the person's name and data.

To do that

-   Download the html file
-   Save it as index.html into project folder
-   Run the scrapper

        node ./src/anonym_scrapper.js <htmlFilePath> <portNumber>

-   This will create a json file in project folder with the person's `fist_last_name.json`
