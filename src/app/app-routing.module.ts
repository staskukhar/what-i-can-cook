import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesSearcherComponent } from './components/recipes-searcher/recipes-searcher.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '',   redirectTo: 'recipes-searching', pathMatch: 'full' },
  { path: 'recipes-searching', component: RecipesSearcherComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
