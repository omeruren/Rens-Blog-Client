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


}
