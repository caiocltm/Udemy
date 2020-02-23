import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  enteredTitle = '';
  enteredContent = '';

  constructor(public postService: PostService) {}

  onAddPost(form: NgForm): void {
    if(form.invalid) return;
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };
    this.postService.setPosts(post);
    form.resetForm();
  }
}
