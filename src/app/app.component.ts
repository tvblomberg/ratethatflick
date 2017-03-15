import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { DetailComponent } from '../pages/detail/detail.component';
import { Page2 } from '../pages/page2/page2';
import { MovieService } from '../services/movie.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page2;

  pages: Array<{title: string, component: any}>;
  movieSub: any;
  movies = [];

  constructor(private movieService: MovieService, public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Detail', component: Page2 }
    ];
  }

  getMovies(searchFilter: string) {
    this.movieSub = this.movieService.getMovies(searchFilter).subscribe(movies => this.movies = movies);
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

    itemTapped(event, movie) {
    this.nav.setRoot(DetailComponent, {
      movie: movie
    });
  }

    searchChange(event) {
    const filter = event.srcElement.value;

    if (filter === "") {
      this.movies = [];
    } else {
      this.getMovies(filter);
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
