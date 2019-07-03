import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {MatchService} from '../match.service';
import {UserService} from '../user.service';
@Component({
  selector: 'app-favlistdetail',
  templateUrl: './favlistdetail.component.html',
  styleUrls: ['./favlistdetail.component.css']
})
export class FavlistdetailComponent implements OnInit {

  match: any = {};
  fromDashboard: boolean;
  id: any;

  constructor(
      private router: Router,
      private dataService: DataService,
      private matchService: MatchService,
      private userService: UserService
  ) {
  }

  ngOnInit() {
      /** Fetching news Id from dashboard page and checking whether it is create or edit request */
      this.match = this.dataService;
      this.id = this.dataService.id;
  }

  redirect() {
      this.router.navigate(['favlist']);
    }
}

