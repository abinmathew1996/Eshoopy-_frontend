import { Component, OnInit } from '@angular/core';
import { AuthService } from '@aphrodite/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private authServer: AuthService) {}

  ngOnInit(): void {}

  logoutUser(){
    this.authServer.logout();
  }
}
