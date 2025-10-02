import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './_layouts/main-layout/main-layout';
import { Home } from './_main-components/home/home';
import { AdminLayout } from './_layouts/admin-layout/admin-layout';
import { Category } from './_admin-components/category/category';

const routes: Routes = [
  //Main Routes
  {
    path: '',
    component: MainLayout,
    children: [
      {
        // Children routes here
        path: '',
        component: Home,
      },
    ],
  },

  //Admin Routes
  {
    path:'admin',
    component: AdminLayout,
    children: [
      {
        path: 'category',
        component: Category
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
