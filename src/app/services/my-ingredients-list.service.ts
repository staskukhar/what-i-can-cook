import { Injectable } from '@angular/core';
import { Ingredient } from '../models/Ingredient';

@Injectable({
  providedIn: 'root'
})
export class MyIngredientsListService {

  private MyIngredients: Ingredient[] = []

  constructor() { }

  public getIngredients() : Ingredient[] {
    return this.MyIngredients;
  }

  public addIngredient(ingredient: Ingredient) : void {
    if(!this.MyIngredients.includes(ingredient)) this.MyIngredients.push(ingredient);
  }

  public removeIngredient(ingredient: Ingredient) : void {
    if(this.MyIngredients.includes(ingredient)) {
      this.MyIngredients.splice(
        this.MyIngredients.indexOf(ingredient), 1);
    }
  }
}
