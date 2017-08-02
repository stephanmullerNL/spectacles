import {Component, OnInit} from '@angular/core';
// import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user;

  // temp
  show: false;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
      this.user = this.route.snapshot.data['user'];
  }

  //
  // onUserSelect(event: string): void {
  //   this.username = event;
  //
  //   this.userService.getUserInfo(event)
  //       .then((user) => {
  //         this.error = null;
  //         this.user = user;
  //       })
  //       .catch((error) => {
  //         this.error = error;
  //         this.user = null;
  //       });
  // }
}
