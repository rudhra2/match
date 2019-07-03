import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

private matchListURL : string;
private addToFavURL : string;
private getFavList :string;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { 
        this.matchListURL = 'http://localhost:9093/current';
        this.addToFavURL = 'http://localhost:9093/addToFavList/';
        this.getFavList = "http://localhost:9093/favList/";
  }

  getAllMatches(): Observable<any> {
   
    return this.http.get<any>(this.matchListURL);

}

addToFavMatches(favMatchId): Observable<any> {
  const httpOptions = {
      headers: new HttpHeaders({
          'userID': this.userService.userId
      })
  };
  return this.http.post<any>(this.addToFavURL + favMatchId, null, httpOptions);
}

getAllWishListMatches(): Observable<any> {
  return this.http.get<any>(this.getFavList+this.userService.userId);
}


}
