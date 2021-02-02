export class Horario {
  constructor(
    private _dia: string,
    private _hora: string,
    private _nombreMateria: string
  ) {}
  get dia(): string {
    return this._dia;
  }
  get hora(): string {
    return this._hora;
  }
  get nombreMateria(): string {
    return this._nombreMateria;
  }
}
