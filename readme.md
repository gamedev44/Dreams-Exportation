##Dreams Api Continuation Project

#This is a fan-made Continuation project of the original Dreams api project by james Without him none of us including me would be here doing this.


## Changes made by Mr.Asterisk
summary of the changes made to the files below.

1. **server.js**
   - Imported the necessary modules: `express`, `body-parser`, and `mongoose`.
   - Created an instance of the `express` application.
   - Added middleware to parse incoming requests.
   - Connected to the MongoDB database using Mongoose.
   - Set up the server to listen on a specific port.

2. **models/dream.js**
   - Defined a Mongoose schema for the "Dream" model, including the required fields and their types.

3. **routes/api.js**
   - Defined the routes for handling API requests related to dreams.
   - Implemented the GET and POST endpoints for retrieving and adding dreams.

4. **package.json**
   - Specified the project's metadata, including its name and version.
   - Listed the required dependencies (`express`, `body-parser`, and `mongoose`) along with their versions.
  
5. **blobexporter.ts**
 
    - updated the blob data exportation feature from my last commit now enabling users to export and download
 blob data via the indreams.me api url and now it automatically decompresses the data as well as
auto-checks for multiple lz4 data streams and if so treats them as a single unit/asset for decompression and exportation.

6. **lz4Config.Json**

   - added the configuration .json file for handling the configuration and setup of how lz4 data streams are handled
  when not using the default script from blobexporter.ts .

7. **audio-porter.ts**

 - added the ability to import and export audio via exploitation of the audio importer.

8. **audioconvertConfig.Json**

 - adds the configuration seetings needed for the audio-porter.ts script to work properly

9. **audioporter.html**

   -added the interface for interacting with , sending & recieving | importing and exporting audio from dreams. 
 

These changes collectively establish a basic Express.js server that handles API requests for dreams. The server initializes the required modules, sets up the database connection, and defines the routes for interacting with dreams through GET and POST requests.

## Motivation

The Dreams community is incredible, although the lack of export/backup options concerns me a little bit considering the sheer number of hours that people have put into making content. Its a damn shame that Sony decided to pull the plug on dreams server support - so my ultimate goal is finding a way to export and download level data before the game goes offline entirely as it's only a Matter of time now.

## More information

https://github.com/jaames/dreams-api/wiki/


more doc's coming soon.

## Proxy Setup

Requires a NodeJS install (tested on v12.17.0) with NPM

Clone the repo from Github:

```bash
git clone https://github.com/gamedev44/Dreams-Exportation
```

Then inside the repo directory, install dependencies:

```bash
npm install
```

Copy `apiconfig.example.json` to `apiconfig.json`

```bash
cp apiconfig.example.json apiconfig.json
```

Then start the server:

```bash
npm run start
```
