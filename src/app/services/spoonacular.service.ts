import { Injectable } from '@angular/core';
import { Ingredient } from '../models/Ingredient';
import { environmet } from 'src/environments/environment';
import { HttpClient, HttpClientModule, HttpParamsOptions } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from '../models/Recipe';
import { RecipeInfo } from '../models/RecipeInfo';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  protected apiKey!: string;

  constructor(protected httpClient: HttpClient) { 
    this.apiKey = environmet.spoonacularKey;
  }
  public getIngredients(query: string): Ingredient[]{
    let ingredients: Ingredient[] = [];
    const autocomplateUrl = this.getAutocomplateUrl(query);

    const options = {
      responseType: 'json' as const,
    };

    this.httpClient.get<Ingredient[]>(autocomplateUrl, options)
      .subscribe(
        data => {
          data.forEach(ingredient => {
            ingredients.push(ingredient);
          });
        },
        error => {
          console.log(error.name);
        }
      );
        
    return ingredients;
  }
  protected getAutocomplateUrl(query: string): string {
    let autocomplateSearchLink: string = 'https://api.spoonacular.com/food/ingredients/autocomplete';
    autocomplateSearchLink = autocomplateSearchLink.concat(`?apiKey=${this.apiKey}&query=${query}`);
    return autocomplateSearchLink;
  }
  protected getRecipeByIngredientsUrl(ingredientNames: string[]): string {
    let endpointUrl: string = 'https://api.spoonacular.com/recipes/findByIngredients';
    endpointUrl = endpointUrl.concat(`?apiKey=${this.apiKey}&ingredients=${ingredientNames.join(',+')}`);
    return endpointUrl;
  }
  protected getEndpointForRecipeInfo(id: number): string {
    let endpointUrl = 'https://api.spoonacular.com/recipes/';
    endpointUrl = endpointUrl.concat(`${id}/information?apiKey=${this.apiKey}`);
    return endpointUrl;
  }
  public getRecipesByIngredients(ingredients: Ingredient[]): Recipe[] {
    let recipes: Recipe[] = [];

    let httpGetLink = this.getRecipeByIngredientsUrl(ingredients.map(i => {
      return i.name;
    }));
    const options = {
      responseType: 'json' as const,
    };

    this.httpClient.get<Recipe[]>(httpGetLink, options)
      .subscribe(
        data => {
          data.forEach(recipe => {
            recipes.push(recipe);
          });
        },
        error => {
          console.log(error.name);
        }
      );  
    return recipes;
  }
  public getRecipeLinkById(id: number) : Observable<string> {
    let link!: string;

    let httpGetLink = this.getEndpointForRecipeInfo(id);
    const options = {
      responseType: 'json' as const,
    };
    return this.httpClient.get<RecipeInfo>(httpGetLink, options)
      .pipe(
        map(data => data.sourceUrl),
        catchError(error => {
          console.error('Error:', error);
          throw error; // You can rethrow or return a default value as needed
        })
      );  
  }
}
