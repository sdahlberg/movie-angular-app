import {Component, OnInit} from '@angular/core';
import {MovieTitleDataService} from './movie-title-data.service';
import {MovieTitle} from './movie-title';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieTitleDataService]
})
export class AppComponent implements OnInit {
  title = 'movie-angular-app';
  movieTitles: MovieTitle[];

  constructor(private movieTitleDataService: MovieTitleDataService) {
  }

  ngOnInit() {
    this.movieTitleDataService.getMovieTitles().subscribe(movieTitles => this.movieTitles = movieTitles);
  }
}
