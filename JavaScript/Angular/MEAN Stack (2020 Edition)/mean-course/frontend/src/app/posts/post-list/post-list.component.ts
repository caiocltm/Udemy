import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;
  isLoading = false;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdatedListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postService.deletePost(id);
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
