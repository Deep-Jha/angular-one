import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListSrevice: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListSrevice.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListSrevice.getIngredient(index);
        this.slForm.setValue({
          recipeName: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.recipeName, value.amount);
    if (this.editMode) {
      this.shoppingListSrevice.updateIngredient(
        this.editedItemIndex,
        ingredient
      );
    } else {
      this.shoppingListSrevice.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingListSrevice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
