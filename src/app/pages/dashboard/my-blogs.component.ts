import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/services/blog.service';
import { BlogPost } from '../../services/models/blog-post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
})
export class MyBlogsComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private svc: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.svc.getAll().subscribe(list => {
      // filter by current user if needed
      this.posts = list.filter(p => /* p.authorId === currentUserId */ true);
    });
  }

  public navigateToNewPost() {
    this.router.navigate(['dashboard/blogs/new']);
  }

  public navigateToEditPost(postId: number) {
    this.router.navigate(['dashboard/blogs', postId, 'edit']);
  }

  delete(p: BlogPost) {
    if (!confirm('Delete this post?')) return;
    this.svc.delete(p.id).subscribe(() => this.posts = this.posts.filter(x => x.id !== p.id));
  }
}
