import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {
    apiKey = "API_KEY_GOES_HERE";
    searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}`;
    imageUrl = 'https://image.tmdb.org/t/p/w500/';
    queryUrl = `https://api.themoviedb.org/3/movie/`;

    constructor(private http: Http) { }
    
    getMovies(search: string): any {
        const encodedSearchString = encodeURIComponent(search);
        const url = `${this.searchUrl}&query=${encodedSearchString}`;
        return this.http.get(url).map(res => res.json().results).catch(this.handleError);
    }

    getMovieDetail(id: number): any {
        const url = `${this.queryUrl}${id}?api_key=${this.apiKey}`;
        return this.http.get(url).map(res => res.json()).catch(this.handleError);
    }

    handleError(error: Response | any) {
        let errorMessage: string;

        if (error instanceof Response) {
            const body = error.json() || "";
            const err = body.error || JSON.stringify(body);

            errorMessage = `${error.status} - ${error.statusText || ''} ${err}`
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }

        alert(errorMessage);

        return Observable.throw(errorMessage);
    }

    getImageUrl() {
        return this.imageUrl;
    }
}