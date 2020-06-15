import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer } from "rxjs";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { UserService } from '../user-service';

export function existingUsernameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 500; //milliseconds
    return userService.getUserByUsername(control.value).pipe(map(
        users => {
          return (users && users.length > 0) ? {"usernameExists": true} : null;
        }
      ));
  };
} 

@Directive({
  selector: '[usernameExists][formControlName],[usernameExists][formControl],[usernameExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingUsernameValidatorDirective, multi: true}]
})
export class ExistingUsernameValidatorDirective implements AsyncValidator {
  constructor(private userService: UserService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingUsernameValidator(this.userService)(control);  
  }
}

