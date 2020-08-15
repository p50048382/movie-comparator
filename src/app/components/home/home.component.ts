import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable,interval, of, Subject} from 'rxjs';
import {map, startWith,debounce} from 'rxjs/operators';
import { MovieService } from "../../shared/movie.service";
import { NotificationService } from "../../shared/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  form1: FormGroup;
  cityMovie=[];
  movies=[];
  doCompare:boolean=false;
  cards=[
    {
      title:"First Movie",
      label:"Search 1st movie",
      placeholder:"Write full keyword eg. City",
      id:1,
      control:new FormControl()
    },
    {
      title:"Second Movie",
      label:"Search 2nd movie",
      placeholder:"Write full keyword eg. God",
      id:2,
      control:new FormControl()
    }
  ]
  filteredOptions=new Subject();
  checked:boolean=false;
  constructor(public movieService:MovieService,private notificationService: NotificationService) { }

  ngOnInit(): void {
    // this.cityMovie = this.movieService.getCityMovie()
    this.getCityMovie();
    this.cards.forEach((card,index)=>{
      this.callControls(index);
    })
  }
  callControls(id){
    this.cards[id].control.valueChanges.pipe(debounce(() => interval(500))).subscribe(val=>{
      if(val){
      this.movieService.getMovieList(val).subscribe(res=>{
        if(res.Response ==='False' && this.movies[id]){
            // this.notificationService.info(res.Error);
        }
        this.filteredOptions.next(res.Search);
      },err=>{
        console.log(err);
      });
    }
    else{
      if(val){
        this.notificationService.info("Too many Results!!")}
    }
    });
  }
  newMovieSelected(movie){
    this.movieService.getMovieDetailById(movie.event.imdbID).subscribe(res=>{
      if(movie.card.id=="1"){
      this.checked=false;
      this.movies[0]=res;
      }
      if(movie.card.id=="2"){
      this.checked=false;
      this.movies[1]=res;
      }
    })
  }
  getCityMovie(){
    this.cityMovie[0]=this.movieService.getCityMovie();
    this.cityMovie[1]=this.movieService.getCityMovie();
  }
  toggleCompare(event){
    if(event?.checked && this.movies?.length<2){
      this.notificationService.warn("Select two movies to compare!!")
    }
    
    this.doCompare=!this.doCompare;

  }

}
