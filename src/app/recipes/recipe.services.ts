import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.modal';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'First Recipe',
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum consectetur
      optio dolorum veniam ratione? Sit, repudiandae nostrum ad asperiores quaerat
      saepe explicabo inventore quisquam optio atque aut ut ullam voluptatum!
      `,
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)]
    ),
    new Recipe(
      'Secon Recipe',
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum consectetur`,
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      [new Ingredient('Macaroni', 5), new Ingredient('Salad', 10)]
    ),
  ];
  getRecipes() {
    return this.recipes.slice();
  }
  constructor(private shoppingListService: ShoppingListService) {}
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
