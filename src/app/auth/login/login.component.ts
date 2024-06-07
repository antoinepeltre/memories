import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router) {

    this.loginForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    }); 

  }

  onSubmit() {
    this.authService.signIn(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    ).subscribe( resp => {
      this.router.navigate(['dashboard/list']);
    },
    error => {
      this.errorMessage = error;
    }) 
  }


}
