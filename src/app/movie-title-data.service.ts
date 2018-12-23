import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {MovieTitle} from './movie-title';
import {Observable} from 'rxjs';
import {Page} from './page';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MovieTitleDataService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getMovieTitles(pageIndex: string = '0', pageSize: string = '20'): Observable<Page<MovieTitle>> {
    return this.http.get<Page<MovieTitle>>(`${API_URL}/movies`, {
      params: {
        page: pageIndex,
        size: pageSize
      }
    });
  }
}
