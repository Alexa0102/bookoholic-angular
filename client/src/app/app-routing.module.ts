import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddComponent } from './books/add/add.component';
import { CatalogComponent } from './books/catalog/catalog.component';
import { DetailsComponent } from './books/details/details.component';
import { ErrorComponent } from './core/error/error.component';
import { HomeComponent } from './core/home/home.component';
import { AuthActivate } from './shared/guards/auth.activate';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthActivate],
    data: {
      'guest': true,
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthActivate],
    data: {
      'guest': true,
    }
  },
  {
    path: 'books',
    component: CatalogComponent,
    canActivate: [AuthActivate],
    data: {
      'guest': false,
    }
  },
  {
    path: 'books/:id',
    component: DetailsComponent,
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AuthActivate],
    data: {
      'guest': false,
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate],
    data: {
      'guest': false,
    }
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {
      title: '404 Not Found'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
