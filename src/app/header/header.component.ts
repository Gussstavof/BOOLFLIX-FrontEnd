import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentHeaderComponent: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkHeaderComponent();
      }
    });
  }

  checkHeaderComponent() {
    const routeData = this.getChildRouteData(this.activatedRoute);
    this.currentHeaderComponent = routeData.headerComponent;
  }

  getChildRouteData(route: ActivatedRoute): any {
    if (route.firstChild) {
      return this.getChildRouteData(route.firstChild);
    }
    return route.snapshot.data;
  }
}
