import { Ingredient } from "./Ingredient";

export interface Recipe {
    id: number,
    image: string,
    missedIngredients: Ingredient[],
    usedIngredients: Ingredient[],
    title: string,
} 