import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { MATCH } from '../match';
import {UserService} from '../user.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    MatchService
]
})
export class DashboardComponent implements OnInit {

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
    favMatchId: number;
    disableButton = false;
    userId: string;
    isAdmin: boolean;


    constructor(
        private router: Router,
        private matchService: MatchService,
        private userService: UserService,
        private dataService: DataService) {

    }

    performFilter(filterBy: string): MATCH[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.match.filter((match: MATCH) =>
            match.winner_team.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }


    // Add To watchList / Remove from watchList
    watchMatch(event, index, selectedMatch): void {
        let text = event.target.outerText;
        this.disableButton = true;
        const currVal = (text == 'Add To Watchlist') ? 'Remove From Watchlist' : 'Add To Watchlist';
        this.favMatchId = selectedMatch.matchId;
        this.matchService.addToFavMatches(this.favMatchId).subscribe(
            data => {
                event.target.innerHTML = currVal;
            }
        );
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
      this.dataService.fromDashboard=true;

      this.router.navigate(['./favlistdetail']);
  }

    // changing HTML
    watchMatchOK(matchId: any): any {
        var buttonText = 'Add To Watchlist';
        for (var i = 0; i < this.AlreadyRecommended.length; i++) {
            if (this.AlreadyRecommended[i].matchId == matchId) {
                buttonText = 'Remove From Watchlist';
            }
        }

        return buttonText;
    }

    // format published Date
    formatDate(dateString: any): any {
        return new Date(dateString).toDateString();
    }

    redirect() {
        this.router.navigate(['./admin']);
    }

  

    ngOnInit(): void {
        if (this.userService.token === undefined) {
            this.userService.token = sessionStorage.getItem('accessToken');
            this.userName = this.userService.userId = sessionStorage.getItem('userId');
            this.userService.isAdmin = (sessionStorage.getItem('isAdmin') === 'true');
        }
        this.matchService.getAllMatches()
            .subscribe(match => {
                    this.match = match;
                    this.filteredMatch = this.match;
                    this.userId = this.userService.userId;
                    this.isAdmin = this.userService.isAdmin;
                    if (this.userId == undefined) {
                        this.router.navigate(['./login']);
                    }
                },
                error => this.errorMessage = <any>error);


        this.matchService.getAllWishListMatches()
            .subscribe(match => {
                    this.AlreadyRecommended = match;
                },
                error => this.errorMessage = <any>error);

    }

}
