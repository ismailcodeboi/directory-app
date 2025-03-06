import { Component, OnInit } from '@angular/core';
import { DirectoryService, File } from '../../services/directory.service';
import { Observable } from 'rxjs';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-directory-listing',
  templateUrl: './directory-listing.component.html',
  styleUrls: ['./directory-listing.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DirectoryListingComponent implements OnInit {
  directoryPath: string = '/'; // Default directory path
  files$: Observable<File[]> | undefined;

  constructor(private directoryService: DirectoryService) {}

  ngOnInit(): void {
    this.loadDirectory();
  }

  loadDirectory(): void {
    this.files$ = this.directoryService.listDirectory(this.directoryPath);
  }

  onDirectorySelect(path: string): void {
    this.directoryPath = path;
    this.loadDirectory();
  }
}
