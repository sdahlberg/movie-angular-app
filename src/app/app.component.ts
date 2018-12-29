import {Component, OnInit} from '@angular/core';
import {MovieTitleDataService} from './movie-title-data.service';
import {MovieTitle} from './movie-title';
import {Page} from './page';
import {ActivatedRoute, Router} from '@angular/router';
import {Pageable} from './pageable';
import {Sort} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MovieTitleFilterCriteria} from './movieTitleFilterCriteria';

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
  movieTitleForm: FormGroup;
  selectedMovieTitleTypes: string[];

  constructor(private movieTitleDataService: MovieTitleDataService, private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.movieTitleForm = this.formBuilder.group({
      movieTitleTypeControl: new FormControl()
    });
  }

  ngOnInit() {
    this.movieTitleDataService.getMovieTitleTypes().subscribe(movieTitleTypes => this.movieTitleTypes = movieTitleTypes);
    this.route.queryParams
      .subscribe(queryParams => {
        // guard https://stackoverflow.com/questions/39861547/angular2-query-params-subscription-fires-twice
        if (!this.initialized && Object.keys(queryParams).length === 0 && window.location.href.split('?')[1]) {
          return;
        }
        this.initialized = true;

        const pageable: Pageable = {...this.pageOfMovieTitles.pageable};
        pageable.pageSize = queryParams.pageSize || pageable.pageSize;
        pageable.pageNumber = queryParams.pageIndex || pageable.pageNumber;
        if (queryParams.active && queryParams.direction) {
          pageable.sort = {
            orders: [{
              direction: queryParams.direction,
              property: queryParams.active
            }]
          };
        }
        const filterCriteria: MovieTitleFilterCriteria = <MovieTitleFilterCriteria>{};
        if (queryParams.movieTitleTypes) {
          filterCriteria.movieTitleTypes = queryParams.movieTitleTypes.split(',');
        }
        this.movieTitleDataService.getMovieTitles(filterCriteria, pageable)
          .subscribe(movieTitles => this.pageOfMovieTitles = movieTitles);
        this.setFormControlValues(filterCriteria);
      });
  }

  private setFormControlValues(filterCriteria: MovieTitleFilterCriteria) {
    this.movieTitleForm.get('movieTitleTypeControl').setValue(filterCriteria.movieTitleTypes);
  }

  paginate($event) {
    const {pageIndex, pageSize} = $event;
    this.router.navigate([], {queryParams: {pageIndex, pageSize}, queryParamsHandling: 'merge'});
  }

  sort(sort: Sort) {
    const {active, direction} = sort;
    this.router.navigate([], {queryParams: {active, direction}, queryParamsHandling: 'merge'});
  }

  openedChange(opened) {
    if (opened) {
      return;
    }
    if (this.selectedMovieTitleTypes && this.selectedMovieTitleTypes.length > 0) {
      this.router.navigate([], {
        queryParams: {'movieTitleTypes': this.selectedMovieTitleTypes.join(',')},
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate([]);
    }
  }
}
