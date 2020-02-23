import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  public getPosts(): Post[] {
    return [...this._posts];
  }

  public getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  public setPosts(newPost: Post) {
    const post: Post = { title: newPost.title, content: newPost.content };
    this._posts.push(post);
    this.postUpdated.next([...this._posts]);
  }
}
