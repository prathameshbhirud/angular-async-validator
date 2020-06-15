import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user-service';
import { User } from './user';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-template',
   templateUrl: './template-driven-form.component.html'
})
export class TemplateDrivenFormComponent implements OnInit {
  dataSaved = false;
  allUsers$: Observable<User[]>;
  allBlackListedMnums$: Observable<any>;
  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.loadAllUsers();
    this.blackListedMNums();
  }
  onFormSubmit(form: NgForm) {
     this.dataSaved = false;
     let user: User = form.value;
     this.userService.getAllUsers().subscribe(users => {
         let maxIndex = users.length - 1;
         let maxIndexItem = users[maxIndex];
         user.id = maxIndexItem.id + 1;
         this.userService.createUser(user).subscribe(
           () => {
            this.dataSaved = true;  
           }
         );
     });
     form.resetForm();
  }
  loadAllUsers() {
    this.allUsers$ = this.userService.getAllUsers();
  }
  blackListedMNums(){
    this.allBlackListedMnums$ = this.userService.getAllBlackListedMobileNumbers();
  }
}
