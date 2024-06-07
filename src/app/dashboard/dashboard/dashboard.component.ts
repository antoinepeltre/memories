import { Component, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  constructor(private authService: AuthService) {

  }


  ngOnInit() {
    
  }


  

}
