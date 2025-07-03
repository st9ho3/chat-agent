// Function to safely get initial messages from localStorage
export const getInitialMessages = (): any => {
  
    const item = localStorage.getItem('messages');
    const parsedItem = item ? JSON.parse(item) : [];
    return parsedItem;
};