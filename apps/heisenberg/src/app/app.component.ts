import { Component, OnInit } from '@angular/core';
import { UsersService } from '@aphrodite/users';

@Component({
  selector: 'aphrodite-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  constructor(private userService: UsersService){

  }


  ngOnInit(): void {
    // this.userService.initAppSection();
  }
  title = 'heisenberg';
}
