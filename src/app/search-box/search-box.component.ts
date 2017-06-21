import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from './search-service';
import { SpeechRecognitionService } from './speech-service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Output() responseReceived = new EventEmitter();
 // searchQuery = ''; // query to post to the server
  searchResults = []; // results received for query from server
  srchQuery = {
    "query": "",
    "lang": "en",
    "sessionId": "1234567890"
  }

  // constructor() { }
  constructor(private searchService: SearchService ) {}

  ngOnInit() {
  }
  ngOnDestroy(){
    
  }
  
  onSubmit (f: NgForm) {
    // console.log(f.value);
    this.srchQuery.query = f.value.searchQuery; // to test, change it to the response received from server
    
    this.searchService.postQuery(this.srchQuery)
      .subscribe(
        (response) => {
          let srchResponse = response.json().result.fulfillment.speech;
          this.searchResults = [{ searchQuery: srchResponse }];
          this.responseReceived.emit(this.searchResults);
          console.log(this.searchResults)
        },
        (error) => console.log(error)
      )
   
  }
}
