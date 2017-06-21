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
  speechData: string;
  showSearchButton: boolean;
  constructor(private searchService: SearchService, private speechService: SpeechRecognitionService ) {
    this.speechData = "";
    this.showSearchButton = true;
  }
  
  ngOnInit() {
  }
  ngOnDestroy(){
    this.speechService.DestroySpeechObject();
  }

  activateSpeechSearchMovie(): void {
        this.showSearchButton = false;

        this.speechService.record()
            .subscribe(
            (value) => {
                this.speechData = value;
                console.log(value);
            },
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                }
            },
            () => {
                this.showSearchButton = true;
                console.log("--complete--");
                // this.activateSpeechSearchMovie();
            });
    }

    stopSpeech() {
      this.srchQuery.query = this.speechData;

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
      this.speechService.DestroySpeechObject();
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
