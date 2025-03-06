import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DirectoryListingComponent} from "./components/directory-listing/directory-listing.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, DirectoryListingComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Directory App';
}
