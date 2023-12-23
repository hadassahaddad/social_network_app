import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Post } from '../models/posts.models';
import { PostsStore } from '../state/posts.store';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient, private postsStore: PostsStore ) {}

  getPosts(startIndex: number, batchSize: number): Observable<Post[]> {
    const params = new HttpParams()
      .set('startIndex', startIndex.toString())
      .set('batchSize', batchSize.toString());
  
    return this.http.get<Post[]>(this.apiUrl, { params }).pipe(
      tap((posts :Post[])=>{
        this.postsStore.add(posts);
      })
    );
  }
  

}
