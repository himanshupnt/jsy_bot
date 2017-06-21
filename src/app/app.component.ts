import { Component } from '@angular/core';
import { SearchService } from './search-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jsy';
  results = [{searchQuery: 'Hey there mooo'},{searchQuery: 'Hey there yo'}];
  onResultsReceived(searchResults) {
    this.results = searchResults;
    console.log('here=>', this.results);
  }
  
}
