import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from './user-service';
import { User } from './user';
import { existingUsernameValidator } from './custom-validators/existing-username-validator';
import { existingEmailValidator } from './custom-validators/existing-email-validator';
import { existingMobileNumberValidator } from './custom-validators/existing-mobilenumber-validator';
import { blackListedMobileNumberValidator } from './custom-validators/blacklisted-mobilenumber-validator';

@Component({
   selector: 'app-reactive',
   templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  dataSaved = false;
  userForm: FormGroup; 
  constructor(private formBuilder:FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['',
            [ Validators.required ], //sync validators
            [ existingUsernameValidator(this.userService) ] //async validators
      ],
      email: ['', 
            [ Validators.required, Validators.email ], //sync validators
            [ existingEmailValidator(this.userService) ] //async validators
      ],
      mobileNumber: ['', 
            [ Validators.required ], //sync validators
            [ existingMobileNumberValidator(this.userService),
              blackListedMobileNumberValidator(this.userService) ] //async validators
      ]
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    let user = this.userForm.value;
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
    this.userForm.reset();
  }

  get username() {
     return this.userForm.get('username');
  }

  get email() {
     return this.userForm.get('email');
  }  

  get mobileNumber() {
     return this.userForm.get('mobileNumber');
  }    
}
