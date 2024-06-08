import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentRoute: string = '';


  constructor(private router: Router) {
  }


  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }


  isMapRoute(): boolean {
    return this.currentRoute.includes('/dashboard/map');
  }

  isListRoute(): boolean {
    return this.currentRoute.includes('/dashboard/list');
  }

  isAddRoute(): boolean {
    return this.currentRoute.includes('/dashboard/add');
  }




}
