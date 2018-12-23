export interface MovieTitle {
  uuid: string;
  tconst: string;
  movieTitleType: string;
  primaryTitle: string;
  originalTitle: string;
  startYear: string;
  endYear: string;
  runtimeMinutes: number;
  genres: string[];
  adult: boolean;
}
