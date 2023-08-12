import { Injectable } from '@angular/core';
import { Ingredient } from '../models/Ingredient';
import { environmet } from 'src/environments/environment';
import { HttpClient, HttpClientModule, HttpParamsOptions } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

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
    console.log(autocomplateSearchLink);
    return autocomplateSearchLink;
  }
}
