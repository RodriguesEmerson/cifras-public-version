
export type ToneType = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export type Finger = [finger: number, string: number, fret: number];

export type ChordDiagram = {
   name: string;
   capo: number;
   nut: [number, number, number];
   strings: number[];
   fingers: Finger[];
}