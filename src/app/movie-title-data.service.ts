import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {MovieTitle} from './movie-title';
import {Observable} from 'rxjs';
import {Page} from './page';
import {Pageable} from './pageable';

const API_URL = environment.apiUrl;

@Injectable()
export class MovieTitleDataService {

  constructor(private http: HttpClient) {}

  public getMovieTitles(pageable?: Pageable): Observable<Page<MovieTitle>> {
    const options = pageable !== undefined ? {
      params: {
        page: String(pageable.pageNumber),
        size: String(pageable.pageSize)
      }
    } : undefined;
    return this.http.get<Page<MovieTitle>>(`${API_URL}/movies`, options);
  }
}
