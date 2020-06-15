import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { UserService } from '../user-service';

export function existingEmailValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getUserByEmail(control.value).then(
      users => {
        return (users && users.length > 0) ? {"emailExists": true} : null;
      }
    );
  };
} 

@Directive({
  selector: '[emailExists][formControlName],[emailExists][formControl],[emailExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingEmailValidatorDirective, multi: true}]
})
export class ExistingEmailValidatorDirective implements AsyncValidator {
  constructor(private userService: UserService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingEmailValidator(this.userService)(control);
  }
}

