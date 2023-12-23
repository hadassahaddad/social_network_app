import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models/posts.models';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostsQuery } from '../../state/posts.query';
import { PostsStore } from '../../state/posts.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    InfiniteScrollModule,
    PostCardComponent,
    CommonModule,
    RouterOutlet],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts?: Observable<Post[]>;
  isLoading = false;
  currentPage=0;
  itemsPerPage=10;

  scrollDistance = 2;
  scrollUpDistance = 1.5;

  constructor(private postsApiService: PostsApiService, private postsStore: PostsStore, private postsQuery: PostsQuery) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.toggleLoading()
    this.postsApiService.getPosts(this.currentPage, this.itemsPerPage).subscribe((newPosts: Post[]) => {
      this.posts = this.postsQuery.selectAll();
      this.toggleLoading();
    });
  }

  onScroll= ()=>{
    this.currentPage += this.itemsPerPage;
    this.loadPosts();
   }

   toggleLoading = ()=>this.isLoading=!this.isLoading;
}

