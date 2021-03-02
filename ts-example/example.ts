let a: number;
let b: string;
let c: boolean;
let d: null;
let e: undefined;
let f: boolean[];
let g: any;
let h: never;
let i: unknown;
let j: void;
let k: (x: string) => string;

class Animal {

  get numberOfLegs(): number {
    return this._numberOfLegs;
  }
  set numberOfLegs(numberOfLegs: number) {
    this._numberOfLegs = numberOfLegs;
  }

  constructor(private _numberOfLegs: number) {}

  getNumberOfLegs(): number {
    return this._numberOfLegs;
  }

  setNumberOfLegs(numberOfLegs: number) {
    this._numberOfLegs = numberOfLegs;
  }

}

const animal = new Animal(4);

interface Animal2 {
  numberOfLegs: number;
}

const animal2: Animal2 = { numberOfLegs: 4 };

function add(x: number, y: number) {
  return x + y;
}
