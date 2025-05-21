// firebase-crud.js
// Import Firebase services
import { auth, db } from './firebase.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// CREATE - Add a new item to the database
async function createItem(collectionName, data) {
  try {
    // Add user ID to the data to associate items with users
    const userId = sessionStorage.getItem('userId');
    const itemData = { ...data, userId, createdAt: new Date() };
    
    // Add a new document to the specified collection
    const docRef = await addDoc(collection(db, collectionName), itemData);
    console.log("Document written with ID: ", docRef.id);
    
    return {
      success: true,
      id: docRef.id,
      message: "Item created successfully"
    };
  } catch (error) {
    console.error("Error adding document: ", error);
    return {
      success: false,
      message: `Failed to create item: ${error.message}`
    };
  }
}

// READ - Get all items for the current user from a collection
async function getItems(collectionName) {
  try {
    const userId = sessionStorage.getItem('userId');
    
    // Create a query against the collection
    const q = query(collection(db, collectionName), where("userId", "==", userId));
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    
    // Map the documents to an array of items
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    
    return {
      success: true,
      items,
      count: items.length
    };
  } catch (error) {
    console.error("Error getting documents: ", error);
    return {
      success: false,
      message: `Failed to get items: ${error.message}`
    };
  }
}

// READ - Get a single item by ID
async function getItemById(collectionName, itemId) {
  try {
    const docRef = doc(db, collectionName, itemId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Check if the item belongs to the current user
      const userId = sessionStorage.getItem('userId');
      const itemData = docSnap.data();
      
      if (itemData.userId === userId) {
        return {
          success: true,
          item: { id: docSnap.id, ...itemData }
        };
      } else {
        return {
          success: false,
          message: "You don't have permission to access this item"
        };
      }
    } else {
      return {
        success: false,
        message: "Item not found"
      };
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return {
      success: false,
      message: `Failed to get item: ${error.message}`
    };
  }
}

// UPDATE - Update an existing item
async function updateItem(collectionName, itemId, data) {
  try {
    // Get the item to verify ownership
    const itemResult = await getItemById(collectionName, itemId);
    
    if (!itemResult.success) {
      return itemResult; // Return the error from getItemById
    }
    
    // Update the document
    const docRef = doc(db, collectionName, itemId);
    const updateData = { ...data, updatedAt: new Date() };
    await updateDoc(docRef, updateData);
    
    return {
      success: true,
      message: "Item updated successfully"
    };
  } catch (error) {
    console.error("Error updating document: ", error);
    return {
      success: false,
      message: `Failed to update item: ${error.message}`
    };
  }
}

// DELETE - Delete an item
async function deleteItem(collectionName, itemId) {
  try {
    // Get the item to verify ownership
    const itemResult = await getItemById(collectionName, itemId);
    
    if (!itemResult.success) {
      return itemResult; // Return the error from getItemById
    }
    
    // Delete the document
    await deleteDoc(doc(db, collectionName, itemId));
    
    return {
      success: true,
      message: "Item deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return {
      success: false,
      message: `Failed to delete item: ${error.message}`
    };
  }
}

// Export the CRUD functions for use in other files
export {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};