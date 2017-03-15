import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  rate: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private movieService: MovieService, private platform: Platform, private storage: Storage) {
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

  ngModelChange(value) {
     this.storage.ready().then(() => {
       this.storage.set(`RATINGS_${this.id}`, value);
     });
  }
  
  getMovieDetail(id: number) {
    this.movieService.getMovieDetail(id).subscribe((movie) => {
      this.movie = movie;
      const currentVote = movie.vote_average;
      const valuePromise = this.storage.get(`RATINGS_${this.id}`);
      valuePromise.then((value) => {
        this.rate = value || (currentVote / 2);
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  navigateToHomePage() {
    window.open(this.movie.homepage);
  }
}
