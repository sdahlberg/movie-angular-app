import {Component, OnInit} from '@angular/core';
import {MovieTitleDataService} from './movie-title-data.service';
import {MovieTitle} from './movie-title';
import {Page} from './page';
import {ActivatedRoute, Router} from '@angular/router';
import {Pageable} from './pageable';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieTitleDataService]
})
export class AppComponent implements OnInit {
  title = 'movie-angular-app';
  pageOfMovieTitles: Page<MovieTitle> = <Page<MovieTitle>>{};
  displayedColumns: string[] = ['tconst', 'movieTitleType', 'primaryTitle', 'isAdult', 'startYear', 'endYear', 'runtimeMinutes', 'genres'];

  constructor(private movieTitleDataService: MovieTitleDataService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.movieTitleDataService.getMovieTitles().subscribe(movieTitles => this.pageOfMovieTitles = movieTitles);
    this.route.queryParams
      .subscribe(queryParams => {
        if (queryParams.pageSize && queryParams.pageIndex || queryParams.active && queryParams.direction) {
          const pageable: Pageable = {...this.pageOfMovieTitles.pageable};
          if (queryParams.pageSize && queryParams.pageIndex) {
            pageable.pageSize = queryParams.pageSize;
            pageable.pageNumber = queryParams.pageIndex;
          }
          if (queryParams.active && queryParams.direction) {
            pageable.sort = {
              orders: [{
                direction: queryParams.direction,
                property: queryParams.active
              }]
            };
          }
          this.movieTitleDataService.getMovieTitles(pageable).subscribe(movieTitles => this.pageOfMovieTitles = movieTitles);
        }
      });
  }

  paginate($event) {
    const {pageIndex, pageSize} = $event;
    this.router.navigate(['movie-title-overview'], {queryParams: {pageIndex, pageSize}});
  }

  sort(sort: Sort) {
    console.log(sort);
    const {active, direction} = sort;
    this.router.navigate(['movie-title-overview'], {queryParams: {active, direction}});
  }
}
