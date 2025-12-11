import { ChordsType, ToneType } from "@/types/chodsTypes";

const chords: ToneType[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getPureChord(rawCompleteChord: any): ToneType | null {
   if (typeof (rawCompleteChord) !== 'string') return null;

   const chordArr = /^[A-G](#)?/.exec(rawCompleteChord) || [];
   const chord = chordArr[0] as ToneType || null;
   return chord;
}

export function getNewChord(newTone: ToneType, oldChord: ToneType, currentTone: ChordsType): ToneType | null {
   const pureChord = getPureChord(currentTone);
   if(!pureChord) return null;
   const semitonesBetweenOldToneAndNewTone = (chords.indexOf(newTone) - chords.indexOf(pureChord));
   const chordIndex = ((chords.indexOf(oldChord) + semitonesBetweenOldToneAndNewTone % 12) + 12) % 12;
   const newChord = chords[chordIndex] as ToneType;
   return newChord;
}