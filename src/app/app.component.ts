import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';
import {MovieTitleDataService} from './movie-title-data.service';
import {MovieTitle} from './movie-title';
import {Page} from './page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieTitleDataService]
})
export class AppComponent implements OnInit {
  title = 'movie-angular-app';
  pageableMovieTitles: Page<MovieTitle>;
  displayedColumns: string[] = ['tconst', 'movieTitleType', 'primaryTitle', 'isAdult', 'startYear', 'endYear', 'runtimeMinutes'];
  pageEvent: PageEvent;

  constructor(private movieTitleDataService: MovieTitleDataService) {
  }

  ngOnInit() {
    this.movieTitleDataService.getMovieTitles().subscribe(movieTitles => this.pageableMovieTitles = movieTitles);
  }

  loadData($event) {
    this.movieTitleDataService.getMovieTitles($event.pageIndex, $event.pageSize)
      .subscribe(movieTitles => this.pageableMovieTitles = movieTitles);
  }
}
