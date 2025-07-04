// Function to safely get initial messages from localStorage
export const getInitialMessages = (): any => {
  const item = localStorage.getItem('messages');
  const parsedItem = item ? JSON.parse(item) : [];
  return parsedItem;
};

export const paginate = (itemsPerPage: number, page: number, items: Recipe[] ) => {
    if (items.length === 0) {
      console.log('No items to display')
      return
    }
    const indexOfFirstItem = itemsPerPage * (page - 1) 
    const indexOfLastItem = itemsPerPage * page - 1 
    
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem + 1)
    return currentItems
  } 

  export const paginationPages = (items: any[], itemsPerPage: number ) => {
   
  const pages = Math.ceil(items.length / itemsPerPage);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);
  return pageNumbers

}