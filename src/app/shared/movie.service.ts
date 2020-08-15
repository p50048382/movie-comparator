import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';

export const cityMovie={
    Actors: "Jessica Alba, Devon Aoki, Alexis Bledel, Powers Boothe",
    Awards: "38 wins & 53 nominations.",
    BoxOffice: "N/A",
    Country: "USA",
    DVD: "16 Aug 2005",
    Director: "Frank Miller, Robert Rodriguez, Quentin Tarantino",
    Genre: "Crime, Thriller",
    Language: "English",
    Metascore: "74",
    Plot: "A movie that explores the dark and miserable town, Basin City, tells the story of three different people, all caught up in violent corruption.",
    Poster: "https://m.media-amazon.com/images/M/MV5BODZmYjMwNzEtNzVhNC00ZTRmLTk2M2UtNzE1MTQ2ZDAxNjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Production: "Dimension Films",
    Rated: "R",
    Ratings: [
        {Source: "Internet Movie Database", Value: "8.0/10"},
        {Source: "Rotten Tomatoes", Value: "77%"},
        {Source: "Metacritic", Value: "74/100"}],
    Released: "01 Apr 2005",
    Response: "True",
    Runtime: "124 min",
    Title: "Sin City",
    Type: "movie",
    Website: "N/A",
    Writer: "Frank Miller (graphic novels)",
    Year: "2005",
    imdbID: "tt0401792",
    imdbRating: "8.0",
    imdbVotes: "731,577"
}

let newheaders = { 
    'Content-Type':  'application/json'
  }

@Injectable({
    providedIn: 'root',
})

export class MovieService{
    apiKey="9087a6ec";
    imdbUrl ='http://www.omdbapi.com/';
    
    constructor(private http:HttpClient){
    }
    getMovieList(searchTerm){
       let params = new HttpParams().set("apiKey",'9087a6ec').set('s',searchTerm)
        return this.http.get<any>(this.imdbUrl,{
            params:params
        });
    }
    getMovieDetailById(imdbID){
        let params = new HttpParams().set("apiKey",'9087a6ec').set('i',imdbID)
        return this.http.get<any>(this.imdbUrl,{
            params:params
        });
    }
    getCityMovie(){
        return cityMovie;
    }
}