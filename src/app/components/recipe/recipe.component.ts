import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeInfo } from 'src/app/models/RecipeInfo';
import { SpoonacularService } from 'src/app/services/spoonacular.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  @Input() recipe!: Recipe;

  constructor(private spoonacularService: SpoonacularService) {}

  openOriginalSource(id: number): void {
    this.spoonacularService.getRecipeLinkById(id)
      .subscribe(
        data => {
          console.log(data);
          window.open(data, '_blank');
        },
        error => {
          console.log(error.name);
        }
        
      );
    
  }
}
