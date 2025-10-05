import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminLayout } from './_layouts/admin-layout/admin-layout';
import { MainLayout } from './_layouts/main-layout/main-layout';
import { Home } from './_main-components/home/home';
import { Category } from './_admin-components/category/category';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Blog } from './_admin-components/blog/blog';
import { Login } from './_main-components/login/login';
import { BlogDetails } from './_main-components/blog-details/blog-details';
import { CommentForm } from './_main-components/comment-form/comment-form';
import { ContactMain } from './_main-components/contact-main/contact-main';
import { Comment } from './_admin-components/comment/comment';

@NgModule({
  declarations: [
    App,
    AdminLayout,
    MainLayout,
    Home,
    Category,
    Blog,
    Login,
    BlogDetails,
    CommentForm,
    ContactMain,
    Comment
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
