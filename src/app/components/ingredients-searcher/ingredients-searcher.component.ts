import { Component } from '@angular/core';
import { SpoonacularService } from 'src/app/services/spoonacular.service';
import { Ingredient } from 'src/app/models/Ingredient';
import { NgFor } from '@angular/common';
import { MyIngredientsListService } from 'src/app/services/my-ingredients-list.service';

@Component({
  selector: 'app-ingredients-searcher',
  templateUrl: './ingredients-searcher.component.html',
  styleUrls: ['./ingredients-searcher.component.css'],
})
export class IngredientsSearcherComponent{
  searchQuery: string = '';

  public ingredients!: Ingredient[];

  constructor(protected spoonacularService: SpoonacularService,
    protected myIngredientsListService: MyIngredientsListService) { }

  onSearch() {
    this.ingredients = this.spoonacularService.getIngredients(this.searchQuery);
  }
  pickIngredient(ingredient: Ingredient) : void {
    this.myIngredientsListService.addIngredient(ingredient);
    this.clearQueryAndResults();
  }
  protected clearQueryAndResults() { 
    // method that shold be called after picking ingredient and clear input and search result
    this.ingredients = [];
    this.searchQuery = '';
  }
}
