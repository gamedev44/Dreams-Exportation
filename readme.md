## Dreams API

API for [Dreams](https://www.playstation.com/en-gb/games/dreams-ps4/), a rad user-generated-content game on the PS4

Currently it's just a basic [indreams.me](https://indreams.me/) API proxy that handles auth headers for you

## Setup

Requires a NodeJS install (tested on v12.17.0) with NPM

Clone the repo from Github:

```bash
git clone https://github.com/jaames/dreams-api
```

Then inside the repo directory, install dependencies:

```bash
npm install
```

Then start the server:

```bash
npm run start
```

By default the server will run on port 3000, but you can easily change the `port` variable in `server.js` if you want!

## API

At the moment, the server will forward any requests you make through to `https://indreams.me` - but with the HMAC auth headers figured out for you since they're a bit of a bother. I'm still working on mapping out the whole official API available there, but here's some fun ones to get your feet wet:

### User profile

GET `/api/user/profile`

| Query param | Value |
|:-|:-|
| `userId` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User creations

GET `/api/user/creations`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User photos

GET `/api/user/photos`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User streamed

GET `/api/user/streamed`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User followers

GET `/api/user/followers`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User following users

GET `/api/user/following/users`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### User following creations

GET `/api/user/following/creations`

| Query param | Value |
|:-|:-|
| `id` | User ID, e.g. `uCApMyVUyho` = "MMOfficial" |

### Creation details

GET `/api/creation/profile`

| Query param | Value |
|:-|:-|
| `creationId` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation credits

GET `/api/creation/credits`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation photos

GET `/api/creation/photos`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation genealogy

GET `/api/creation/genealogy`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation streams

GET `/api/creation/streamed-by`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation used in

GET `/api/creation/usedin`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation contents

GET `/api/creation/contents`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation remixes

GET `/api/creation/remixes`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

### Creation followers

GET `/api/creation/followers`

| Query param | Value |
|:-|:-|
| `id` | Creation ID, e.g. `ogbtEqxCwzv` = "Vertical Moving Platform" |

## Notes

### IDs

There are two possible formats for IDs. The api uses Indreams IDs, but I think the longer Dreams ID format is perhaps used internally. It's possible to convert an ID back and forth between both formats (todo: document this)

#### Indreams ID

These are shorter IDs used on https://indreams.me, matching the regex `/[c|k|m|o|g|j|n|p|r|d|t|u|v|w]{1}[a-zA-Z0-9]{10}/`

#### Dreams ID

Longer hexidecimal format matching the regex `/[c|k|m|o|g|j|n|p|r|d|t|u|v|w]{1}[a-f0-9]{14}/`

#### ID Type

In both formats, the first character of the ID denotes the type of thing it refers to:

| Char | thingType |
|:-|:-|
| `c` | COLLECTION |
| `k` | COMMENT |
| `m` | DREAM |
| `o` | ELEMENT |
| `g` | GREIF |
| `j` | IDENTITY |
| `n` | NEWS |
| `p` | PHOTO |
| 'r` | REVISION |
| `d` | SCENE |
| `t` | TAG |
| `u` | USER |
| `v` | VERSION |
| `w` | WEBPAGE |

### Image Urls

All image URLs follow the pattern `https://cdn.indreams.me/< hash >< suffix >`

The image hash is always a 32-char string matching the regex `/[a-f0-9]{32}/`. I have no idea how it's generated.

The suffix is optional, and is used to specify the image type:

| Suffix | imageType | Width | Height |
|:-|:-|:-|:-|
| none | - | 1920 | 1080 |
| `_1` | LARGE_RECTANGLE | 480 | 270 |
| `_2` | FEATHERED_HEXAGON | 256 | 256 |
| `_3` | FEATHERED_RECTANGLE | 448 | 256 |
| `_4` | FEATHERED_CIRCLE | 256 | 256 |
| `_5` | MEDIUM_RECTANGLE | 240 | 135 |
| `_6` | SMALL_RECTANGLE | 120 | 67 |
| `_7` | BLURRED | 240 | 134 |
| `_8` | SQUARE | 1024 | 1024 |
| `_9` | MEDIUM_SQUARE | 512 | 512 |
| `_10` | SMALL_SQUARE | 256 | 256 |
| `_11` | LANDSCAPE | 1200 | 630 |
| `_12` | SOCIAL | 512 | 512 |
| `_13` | SOCIAL_HEXAGON | 512 | 512 |
| `_14` | SOCIAL_RECTANGLE | 512 | 512 |
| `_15` | SOCIAL_CIRCLEE | 512 | 512 |