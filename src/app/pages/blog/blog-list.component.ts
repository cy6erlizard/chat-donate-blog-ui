// src/app/pages/blog/blog-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/services/blog.service';
import { BlogPost } from '../../services/models/blog-post.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  imports: [RouterModule,
    CommonModule
  ],
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private svc: BlogService) {}

  ngOnInit() {
    this.svc.getAll().subscribe(list => this.posts = list);
  }
}
