import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() responseReceived = new EventEmitter();
 // searchQuery = ''; // query to post to the server
  searchResults = []; // results received for query from server

  constructor() { }

  ngOnInit() {
  }
  onSubmit (f: NgForm) {
    // console.log(f.value);
    this.searchResults.push(f.value); // to test, change it to the response received from server
    
    this.responseReceived.emit(this.searchResults);
  }
}
