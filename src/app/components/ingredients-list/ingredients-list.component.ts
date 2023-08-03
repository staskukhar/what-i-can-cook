import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient';
import { MyIngredientsListService } from 'src/app/services/my-ingredients-list.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit{
  public ingredientsList: Ingredient[] = []

  constructor (protected myIngredientsListService: MyIngredientsListService) {}

  ngOnInit(): void {
    this.ingredientsList = this.myIngredientsListService.getIngredients();
  }

  public removeIngredient(ingredient: Ingredient) {
    this.myIngredientsListService.removeIngredient(ingredient);
  }
}
