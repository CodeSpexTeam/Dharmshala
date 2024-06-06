import { Component } from '@angular/core';
import { AuthserviceService } from '../../admin service/authservice/authservice.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../admin service/userservice/user-store.service';
import { MemberserviceService } from '../../admin service/memberservice/memberservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  isSuperAdmin: boolean = false;
  isSubmitted: boolean = false;
  errorMsg: boolean = false;

  signInForm: FormGroup;

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private memberService: MemberserviceService,
    private userStore: UserStoreService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.checkIsLoggedIn();
    this.IsSuperAdminExists();
  }

  checkIsLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  get f() {
    return this.signInForm.controls;
  }
  onSignin() {
    if (this.signInForm?.invalid) {
      this.isSubmitted = true;
      return;
    } else {
      console.log(this.signInForm?.value);
      this.authService.onSubmitLoginForm(this.signInForm?.value).subscribe(
        (res: any) => {
          console.log('Response:', res); // Add logging for response

          this.authService.setToken(res.token);
          const tokenPayload = this.authService.decodeToken();
          this.userStore.setFullNameFromStore(tokenPayload.unique_name);
          this.userStore.setRoleFromStore(tokenPayload.role);
          this.toastr.success('Login Successfully!', 'Success');
          window.location.reload(); 
        },
        (error: any) => {
          // console.error('Error:', error.error.message); // Log any errors from the observable
          this.toastr.error(
            error.error.message,
            'Error'
          );
        }
      );
    }
  }

  IsSuperAdminExists() {
    this.memberService.IsSuperAdminExists().subscribe(
      (res: any) => {
        this.isSuperAdmin = res;
      },
      (error) => {
        // debugger;
        this.toastr.error( error.message,'Error Message');
      }
    );
  }
}
