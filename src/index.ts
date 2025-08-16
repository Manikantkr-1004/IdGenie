import * as crypto from "crypto";

/**
 * Options for generating unique IDs with idgenie.
 */
export interface GenerateUniqueIdOptions {
  length?: number;                        // fixed length of the unique id, default 8
  randomLength?: boolean;                 // random length(8-36) of id, default false
  prefix?: string;                        // optional prefix string
  suffix?: string;                        // optional suffix string
  includeDate?: boolean;                  // include date, default false
  includeTime?: boolean;                  // include time, default false
  dateLocale?: string;                    // locale string for date formatting
  timeLocale?: string;                    // locale string for time formatting
  dateFormatOptions?: Intl.DateTimeFormatOptions; // date format options
  timeFormatOptions?: Intl.DateTimeFormatOptions; // time format options
  alphabet?: string;                      // custom alphabet for random part. Default A-Z, a-z, 0-9
  casing?: "lower" | "upper" | "mixed";   // letter casing, Default Mixed
  separator?: string;                     // separator for date/time parts, default ""
  secure?: boolean;                       // use crypto.randomBytes for randomness
  mode?: "random" | "uuid";               // special modes, default random (uuid uses crypto)
  counter?: boolean;                      // sequential counter suffix for uniqueness
  timestamp?: boolean;                    // add unix timestamp(ms) part instead of locale formatting
}

// Default alphabet: alphanumeric
const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Internal counter for counter-based uniqueness
let internalCounter = 0;

/**
 * Generates a flexible unique ID based on options.
 * @param options - Configuration options for ID generation.
 * @returns A generated unique string ID.
 * @throws {TypeError} If length is invalid.
 */
export function uniqueId(options: GenerateUniqueIdOptions = {}): string {
  const {
    length = 8,
    randomLength = false,
    prefix = '',
    suffix = '',
    includeDate = false,
    includeTime = false,
    dateLocale = 'en-IN',
    timeLocale = 'en-IN',
    dateFormatOptions,
    timeFormatOptions,
    alphabet = DEFAULT_ALPHABET,
    casing = "mixed",
    separator = "",
    secure = false,
    mode = "random",
    counter = false,
    timestamp = false,
  } = options;

  // Handle UUID separately
  if (mode === "uuid") {
    return generateUUID();
  }

  // Validate length strictly
  if (typeof length !== 'number' || length <= 0 || !Number.isFinite(length)) {
    throw new TypeError(`"length" must be a positive number. Received: ${length}`);
  }

  // Random length support
  const actualLength = !randomLength
    ? length
    : Math.floor(Math.random() * (36 - 8 + 1)) + 8; // between 8-36 chars

  // Generate randomness (secure vs Math.random)
  const randomPart = secure
    ? generateSecureRandom(alphabet, actualLength)
    : generateMathRandom(alphabet, actualLength);

  // Apply casing
  let finalRandomPart = randomPart;
  if (casing === "lower") finalRandomPart = randomPart.toLowerCase();
  else if (casing === "upper") finalRandomPart = randomPart.toUpperCase();

  // Generate date/time/timestamp strings
  let dateTimeStr = "";

  if (timestamp) {
    dateTimeStr = Date.now().toString();

  } else {
    const now = new Date();

    if (includeDate) {
      let dateStr = "";
      dateStr = now.toLocaleDateString(
        dateLocale,
        dateFormatOptions || { year: "numeric", month: "2-digit", day: "2-digit" }
      ).replace(/[^a-zA-Z0-9]/g, separator);
      dateTimeStr += dateStr;
    }

    if (includeTime) {
      let timeStr = "";
      timeStr = now.toLocaleTimeString(
        timeLocale,
        timeFormatOptions || { hour: "2-digit", minute: "2-digit", second: "2-digit" }
      ).replace(/[^a-zA-Z0-9]/g, separator);
      dateTimeStr += separator + timeStr;
    }
    
  }

  // Counter support
  let counterStr = "";
  if (counter) {
    counterStr = (internalCounter++).toString();
  }

  // Final ID assembly
  return `${prefix}${finalRandomPart}${dateTimeStr? dateTimeStr + separator: ''}${counterStr}${suffix}`;
}


/**
 * Generates random string using crypto.randomBytes.
 */
function generateSecureRandom(alphabet: string, length: number): string {
  const bytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet[bytes[i] % alphabet.length];
  }
  return result;
}


/**
 * Generates random string using Math.random().
 */
function generateMathRandom(alphabet: string, length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}

/**
 * Generates UUID v4.
 */
function generateUUID():string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback: use a polyfill or custom implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
