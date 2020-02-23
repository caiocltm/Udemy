import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  public getPosts(): void {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this._posts = postData.posts;
      this.postUpdated.next([...this._posts]);
    });
  }

  public getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  public setPosts(newPost: Post) {
    const post: Post = { id: null, title: newPost.title, content: newPost.content };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', JSON.stringify(post))
    .subscribe((response) => {
      this._posts.push(post);
      this.postUpdated.next([...this._posts]);
    });
  }
}
