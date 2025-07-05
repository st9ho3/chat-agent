/**
 * An array containing 10 example Recipe objects.
 * These recipes demonstrate various categories and ingredient combinations.
 */
export const recipes: Recipe[] = [
  {
    id: 'R001',
    title: 'Classic Tomato Bruschetta',
    totalCost: 3.50,
    ingredients: [
      { ingredient: 'Tomatoes', quantity: 300, unit: 'g' },
      { ingredient: 'Baguette', quantity: 1, unit: 'g' }, // Assuming 1 baguette as a 'unit'
      { ingredient: 'Garlic', quantity: 20, unit: 'g' },
      { ingredient: 'Olive Oil', quantity: 50, unit: 'ml' },
      { ingredient: 'Fresh Basil', quantity: 10, unit: 'g' }
    ],
    createdBy: 'Chef Maria',
    dateCreated: new Date('2025-06-20'),
    category: 'starter',
    imgPath: '/images/Classic Tomato Bruschetta.png'
  },
  {
    id: 'R002',
    title: 'Spaghetti Carbonara',
    totalCost: 8.75,
    ingredients: [
      { ingredient: 'Spaghetti', quantity: 400, unit: 'g' },
      { ingredient: 'Pancetta', quantity: 150, unit: 'g' },
      { ingredient: 'Eggs', quantity: 3, unit: 'g' }, // Assuming 'g' for eggs
      { ingredient: 'Pecorino Romano', quantity: 100, unit: 'g' },
      { ingredient: 'Black Pepper', quantity: 5, unit: 'g' }
    ],
    createdBy: 'Chef Antonio',
    dateCreated: new Date('2025-06-22'),
    category: 'main',
    imgPath: '/images/Spaghetti Carbonara.png'
  },
  {
    id: 'R003',
    title: 'New York Cheesecake',
    totalCost: 12.00,
    ingredients: [
      { ingredient: 'Cream Cheese', quantity: 900, unit: 'g' },
      { ingredient: 'Sugar', quantity: 300, unit: 'g' },
      { ingredient: 'Eggs', quantity: 4, unit: 'g' },
      { ingredient: 'Sour Cream', quantity: 200, unit: 'ml' },
      { ingredient: 'Graham Cracker Crumbs', quantity: 150, unit: 'g' },
      { ingredient: 'Butter', quantity: 80, unit: 'g' }
    ],
    createdBy: 'Baker Emily',
    dateCreated: new Date('2025-06-25'),
    category: 'dessert',
    imgPath: '/images/New York Cheesecake.png'
  },
  {
    id: 'R004',
    title: 'Chicken Stir-Fry',
    totalCost: 7.20,
    ingredients: [
      { ingredient: 'Chicken Breast', quantity: 500, unit: 'g' },
      { ingredient: 'Broccoli', quantity: 200, unit: 'g' },
      { ingredient: 'Carrots', quantity: 100, unit: 'g' },
      { ingredient: 'Bell Peppers', quantity: 150, unit: 'g' },
      { ingredient: 'Soy Sauce', quantity: 50, unit: 'ml' },
      { ingredient: 'Rice', quantity: 300, unit: 'g' }
    ],
    createdBy: 'Chef David',
    dateCreated: new Date('2025-06-28'),
    category: 'main',
    imgPath: '/images/Chicken Stir-Fry.png'
  },
  {
    id: 'R005',
    title: 'Caprese Salad Skewers',
    totalCost: 4.00,
    ingredients: [
      { ingredient: 'Cherry Tomatoes', quantity: 250, unit: 'g' },
      { ingredient: 'Fresh Mozzarella Balls', quantity: 200, unit: 'g' },
      { ingredient: 'Fresh Basil Leaves', quantity: 20, unit: 'g' },
      { ingredient: 'Balsamic Glaze', quantity: 30, unit: 'ml' }
    ],
    createdBy: 'Chef Sophia',
    dateCreated: new Date('2025-07-01'),
    category: 'starter',
    imgPath: '/images/Caprese Salad Skewers.png'
  },
  {
    id: 'R006',
    title: 'Lentil Soup',
    totalCost: 5.10,
    ingredients: [
      { ingredient: 'Brown Lentils', quantity: 200, unit: 'g' },
      { ingredient: 'Carrots', quantity: 100, unit: 'g' },
      { ingredient: 'Celery', quantity: 80, unit: 'g' },
      { ingredient: 'Onion', quantity: 100, unit: 'g' },
      { ingredient: 'Vegetable Broth', quantity: 1, unit: 'L' },
      { ingredient: 'Spinach', quantity: 100, unit: 'g' }
    ],
    createdBy: 'Chef Liam',
    dateCreated: new Date('2025-07-02'),
    category: 'main',
    imgPath: '/images/Lentil Soup.png'
  },
  {
    id: 'R007',
    title: 'Chocolate Lava Cakes',
    totalCost: 9.50,
    ingredients: [
      { ingredient: 'Dark Chocolate', quantity: 200, unit: 'g' },
      { ingredient: 'Butter', quantity: 100, unit: 'g' },
      { ingredient: 'Eggs', quantity: 2, unit: 'g' },
      { ingredient: 'Sugar', quantity: 50, unit: 'g' },
      { ingredient: 'Flour', quantity: 30, unit: 'g' }
    ],
    createdBy: 'Baker Olivia',
    dateCreated: new Date('2025-07-03'),
    category: 'dessert',
    imgPath: '/images/Chocolate Lava Cakes.png'
  },
  {
    id: 'R008',
    title: 'Shrimp Scampi with Linguine',
    totalCost: 15.00,
    ingredients: [
      { ingredient: 'Shrimp', quantity: 400, unit: 'g' },
      { ingredient: 'Linguine', quantity: 300, unit: 'g' },
      { ingredient: 'Garlic', quantity: 30, unit: 'g' },
      { ingredient: 'White Wine', quantity: 100, unit: 'ml' },
      { ingredient: 'Butter', quantity: 50, unit: 'g' },
      { ingredient: 'Parsley', quantity: 10, unit: 'g' }
    ],
    createdBy: 'Chef Noah',
    dateCreated: new Date('2025-07-04'),
    category: 'main',
    imgPath: '/images/Shrimp Scampi with Linguine.png'
  },
  {
    id: 'R009',
    title: 'Gazpacho',
    totalCost: 6.20,
    ingredients: [
      { ingredient: 'Cucumbers', quantity: 200, unit: 'g' },
      { ingredient: 'Red Bell Pepper', quantity: 150, unit: 'g' },
      { ingredient: 'Onion', quantity: 50, unit: 'g' },
      { ingredient: 'Tomato Juice', quantity: 500, unit: 'ml' },
      { ingredient: 'Olive Oil', quantity: 40, unit: 'ml' },
      { ingredient: 'Red Wine Vinegar', quantity: 20, unit: 'ml' }
    ],
    createdBy: 'Chef Isabel',
    dateCreated: new Date('2025-07-05'),
    category: 'starter',
    imgPath: '/images/Gazpacho.png'
  },
  {
    id: 'R010',
    title: 'Apple Crumble',
    totalCost: 7.80,
    ingredients: [
      { ingredient: 'Apples', quantity: 800, unit: 'g' },
      { ingredient: 'Oats', quantity: 100, unit: 'g' },
      { ingredient: 'Brown Sugar', quantity: 80, unit: 'g' },
      { ingredient: 'Flour', quantity: 60, unit: 'g' },
      { ingredient: 'Butter', quantity: 70, unit: 'g' },
      { ingredient: 'Cinnamon', quantity: 5, unit: 'g' }
    ],
    createdBy: 'Baker James',
    dateCreated: new Date('2025-07-06'),
    category: 'dessert',
    imgPath: '/images/Apple Crumble.png'
  },
  {
    id: 'R011',
    title: 'Shrimp Scampi with Linguine',
    totalCost: 15.00,
    ingredients: [
      { ingredient: 'Shrimp', quantity: 400, unit: 'g' },
      { ingredient: 'Linguine', quantity: 300, unit: 'g' },
      { ingredient: 'Garlic', quantity: 30, unit: 'g' },
      { ingredient: 'White Wine', quantity: 100, unit: 'ml' },
      { ingredient: 'Butter', quantity: 50, unit: 'g' },
      { ingredient: 'Parsley', quantity: 10, unit: 'g' }
    ],
    createdBy: 'Chef Noah',
    dateCreated: new Date('2025-07-04'),
    category: 'main',
    imgPath: '/images/Shrimp Scampi with Linguine.png'
  },
  {
    id: 'R012',
    title: 'Gazpacho',
    totalCost: 6.20,
    ingredients: [
      { ingredient: 'Cucumbers', quantity: 200, unit: 'g' },
      { ingredient: 'Red Bell Pepper', quantity: 150, unit: 'g' },
      { ingredient: 'Onion', quantity: 50, unit: 'g' },
      { ingredient: 'Tomato Juice', quantity: 500, unit: 'ml' },
      { ingredient: 'Olive Oil', quantity: 40, unit: 'ml' },
      { ingredient: 'Red Wine Vinegar', quantity: 20, unit: 'ml' }
    ],
    createdBy: 'Chef Isabel',
    dateCreated: new Date('2025-07-05'),
    category: 'starter',
    imgPath: '/images/Gazpacho.png'
  },
  {
    id: 'R013',
    title: 'Apple Crumble',
    totalCost: 7.80,
    ingredients: [
      { ingredient: 'Apples', quantity: 800, unit: 'g' },
      { ingredient: 'Oats', quantity: 100, unit: 'g' },
      { ingredient: 'Brown Sugar', quantity: 80, unit: 'g' },
      { ingredient: 'Flour', quantity: 60, unit: 'g' },
      { ingredient: 'Butter', quantity: 70, unit: 'g' },
      { ingredient: 'Cinnamon', quantity: 5, unit: 'g' }
    ],
    createdBy: 'Baker James',
    dateCreated: new Date('2025-07-06'),
    category: 'dessert',
    imgPath: '/images/Apple Crumble.png'
  }
];

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



////////////////////////////


export const ingredientsData = [
  {
    id: 1,
    icon: '🍌',
    iconBgColor: 'bg-yellow-100',
    name: 'Organic Bananas',
    
    unitPrice: 2.99,
    quantity: 1,
  },
  {
    id: 2,
    icon: '🍞',
    iconBgColor: 'bg-orange-100',
    name: 'Whole Wheat Bread',
    
    unitPrice: 2.99,
    quantity: 1,
  },
  {
    id: 3,
    icon: '🥚',
    iconBgColor: 'bg-amber-100',
    name: 'Free-Range Eggs',
    
    unitPrice: 0.99,
    quantity: 10,
  },
  {
    id: 4,
    icon: '🍃',
    iconBgColor: 'bg-green-100',
    name: 'Organic Baby Spinach',
    
    unitPrice: 4.45,
    quantity: 2,
  },
  {
    id: 5,
    icon: '🍃',
    iconBgColor: 'bg-green-100',
    name: 'Organic Baby Spinach',
    
    unitPrice: 4.45,
    quantity: 2,
  },
  {
    id: 6,
    icon: '🍃',
    iconBgColor: 'bg-green-100',
    name: 'Organic Baby Spinach',
    
    unitPrice: 4.45,
    quantity: 2,
  },
  {
    id: 7,
    icon: '🥚',
    iconBgColor: 'bg-amber-100',
    name: 'Free-Range Eggs',
    
    unitPrice: 0.99,
    quantity: 10,
  },
  {
    id: 8,
    icon: '🥚',
    iconBgColor: 'bg-amber-100',
    name: 'Free-Range Eggs',
    
    unitPrice: 0.99,
    quantity: 10,
  },
];

