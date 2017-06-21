import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class SearchService {
    constructor(private http: Http) { }
    postQuery(query: any) {
        const header = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer 99c3c44b96d94a1bafc4c4bf5d0c16ae'})
        const options = new RequestOptions({ headers: header})
        return this.http.post('https://api.api.ai/v1/query?v=20170510', query, options);
    }

}