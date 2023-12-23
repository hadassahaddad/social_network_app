import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Post } from '../models/posts.models';

export interface PostsState extends EntityState<Post> {}

export function createInitialState(): PostsState {
  return [];
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts', idKey: '_id' })
export class PostsStore extends EntityStore<PostsState, Post> {
  constructor() {
    super(createInitialState());
  }
}