import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './reactive-form.component';
import { TemplateDrivenFormComponent } from './template-driven-form.component';
import { UserService } from './user-service';
import { ExistingUsernameValidatorDirective } from './custom-validators/existing-username-validator';
import { ExistingEmailValidatorDirective } from './custom-validators/existing-email-validator';
import { ExistingMobileNumberValidatorDirective } from './custom-validators/existing-mobilenumber-validator';
import { BlackListedMobileNumberValidatorDirective } from './custom-validators/blacklisted-mobilenumber-validator';

//For InMemory testing 
// import { TestData } from './test-data';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
  ],
  declarations: [
      AppComponent,
      ReactiveFormComponent,
      TemplateDrivenFormComponent,
      ExistingUsernameValidatorDirective,
      ExistingEmailValidatorDirective,
      ExistingMobileNumberValidatorDirective,
      BlackListedMobileNumberValidatorDirective	  
  ],
  providers: [
      UserService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
