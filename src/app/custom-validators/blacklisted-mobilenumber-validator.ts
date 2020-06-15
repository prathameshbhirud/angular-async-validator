import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import 'rxjs/operator/map';
import { UserService } from '../user-service';

export function blackListedMobileNumberValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getBlackListedMobNumMobileNumberDetail(control.value).pipe(map(
      users => {
        return (users && users.length > 0) ? {"blackListedMobNum": true} : null;
      }
    ));
  };
}

@Directive({
  selector: '[blackListedMobNum][formControlName],[blackListedMobNum][formControl],[blackListedMobNum][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: BlackListedMobileNumberValidatorDirective, multi: true}]
})
export class BlackListedMobileNumberValidatorDirective implements AsyncValidator {
  constructor(private userService: UserService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return blackListedMobileNumberValidator(this.userService)(control);
  }
}

