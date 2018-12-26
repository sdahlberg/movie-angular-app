import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MovieTitle} from './movie-title';
import {Observable} from 'rxjs';
import {Page} from './page';
import {Pageable} from './pageable';
import {Order} from './order';

const API_URL = environment.apiUrl;

@Injectable()
export class MovieTitleDataService {

  constructor(private http: HttpClient) {
  }

  public getMovieTitles(pageable?: Pageable): Observable<Page<MovieTitle>> {
    let httpParams = new HttpParams();
    if (pageable !== undefined) {
      if (pageable.pageNumber && pageable.pageSize) {
        httpParams = httpParams
          .set('page', String(pageable.pageNumber))
          .set('size', String(pageable.pageSize));
      }
      if (pageable.sort && pageable.sort.orders) {
        for (const order: Order of pageable.sort.orders) {
          httpParams = httpParams.append('sort', order.property + ',' + order.direction);
        }
      }
    }
    return this.http.get<Page<MovieTitle>>(`${API_URL}/movies`, {params: httpParams});
  }
}
