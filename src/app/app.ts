import { Component, signal } from '@angular/core';
import { Blog } from './_models/blog';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('RensBlogClient');

  blogs: Blog[] = [
    { id: 1, title: 'First Blog', description: 'This is the first blog post.' },
    { id: 2, title: 'Second Blog', description: 'This is the second blog post.' },
    { id: 3, title: 'Third Blog', description: 'This is the third blog post.' },
    { id: 4, title: 'Fourth Blog', description: 'This is the fourth blog post.' },
    { id: 5, title: 'Fifth Blog', description: 'This is the fifth blog post.' },
  ];

  getblogs() {
    return this.blogs;
  }
}
