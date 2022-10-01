import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'libs/users/src/lib/models/user';
import {  MessageService } from 'primeng/api';
import { UsersService } from 'libs/users/src/lib/services/users.service';

@Component({
  selector: 'bluebits-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  users:user[]=[];
  constructor(
    private messageService:MessageService,
    private router: Router,
    private userService: UsersService,
    
     ) {}

  ngOnInit(): void {
    this._getUsers();
  }
  
  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this._getUsers();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is deleted',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'erroe ',
          detail: 'category Not delete this category',
        });
      },
    });
  }

  updateUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }
 private _getUsers(){
this.userService.getUSers().subscribe((users)=>{
  this.users = users
})
  }
}
