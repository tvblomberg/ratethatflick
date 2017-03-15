import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NavController, NavParams, Platform } from 'ionic-angular';
declare var cordova: any;
@Component({
  selector: 'detail',
  templateUrl: 'detail.component.html',
})
export class DetailComponent {
  movie: any = {};
  title: string = "";
  id: number;
  imageUrl: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private movieService: MovieService, private platform: Platform) {
    const movieSelected = navParams.get('movie');
    if (movieSelected.id) {
      this.id = movieSelected.id;
    } 

    if (movieSelected.title) {
      this.title = movieSelected.title;
    }

    this.imageUrl = this.movieService.getImageUrl();
  }

  ngOnInit() {
    if (this.id) {
      this.getMovieDetail(this.id);
    }
  }
  
  getMovieDetail(id: number) {
    this.movieService.getMovieDetail(id).subscribe(movie => this.movie = movie);
  }

  navigateToHomePage() {
    window.open(this.movie.homepage);
  }
}
