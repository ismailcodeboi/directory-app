import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface File {
  name: string;
  path: string;
  size: number;
  extension: string;
  created: string;
  permissions: string;
  isDirectory: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  constructor(private apollo: Apollo) {}

  listDirectory(path: string, limit?: number, offset?: number): Observable<File[]> {
    return this.apollo
      .query<{ listDirectory: File[] }>({
        query: gql`
          query ListDirectory($path: String!, $limit: Int, $offset: Int) {
            listDirectory(path: $path, limit: $limit, offset: $offset) {
              name
              path
              size
              extension
              created
              permissions
              isDirectory
            }
          }
        `,
        variables: { path, limit, offset},
      })
      .pipe(map((result) => result.data.listDirectory));
  }
}
