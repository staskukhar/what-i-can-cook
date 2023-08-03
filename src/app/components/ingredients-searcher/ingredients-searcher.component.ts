import { Component } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/Ingredient';
import { NgFor } from '@angular/common';
import { MyIngredientsListService } from 'src/app/services/my-ingredients-list.service';

@Component({
  selector: 'app-ingredients-searcher',
  templateUrl: './ingredients-searcher.component.html',
  styleUrls: ['./ingredients-searcher.component.css'],
})
export class IngredientsSearcherComponent{

  public ingredients!: Ingredient[];

  constructor(protected ingredientsService: IngredientsService,
    protected myIngredientsListService: MyIngredientsListService) { }

  ingredientsSearching() {
    this.ingredients = this.ingredientsService.getIngredients();
  }
  pickIngredient(ingredient: Ingredient) : void {
    this.myIngredientsListService.addIngredient(ingredient);
    console.log(this.myIngredientsListService.getIngredients());
  }
}
