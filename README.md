# idgenie

A magical and flexible ID generator with support for unique IDs, date/time, prefixes, suffixes, and more.

![npm](https://img.shields.io/npm/v/idgenie)
![Node](https://img.shields.io/node/v/idgenie)
![npm downloads](https://img.shields.io/npm/dm/idgenie)
![license](https://img.shields.io/npm/l/idgenie)

## Installation

```bash
npm install idgenie
```
```bash
yarn add idgenie
```
```bash
pnpm add idgenie
```
```bash
<script src="https://cdn.jsdelivr.net/npm/idgenie@1.0.0/dist/cjs/index.min.js"></script>
```

## Using IdGenie from a CDN

[IdGenie is on jsDelivr](https://www.jsdelivr.com/package/npm/idgenie) which is a "super-fast CDN for developers". Include it in your html:

```javascript
<script src="https://cdn.jsdelivr.net/npm/idgenie@1.0.0/dist/cjs/index.min.js"></script>
<script>
  const id = idgenie.uniqueId();
  console.log(id);
</script>

```


## Usage After Installation

### Importing

```javascript
// ES Module
import { uniqueId } from "idgenie";

// CommonJS
const { uniqueId } = require("idgenie");
```

### Basic Example

```javascript
// Generate Default unique id

const id = uniqueId();
console.log(id); // Outputs unique id string


// Generate Custom unique id using options parameters --->

const customId = uniqueId({length: 20, prefix:'mani', suffix:'kumar'});
// It will generate unique id of length 20 + prefix + suffix

const customId = uniqueId({mode:'uuid'});
// It will generate unique uuid

const customId = unqiueId({randomLength: true, alphabet:'manikant123', includeDate: true, casing:'upper', secure: true, separator:'#'});
// It will generate random length of custom unique id between 8-36 also it'll take my 'manikant123' alphabet to generate id and include date, separator('#') where need and
// generate id securely using crypto and give Unique id in Uppercase as passed casing 'upper'

console.log(customId); // Outputs custom id string
```


## API

### `uniqueId(options)`

Generates a unique ID with flexible options.

| Option            | Type    | Default      | Description                                |
| ----------------- | ------- | ------------ | ------------------------------------------ |
| length            | number  | 8            | Length of generated ID                     |
| randomLength      | boolean | false        | Randomize length between 8-36 if set true  |
| prefix            | string  | ''           | Adds a prefix to the generated ID          |
| suffix            | string  | ''           | Adds a suffix to the generated ID          |
| includeDate       | boolean | false        | Include localized date string              |
| includeTime       | boolean | false        | Include localized time string              |
| dateLocale        | string  | 'en-IN'      | Locale used for date formatting            |
| timeLocale        | string  | 'en-IN'      | Locale used for time formatting            |
| dateFormatOptions | object  | { year: "numeric", month: "2-digit", day: "2-digit" }    | Intl.DateTimeFormat options for date       |
| timeFormatOptions | object  | { hour: "2-digit", minute: "2-digit", second: "2-digit" }    | Intl.DateTimeFormat options for time       |
| alphabet          | string  | Alphanumeric [A-Za-z0-9] | Characters used for randomness             |
| casing            | string  | 'mixed'      | Casing style: 'lower', 'upper', or 'mixed' |
| separator         | string  | ''           | Separator string between different parts. For Example '@' or '#' etc.   |
| secure            | boolean | false        | Use cryptographically secure randomness    |
| mode              | string  | 'random'     | Mode of generation, 'random' or 'uuid'     |
| counter           | boolean | false        | Append a counter value                     |
| timestamp         | boolean | false        | Append timestamp string                    |

## License

MIT
