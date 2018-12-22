import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {MovieTitle} from './movie-title';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MovieTitleDataService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getMovieTitles(): Observable<MovieTitle[]> {
    return this.http.get<MovieTitle[]>(API_URL + '/movies').pipe(
      map(value => value['content'].map(item => new MovieTitle(item)))
    );
  }
}
