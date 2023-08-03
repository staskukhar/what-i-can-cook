import { Injectable } from '@angular/core';
import { Ingredient } from '../models/Ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() { 

  }
  public getIngredients() : Array<Ingredient> {
    return [
      {
        id: 9003,
        name: 'apple',
        image: 'apple.jpg'
      },
      {
        id: 9019,
        name: "applesauce",
        image: "applesauce.png"
      },
      {
        id: 9016,
        name: "apple juice",
        image: "apple-juice.jpg"
      }
    ]
  }
}
