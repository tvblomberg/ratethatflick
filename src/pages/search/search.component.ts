import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieService } from '../../services/movie.service';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  providers: [MovieService]
})
export class SearchComponent {
  movieSub: any;
  movies = [];
  constructor(public navCtrl: NavController, private movieService: MovieService) {}

  ngAfterViewInit() {}

  searchChange(event) {
    const filter = event.srcElement.value;

    if (filter === "") {
      this.movies = [];
    } else {
      this.getMovies(filter);
    }
  }

  getMovies(searchFilter: string) {
    this.movieSub = this.movieService.getMovies(searchFilter).subscribe(movies => this.movies = movies);
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }

  itemTapped(event, movie) {
    this.navCtrl.push(DetailComponent, {
      movie: movie
    });
  }
}
