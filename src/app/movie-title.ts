export class MovieTitle {

  uuid: string;
  tconst: string;
  primaryTitle: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
