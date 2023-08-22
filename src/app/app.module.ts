import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsSearcherComponent } from './components/ingredients-searcher/ingredients-searcher.component';
import { MyIngredientsListService } from './services/my-ingredients-list.service';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RecipesSearcherComponent } from './components/recipes-searcher/recipes-searcher.component';
import { RecipeComponent } from './components/recipe/recipe.component';


@NgModule({
    declarations: [
        AppComponent,
        IngredientsSearcherComponent,
        IngredientsListComponent,
        NavBarComponent,
        RecipesSearcherComponent,
        RecipeComponent
    ],
    providers: [MyIngredientsListService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AppModule { }
