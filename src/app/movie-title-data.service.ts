import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MovieTitle} from './movie-title';
import {Observable} from 'rxjs';
import {Page} from './page';
import {Pageable} from './pageable';
import {MovieTitleFilterCriteria} from './movie-title-filter-criteria';

const API_URL = environment.apiUrl;

@Injectable()
export class MovieTitleDataService {

  constructor(private http: HttpClient) {
  }

  public getMovieTitles(filterCriteria?: MovieTitleFilterCriteria, pageable?: Pageable): Observable<Page<MovieTitle>> {
    let httpParams = new HttpParams();
    if (pageable !== undefined) {
      if (pageable.pageNumber && pageable.pageSize) {
        httpParams = httpParams
          .set('page', String(pageable.pageNumber))
          .set('size', String(pageable.pageSize));
      }
      if (pageable.sort && pageable.sort.orders) {
        for (const order of pageable.sort.orders) {
          httpParams = httpParams.append('sort', order.property + ',' + order.direction);
        }
      }
    }
    if (filterCriteria !== undefined) {
      if (filterCriteria.movieTitleTypes) {
        httpParams = httpParams.set('movieTitleTypes', filterCriteria.movieTitleTypes.join(','));
      }
    }
    return this.http.get<Page<MovieTitle>>(`${API_URL}/movieTitles/search`, {params: httpParams});
  }

  public getMovieTitleTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/movieTitleTypes`);
  }
}
