import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MyIngredientsListService } from 'src/app/services/my-ingredients-list.service';
import { SpoonacularService } from 'src/app/services/spoonacular.service';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-recipes-searcher',
  templateUrl: './recipes-searcher.component.html',
  styleUrls: ['./recipes-searcher.component.css']
})
export class RecipesSearcherComponent {
  public recipes!: Recipe[];
  constructor (protected myIngredientsService: MyIngredientsListService,
    protected spoonacularService: SpoonacularService) {}
  public onSearch(): void {
    var myIngredients = this.myIngredientsService.getIngredients()
    if(myIngredients) {
      this.recipes = this.spoonacularService.getRecipesByIngredients(myIngredients);
    }
  }
}
