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
  history: string[] = ['/'];

  constructor(private directoryService: DirectoryService) {}

  ngOnInit(): void {
    this.loadDirectory();
  }

  loadDirectory(): void {
    this.files$ = this.directoryService.listDirectory(this.directoryPath);
  }

  onDirectorySelect(path: string): void {
    this.history.push(path);
    this.directoryPath = path;
    this.loadDirectory();
  }

  onPathClick(index: number): void {
    this.directoryPath = this.history[index];
    this.history = this.history.slice(0, index + 1);
    this.loadDirectory();
  }

  getPathSegments(): string[] {
    return this.directoryPath.split('/').filter((segment) => segment !== '');
  }

  goBack(): void {
    if (this.history.length > 1) {
      this.history.pop();
      this.directoryPath = this.history[this.history.length - 1];
      this.loadDirectory();
    }
  }
}
