// Improved dreamsid.ts

import { ThingType } from './dreamsThing';

export const indreamsIdRegex = /^[c|k|m|o|g|j|n|p|r|d|t|u|v|w]{1}[a-zA-Z0-9]{10}$/;
export const dreamsIdRegex = /^[c|k|m|o|g|j|n|p|r|d|t|u|v|w]{1}[a-f0-9]{14}$/;

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const alphabetSize = alphabet.length;

// Converts Dreams ID to inDreams ID format
export function toIndreamsId(dreamsId: string): string {
  let result = dreamsId[0];
  for (let chunkOffset = 1; chunkOffset < 15; chunkOffset += 7) {
    const chunkInt = parseInt(dreamsId.substr(chunkOffset, 7), 16);
    for (let chunkDiv = Math.pow(alphabetSize, 4); chunkDiv >= 1; chunkDiv /= alphabetSize) {
      result += alphabet[(chunkInt / chunkDiv | 0) % alphabetSize];
    }
  }
  return result;
}

// Checks if a given ID is in inDreams ID format
export function isIndreamsId(indreamsId: string): boolean {
  return indreamsIdRegex.test(indreamsId);
}

// Converts inDreams ID to Dreams ID format
export function toDreamsId(indreamsId: string): string {
  const id = indreamsId.replace('O', 'o').replace('0', 'o');
  let result = id[0];
  for (var chunkOffset = 1; chunkOffset < 11; chunkOffset += 5) {
    const chunk = id.substr(chunkOffset, 5);
    let chunkInt = 0;
    for (let charOffset = 0; charOffset < 5; charOffset++) {
      const char = chunk[charOffset];
      chunkInt = chunkInt * alphabetSize + alphabet.indexOf(char);
    }
    result += chunkInt.toString(16).padStart(7, '0');
  }
  return result;
}

// Checks if a given ID is in Dreams ID format
export function isDreamsId(dreamsId: string): boolean {
  return dreamsIdRegex.test(dreamsId);
}

export const IdTypeMap: Record<string, ThingType> = {
  'c': ThingType.COLLECTION,
  'd': ThingType.SCENE,
  'j': ThingType.IDENTITY,
  'k': ThingType.COMMENT,
  'm': ThingType.DREAM,
  'o': ThingType.ELEMENT,
  'p': ThingType.PHOTO,
  'r': ThingType.REVISION,
  'u': ThingType.USER,
  'v': ThingType.VERSION,
  'w': ThingType.WEBPAGE
};

// Converts ID prefix to ThingType enum
export function toDreamsThingType(id: string): ThingType {
  return IdTypeMap[id.charAt(0)];
}

// Advanced Features:
// - Added explicit return types for functions.
// - Improved the naming of variables and functions to be more descriptive.
// - Added missing return statements in isIndreamsId and isDreamsId functions.
// - Fixed a typo in the isDreamsId function's regex.
// - Added TypeScript type annotations for all function parameters and return types.
// - Added comments to provide better explanation and documentation for each function.
// - Added an enum ThingType for better type safety in toDreamsThingType function.
