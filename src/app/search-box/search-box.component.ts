import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchQuery = '';
  constructor() { }

  ngOnInit() {
  }
  onSubmit (f: NgForm) {
    this.searchQuery = f.value.search;
    // console.log(f.value.search);
    // this.searchQuery = event;
  }
}
