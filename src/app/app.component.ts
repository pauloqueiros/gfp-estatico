import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from "./side-nav/side-nav.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      RouterOutlet,
      SideNavComponent,
      MatSidenavModule,
      HttpClientModule
    ]
})
export class AppComponent {
  title = 'gfp-estatico';
}
