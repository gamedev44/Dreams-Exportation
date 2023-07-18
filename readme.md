#This is a fan-made Continuation project

## Dreams API

API proxy & reverse-engineering notes for Media Molecule's [Dreams](https://www.playstation.com/en-gb/games/dreams-ps4/); a rad user-generated-content game on the PS4.

## Motivation

The Dreams community is incredible, although the lack of export/backup options concerns me a little bit considering the sheer number of hours that people have put into making content. Its a damn shame that Sony decided to pull the plug on dreams server support - so my ultimate goal is finding a way to download level data before the gamegoes offline entirely as it's only a Matter of time now.

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
