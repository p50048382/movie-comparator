import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  @Input() movies:[];
  combinedMovies={
      Title:{},
      imdbVotes:{},
      imdbRating:{},
      Year:{},
      Runtime:{},
      Ratings:{},
      Metascore:{},
      Awards:{}
    }
  ;
  combinedMoviesForBinding=[];
  movie1=[];
  movie2=[];
  constructor() { }
  ngOnInit(): void {
     let obj1 =  this.movies.filter((res,index)=>index===0).map((res,index)=>res);
     let obj2 =  this.movies.filter((res,index)=>index===1).map((res,index)=>res);
     this.movie1 =obj1.pop()
     this.movie2 =obj2.pop()
    this.makeComparisonArray()
  }
  makeComparisonArray(){
     Object.keys(this.combinedMovies)
    .forEach(e =>
      {
        this.combinedMovies[e]['movie1']=this.movie1[e];
        this.combinedMovies[e]['movie2']=this.movie2[e];
      });
    //  console.log(this.combinedMovies);
     let movieObject= JSON.parse(JSON.stringify(this.combinedMovies));
     movieObject['IMD']={movie1:{}};
     movieObject['IMD']={movie2:{}};
     movieObject['RottenT']={movie1:{}};
     movieObject['RottenT']={movie2:{}};
     movieObject['Metacritic']={movie1:{}};
     movieObject['Metacritic']={movie2:{}};
     Object.keys(movieObject).forEach(e=>{
       if(e=="Ratings"){
        Object.keys(movieObject[e]).forEach(movie => {
          movieObject[e][movie].forEach((rating,index) => {
            if(index==0){
              movieObject['IMD'][movie]=rating?.Value;
            }
            if(index==1){
              movieObject['RottenT'][movie]=rating?.Value;
            }
            if(index==2){
              movieObject["Metacritic"][movie]=rating?.Value;
            }
          });
         });
       }
     })
     movieObject['AwardsWon']={movie1:{}};
     movieObject['AwardsWon']={movie2:{}};
     movieObject['Nominations']={movie1:{}};
     movieObject['Nominations']={movie2:{}};
     Object.keys(movieObject).forEach(key1=>{
       if(key1=="Awards"){
        Object.keys(movieObject[key1]).forEach((key2)=>{
           let award= movieObject[key1][key2].split(' '); 
            movieObject['AwardsWon'][key2]=award[0];
            movieObject['Nominations'][key2]=award[3];
        })
       }
     })
    //  console.log(movieObject);
     delete movieObject.Awards;
     delete movieObject.Ratings;
     this.combinedMoviesForBinding.push(movieObject) ;

  }
}
