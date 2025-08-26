import { Plus } from 'lucide-react';

type AddIngredientButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AddIngredientButton = ({ onClick }: AddIngredientButtonProps) => (
  <div className="flex justify-center mt-4">
    <button
      type='button'
      onClick={onClick}
      className='flex items-center gap-2 px-4 py-2 transition-colors duration-200 border border-gray-400 border-dashed rounded-md bg-green-100 w-fit hover:bg-green-50'
    >
      <Plus size={20} /> Add Ingredient
    </button>
  </div>
);

export default AddIngredientButton