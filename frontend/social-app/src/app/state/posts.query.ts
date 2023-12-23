import { QueryEntity } from '@datorama/akita';
import { PostsStore, PostsState } from './posts.store';
import { Injectable } from '@angular/core';
import { Post } from '../models/posts.models';

@Injectable({ providedIn: 'root' })
export class PostsQuery extends QueryEntity<PostsState, Post> {
  constructor(protected override store: PostsStore) {
    super(store);
  }
}

export function getPostsQuery(store: PostsStore, postsQuery: PostsQuery) {
  return postsQuery || new PostsQuery(store);
}
