import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SearchComponent } from '../pages/search/search.component';
import { DetailComponent } from '../pages/detail/detail.component';
import { Page2 } from '../pages/page2/page2';
import { HttpModule } from '@angular/http';
import { MovieService } from '../services/movie.service';
import { IonicStorageModule } from '@ionic/storage';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    SearchComponent,
    Page2,
    DetailComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchComponent,
    Page2,
    DetailComponent
  ],
  providers: [
    MovieService, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
