import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-recipe-slider',
  templateUrl: './recipe-slider.component.html',
  styleUrls: ['./recipe-slider.component.css']
})
export class RecipeSliderComponent {
  @Input() recipeList!: Recipe[];
  @Input() activeRecipeIndex: number = 0;

  public makeActive(index: number): void {
    this.activeRecipeIndex = index;
  }
}
