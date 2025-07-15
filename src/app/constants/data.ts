import { Column, Recipe } from "@/shemas/recipe";

export const recipes: Recipe[] = [
  {
  id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  title: "Classic Spaghetti Carbonara",
  totalCost: 15.75,
  createdBy: "user_ck123",
  dateCreated: new Date("2024-07-16T10:00:00Z"),
  category: "main", // Assuming RecipeCategorySchema resolves to a string
  imgPath: "https://images.pexels.com/photos/12345/spaghetti-restaurant-eat-food-12345.jpeg"
},
{
  id: "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
  title: "Simple Tomato Soup",
  totalCost: 8.50,
  createdBy: "user_gh456",
  dateCreated: new Date("2024-07-15T18:30:00Z"),
  category: "main", // Assuming RecipeCategorySchema resolves to a string
  // imgPath is optional, so it's omitted here
}
] 

export const columns: Column[] = [
  {header: 'Food Name',
   accessor: 'foodName',
   className: " text-gray-500 w-2/4 md:w-3/10 text-sm text-center md:text-left"
  },
  {
    header: 'Created By',
    accessor: 'createdBy',
    className: "hidden md:table-cell md:w-1.5/10   text-gray-500 text-sm text-left pl-4"
  },
  {
    header: 'Date Created',
    accessor: 'dateCreated',
    className: "hidden md:table-cell md:w-1.5/10   text-gray-500 text-sm text-left pl-4"
  },
  {
    header: 'Category',
    accessor: 'category',
    className: "hidden md:table-cell md:w-1.5/10  text-gray-500 text-sm text-left pl-4"
  },
  {
    header: 'Cost',
    accessor: 'totalCost',
    className: "hidden md:table-cell text-gray-500 text-sm md:w-1.5/10  text-center md:text-left md:pl-4 "
  },
  {
    header: 'Actions',
    accessor: 'actions',
    className: "text-gray-500 text-sm md:w-1/10 text-center md:text-left pl-4 "
  }
]

export const ingredientsData = [
  {
    id: "1",
    icon: '🍌',
    iconBgColor: 'bg-yellow-100',
    name: 'Organic Bananas',
    unit: 'kg',
    unitPrice: 2.99,
    quantity: 1,
  },
  {
    id: "2",
    icon: '🍞',
    iconBgColor: 'bg-orange-100',
    name: 'Whole Wheat Bread',
    unit: 'kg',
    unitPrice: 2.99,
    quantity: 1,
  },
  {
    id: "3",
    icon: '🥚',
    iconBgColor: 'bg-amber-100',
    name: 'Free-Range Eggs',
    unit: 'kg',
    unitPrice: 0.99,
    quantity: 10,
  },
  {
    id: "4",
    icon: '🍃',
    iconBgColor: 'bg-green-100',
    name: 'Organic Baby Spinach',
    unit: 'kg',
    unitPrice: 4.45,
    quantity: 2,
  },
  {
    id: "5",
    icon: '🍃',
    iconBgColor: 'bg-green-100',
    name: 'Organic Baby Spinach',
    unit: 'kg',
    unitPrice: 4.45,
    quantity: 2,
  },
  {
    id: "6",
    icon: '🍃',
    iconBgColor: 'bg-green-100',
    name: 'Organic Baby Spinach',
    unit: 'kg',
    unitPrice: 4.45,
    quantity: 2,
  },
  {
    id: "7",
    icon: '🥚',
    iconBgColor: 'bg-amber-100',
    name: 'Free-Range Eggs',
    unit: 'kg',
    unitPrice: 0.99,
    quantity: 10,
  },
  {
    id: "8",
    icon: '🥚',
    iconBgColor: 'bg-amber-100',
    name: 'Free-Range Eggs',
    unit: 'kg',
    unitPrice: 0.99,
    quantity: 10,
  },
];

