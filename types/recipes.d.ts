/**
 * Defines the structure for an Ingredient.
 */
interface Ingredient {
  title: string;
  price: number;
  unitMeasure: 'g' | 'ml' | 'kg' | 'L';
}


interface Recipe {
  id: string; 
  title: string;
  totalCost: number;
  ingredients: Array<{
    ingredient: string; 
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

type Unit =  'g' |'ml' |'kg' | 'L'

interface IngredientItemProps {
  id: string
  icon?: React.ReactNode; 
  iconBgColor?: string; 
  name: string;
  unit: string
  unitPrice?: number;
  quantity: number;
}

