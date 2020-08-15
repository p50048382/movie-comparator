import { Component, OnInit,Input, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
@Input() card;
@Input() filteredOptions;
@Output() movie: EventEmitter<any>= new EventEmitter;
  constructor() { }
  ngOnInit(): void {
    
  }
  clearInput(input){
    input.value = ""
  }
  movieSelected(event){
    this.movie.next({
      event:event,
      card:this.card
    });
  }

}
