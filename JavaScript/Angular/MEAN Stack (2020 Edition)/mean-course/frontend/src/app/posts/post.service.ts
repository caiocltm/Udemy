import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  public getPosts(): void {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content
          };
        });
      })
    )
    .subscribe((posts) => {
      this._posts = posts;
      this.postUpdated.next([...this._posts]);
    });
  }

  public getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  public getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  public setPosts(newPost: Post) {
    const post: Post = { id: null, title: newPost.title, content: newPost.content };
    this.http.post<{message: string, post: any}>('http://localhost:3000/api/posts', post)
    .pipe(map((postData) => {
        return {
          id: postData.post._id,
          title: postData.post.title,
          content: postData.post.content
        };
      })
    )
    .subscribe(addedPost => {
      this._posts.push(addedPost);
      this.postUpdated.next([...this._posts]);
      this.router.navigate(['/']);
    });
  }

  public deletePost(postId: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + postId)
    .subscribe(_ => {
      const updatedPosts = this._posts.filter(post => post.id !== postId);
      this._posts = updatedPosts;
      this.postUpdated.next([...this._posts]);
    });
  }

  public updatePost(updatedPost: Post) {
    const post: Post = {...updatedPost};
    this.http.put<{message: string}>('http://localhost:3000/api/posts/' + post.id, post)
    .subscribe(_ => {
      const updatedPosts = this._posts.filter(p => p.id !== post.id);
      updatedPosts.push(post);
      this._posts = updatedPosts;
      this.postUpdated.next([...this._posts]);
      this.router.navigate(['/']);
    });
  }
}
