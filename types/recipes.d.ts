/**
 * Defines the structure for an Ingredient.
 */
interface Ingredient {
  title: string;
  price: number;
  unitMeasure: 'g' | 'ml' | 'kg' | 'L';
}

/**
 * Defines the structure for a Recipe.
 */
interface Recipe {
  id: string; 
  title: string;
  totalCost: number;
  ingredients: Array<{
    ingredient: string; // Refers to the title of an Ingredient
    quantity: number;
    unit: 'g' | 'ml' | 'kg' | 'L';
  }>;
  createdBy: string;
  dateCreated: Date;
  category: 'starter' | 'main' | 'dessert';
  imgPath: string;
}

interface Column {
  header: string;
  accessor: string;
  className?: string;
}
