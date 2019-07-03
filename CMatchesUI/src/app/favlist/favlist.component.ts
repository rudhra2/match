import { Component, OnInit } from '@angular/core';
import {MATCH} from '../match';
import {UserService} from '../user.service';
import {MatchService} from '../match.service';
import {Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-favlist',
  templateUrl: './favlist.component.html',
  styleUrls: ['./favlist.component.css']
})
export class FavlistComponent implements OnInit {
  pageTitle: string = 'Match List';
  userName = this.userService.userId;
  imageWidth: number = 80;
  imageMargin: number = 2;
  errorMessage: string;
  AlreadyRecommended: MATCH[] = [];
  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }

  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredMatch = this.listFilter ? this.performFilter(this.listFilter) : this.match;
  }

  filteredMatch: MATCH[];
  match: MATCH[] = [];
  favMatchId: string;
  disableButton = false;


  constructor(
      private router: Router,
      private matchService: MatchService,
      private userService: UserService ,
      private dataService: DataService) {

  }

  performFilter(filterBy: string): MATCH[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.match.filter((match: MATCH) =>
          match.winner_team.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  viewMatchRedirect(event, index) {

    this.dataService.id = this.filteredMatch[index].id;
    this.dataService.matchId = this.filteredMatch[index].matchId;
    this.dataService.date = this.filteredMatch[index].date;
    this.dataService.dateTimeGMT = this.filteredMatch[index].dateTimeGMT;
    this.dataService.team_1 = this.filteredMatch[index].team_1;
    this.dataService.team_2 = this.filteredMatch[index].team_2;
    this.dataService.type = this.filteredMatch[index].type;
    this.dataService.squad = this.filteredMatch[index].squad;
    this.dataService.toss_winner_team = this.filteredMatch[index].toss_winner_team;
    this.dataService.winner_team = this.filteredMatch[index].winner_team;
    this.dataService.matchStarted = this.filteredMatch[index].matchStarted;
    this.dataService.fromDashboard = false;
    this.router.navigate(['./favlistdetail']);
}

  // Get all wish list news service
  ngOnInit(): void {
      
      this.matchService.getAllWishListMatches()
          .subscribe(match => {
                  this.match = match;
                  this.filteredMatch = this.match;
                  if (this.userService.userId == undefined) {
                      this.router.navigate(['./login']);
                  }

              },
              error => this.errorMessage = <any>error);


  }

}
