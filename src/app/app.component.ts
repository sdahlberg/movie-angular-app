import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieTitleDataService} from './movie-title-data.service';
import {MovieTitle} from './movie-title';
import {Page} from './page';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Pageable} from './pageable';
import {MatSort, MatSortable, Sort} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MovieTitleFilterCriteria} from './movie-title-filter-criteria';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieTitleDataService]
})
export class AppComponent implements OnInit {
  private initialized = false;
  pageOfMovieTitles: Page<MovieTitle> = <Page<MovieTitle>>{};
  displayedColumns: string[] = ['tconst', 'movieTitleType', 'primaryTitle', 'isAdult', 'startYear', 'endYear', 'runtimeMinutes', 'genres'];
  movieTitleTypes: string[];
  movieTitleGenres: string[];
  movieTitleForm: FormGroup;
  selectedMovieTitleTypes: string[];
  selectedMovieTitleGenres: string[];
  isLoading = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private movieTitleDataService: MovieTitleDataService, private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.movieTitleForm = this.formBuilder.group({
      movieTitleTypeControl: new FormControl(),
      movieTitleGenreControl: new FormControl()
    });
  }

  ngOnInit() {
    this.movieTitleDataService.getMovieTitleTypes().subscribe(movieTitleTypes => this.movieTitleTypes = movieTitleTypes);
    this.movieTitleDataService.getMovieTitleGenres().subscribe(movieTitleGenres => this.movieTitleGenres = movieTitleGenres);
    this.router.events
      .pipe(filter(value => value instanceof NavigationStart))
      .subscribe(event => {
        this.isLoading = true;
      });
    this.route.queryParamMap
      .subscribe(params => {
        // guard https://stackoverflow.com/questions/39861547/angular2-query-params-subscription-fires-twice
        if (!this.initialized && params.keys.length === 0 && window.location.href.split('?')[1]) {
          return;
        }
        this.initialized = true;

        const pageable: Pageable = {
          ...this.pageOfMovieTitles.pageable,
          sort: {orders: []}
        };
        pageable.pageSize = +params.get('pageSize') || pageable.pageSize;
        pageable.pageNumber = +params.get('pageIndex') || pageable.pageNumber;

        const properties = params.getAll('active');
        const directions = params.getAll('direction');

        properties.forEach((property, index) => {
          pageable.sort.orders.push({
            property: property,
            direction: directions[index]
          });
        });

        const filterCriteria: MovieTitleFilterCriteria = <MovieTitleFilterCriteria>{};
        filterCriteria.movieTitleTypes = params.get('movieTitleTypes') ? params.get('movieTitleTypes').split(',') : null;
        filterCriteria.movieTitleGenres = params.get('movieTitleGenres') ? params.get('movieTitleGenres').split(',') : null;

        this.movieTitleDataService.getMovieTitles(filterCriteria, pageable)
          .subscribe(movieTitles => {
            this.pageOfMovieTitles = movieTitles;
            this.isLoading = false;
          }, error => this.isLoading = false);
        this.setUiValues(filterCriteria, pageable);
      });
  }

  private setUiValues(filterCriteria: MovieTitleFilterCriteria, pageable: Pageable) {
    this.movieTitleForm.get('movieTitleTypeControl').setValue(filterCriteria.movieTitleTypes);
    this.movieTitleForm.get('movieTitleGenreControl').setValue(filterCriteria.movieTitleGenres);
    // if (pageable.sort.orders.length > 0) {
    //   this.sort.sort(<MatSortable> {
    //     id: pageable.sort.orders[0].property,
    //     start: pageable.sort.orders[0].direction
    //   });
    // }
  }

  paginate($event) {
    const {pageIndex, pageSize} = $event;
    this.router.navigate([], {queryParams: {pageIndex, pageSize}, queryParamsHandling: 'merge'});
  }

  doSort(sort: Sort) {
    const properties: string[] = Object.assign([], this.route.snapshot.queryParamMap.getAll('active'));
    const directions: string[] = Object.assign([], this.route.snapshot.queryParamMap.getAll('direction'));
    const activeIndex = properties.findIndex(value => value === sort.active);
    if (activeIndex !== -1) {
      if (sort.direction !== '') {
        directions[activeIndex] = sort.direction;
      } else {
        properties.splice(activeIndex, 1);
        directions.splice(activeIndex, 1);
      }
    } else {
      properties.push(sort.active);
      directions.push(sort.direction);
    }

    this.router.navigate([], {
      queryParams: {
        active: properties.length > 0 ? properties : null,
        direction: directions.length > 0 ? directions : null
      }, queryParamsHandling: 'merge'
    });
  }

  openedChange(opened) {
    if (opened) {
      return;
    }
    this.router.navigate([], {
      queryParams: {
        movieTitleTypes: (this.selectedMovieTitleTypes || []).length > 0 ? this.selectedMovieTitleTypes.join(',') : null,
        movieTitleGenres: (this.selectedMovieTitleGenres || []).length > 0 ? this.selectedMovieTitleGenres.join(',') : null
      }, queryParamsHandling: 'merge'
    });
  }
}
