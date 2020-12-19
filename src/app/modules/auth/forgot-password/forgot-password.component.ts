import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs/operators';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  otpVerificationForm: FormGroup;
  resetPasswordForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  public otpVerifyStatus: boolean;
  public passwordChanged = true;
  public successStatus = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    this.otpVerificationForm = this.fb.group({
      otp: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      confirmPassword: [
        null,
        Validators.compose([
          Validators.required,
          this.validateAreEqual.bind(this)
        ]),
      ],
    });

  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        'smeet@gmail.com',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
  }

  submit() {
    this.errorState = ErrorStates.NotSubmitted;
    const forgotPasswordSubscr = this.authService
      .forgotPassword(this.f.email.value)
      .pipe(first())
      .subscribe((result: boolean) => {
        this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
      });
    this.unsubscribe.push(forgotPasswordSubscr);
  }

  otpVerification() {
    if(this.otpVerificationForm.valid) {

      this.otpVerifyStatus = true;
      this.passwordChanged = false;
    }
  }

  submitPassword() {
    if(this.resetPasswordForm.valid) {
      this.passwordChanged = true;
      this.successStatus = true;
      // this.router.navigate(['/auth/login']);
    }
  }

  private validateAreEqual(fieldControl: FormControl) {
    if(this.resetPasswordForm && this.resetPasswordForm.get("newPassword").value) {
      return fieldControl.value === this.resetPasswordForm.get("newPassword").value ? null : {
        NotEqual: true
      };
    }
  }


}
