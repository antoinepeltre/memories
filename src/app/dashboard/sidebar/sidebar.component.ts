import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService,
    private router: Router) {

  }


  ngOnInit() {
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.authService.getCurrentUser()
    .subscribe(resp => {
      if (resp) {
        this.user = resp;
        console.dir(this.user);
      }
    })
  }

  signOut() {
    this.authService.signOut()
    .subscribe( resp => {
      this.router.navigate(['/login']);
    })
  }




}
