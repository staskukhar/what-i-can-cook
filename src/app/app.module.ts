import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsSearcherComponent } from './components/ingredients-searcher/ingredients-searcher.component';
import { MyIngredientsListService } from './services/my-ingredients-list.service';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';

@NgModule({
    declarations: [
        AppComponent,
        IngredientsSearcherComponent,
        IngredientsListComponent
    ],
    providers: [MyIngredientsListService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
