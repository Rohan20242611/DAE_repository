// dashboard.js
import { 
    createItem, 
    getItems, 
    getItemById, 
    updateItem, 
    deleteItem 
  } from './firebase-crud.js';
  
  // DOM Elements
  document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      window.location.href = 'login.html';
      return;
    }
  
    // Setup the UI
    setupItemForm();
    loadAllItems();
  });
  
  // Setup the form for creating/updating items
  function setupItemForm() {
    const itemForm = document.getElementById('itemForm');
    
    // Handle form submission
    itemForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const itemId = itemForm.dataset.itemId;
      const itemName = document.getElementById('itemName').value;
      const itemDescription = document.getElementById('itemDescription').value;
      
      const itemData = {
        name: itemName,
        description: itemDescription
      };
      
      let result;
      
      // If itemId exists, update the item, otherwise create a new one
      if (itemId) {
        result = await updateItem('items', itemId, itemData);
        if (result.success) {
          itemForm.dataset.itemId = ''; // Clear the form ID
          itemForm.querySelector('button[type="submit"]').textContent = 'Add Item';
        }
      } else {
        result = await createItem('items', itemData);
      }
      
      // Show result status
      showStatus(result.message, result.success);
      
      // Reload the items list
      if (result.success) {
        itemForm.reset();
        loadAllItems();
      }
    });
    
    // Create a clear button to reset the form
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.textContent = 'Clear Form';
    clearButton.classList.add('clear-btn');
    clearButton.addEventListener('click', () => {
      itemForm.reset();
      itemForm.dataset.itemId = '';
      itemForm.querySelector('button[type="submit"]').textContent = 'Add Item';
    });
    
    itemForm.appendChild(clearButton);
  }
  
  // Load all items for the current user
  async function loadAllItems() {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '<p>Loading items...</p>';
    
    const result = await getItems('items');
    
    if (result.success && result.items.length > 0) {
      // Clear and rebuild the list
      itemsList.innerHTML = '';
      
      // Create a table for items
      const table = document.createElement('table');
      table.innerHTML = `
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      
      const tbody = table.querySelector('tbody');
      
      // Add each item to the table
      result.items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>
            <button class="edit-btn" data-id="${item.id}">Edit</button>
            <button class="delete-btn" data-id="${item.id}">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
      
      itemsList.appendChild(table);
      
      // Add event listeners to the edit and delete buttons
      addItemButtonListeners();
    } else if (result.success && result.items.length === 0) {
      itemsList.innerHTML = '<p>No items found. Add some using the form above.</p>';
    } else {
      itemsList.innerHTML = `<p class="error">${result.message}</p>`;
    }
  }
  
  // Add event listeners to item buttons
  function addItemButtonListeners() {
    // Edit button listeners
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const itemId = button.dataset.id;
        editItem(itemId);
      });
    });
    
    // Delete button listeners
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const itemId = button.dataset.id;
        if (confirm('Are you sure you want to delete this item?')) {
          deleteItemById(itemId);
        }
      });
    });
  }
  
  // Edit an item
  async function editItem(itemId) {
    const result = await getItemById('items', itemId);
    
    if (result.success) {
      const itemForm = document.getElementById('itemForm');
      const item = result.item;
      
      // Fill the form with item data
      document.getElementById('itemName').value = item.name;
      document.getElementById('itemDescription').value = item.description;
      
      // Set the form to update mode
      itemForm.dataset.itemId = itemId;
      itemForm.querySelector('button[type="submit"]').textContent = 'Update Item';
      
      // Scroll to the form
      itemForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      showStatus(result.message, false);
    }
  }
  
  // Delete an item
  async function deleteItemById(itemId) {
    const result = await deleteItem('items', itemId);
    
    showStatus(result.message, result.success);
    
    if (result.success) {
      loadAllItems();
    }
  }
  
  // Show status message
  function showStatus(message, isSuccess) {
    const statusDiv = document.getElementById('status');
    
    if (!statusDiv) {
      // Create status div if it doesn't exist
      const newStatusDiv = document.createElement('div');
      newStatusDiv.id = 'status';
      document.body.insertBefore(newStatusDiv, document.body.firstChild);
      showStatus(message, isSuccess); // Call again with the new div
      return;
    }
    
    statusDiv.textContent = message;
    statusDiv.className = isSuccess ? 'success' : 'error';
    
    // Clear the status message after 3 seconds
    setTimeout(() => {
      statusDiv.textContent = '';
      statusDiv.className = '';
    }, 3000);
  }
  
  // Logout function
  function logout() {
    sessionStorage.removeItem('userId');
    window.location.href = 'login.html';
  }
  
  // Add logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }