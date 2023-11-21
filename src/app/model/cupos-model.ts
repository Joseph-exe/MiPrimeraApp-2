export class CuposModel {
  public edit_mode: boolean = false;

  constructor(
      public id: string,
      public sector: string,
      public cupos: number,
      public horas: string,
  ) {}
}
