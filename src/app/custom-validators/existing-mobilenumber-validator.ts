import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { UserService } from '../user-service';

export function existingMobileNumberValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getUserByMobileNumber(control.value).map(
      users => {
        return (users && users.length > 0) ? {"mobNumExists": true} : null;
      }
    );
  };
}

@Directive({
  selector: '[mobNumExists][formControlName],[mobNumExists][formControl],[mobNumExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingMobileNumberValidatorDirective, multi: true}]
})
export class ExistingMobileNumberValidatorDirective implements AsyncValidator {
  constructor(private userService: UserService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
     return existingMobileNumberValidator(this.userService)(control);
  }
}

