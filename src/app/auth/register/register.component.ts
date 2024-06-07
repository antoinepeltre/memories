import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router) {

    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });

  }

  onSubmit() {
    this.authService.signUp(
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value,
      this.registerForm.controls['firstName'].value,
      this.registerForm.controls['lastName'].value,
    ).subscribe( resp => {
      this.router.navigate(['login']);
    },
    error => {
      this.errorMessage = error;
    }) 
  }

}
