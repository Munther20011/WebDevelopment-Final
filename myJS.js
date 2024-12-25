// Function to load modules dynamically

// Function to Load Modules Dynamically
function loadModule(module) {
    const content = document.getElementById('content');
    content.innerHTML = ""; // Clear content area

    switch (module) {
        case 'supplier':
            loadSupplierManagement();
            break;
        case 'packaging':
            loadProductCategorization();
            break;
        case 'sales':
          loadSalesManagement();
            break;
        case 'financial':
          loadFinancialAnalysis();
            break;
        case "inventory":
            loadInventoryManagement()
            
            break
        case 'report':
            loadComprehensiveReportModule();
            break;
        default:
            content.innerHTML = `<p>Module not found!</p>`;
    }
}
// Farmers and Purchases Data
// Farmers and Purchases Data
// Farmers and Purchases Data
let farmers = []; // Farmer profiles
let purchases = [
    {
        purchaseId: "P001",
        farmerId: "F123",
        name: "Ali",
        date: "2024-01-01",
        quantity: 100,
        pricePerKg: 5,
        totalCost: 500
    },
    {
        purchaseId: "P002",
        farmerId: "F124",
        name: "Mohammed",
        date: "2024-01-03",
        quantity: 200,
        pricePerKg: 6,
        totalCost: 1200
    },
    {
        purchaseId: "P003",
        farmerId: "F125",
        name: "Ezz",
        date: "2024-01-02",
        quantity: 150,
        pricePerKg: 4,
        totalCost: 600
    }
];
 // Purchase records

// Load Supplier Management Module
function loadSupplierManagement() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Supplier Management</h2>
        <button onclick="addFarmerPrompt()">Add Farmer</button>
        <button onclick="addPurchasePrompt()">Add Purchase</button>
        <button onclick="summarizePurchases()">Summarize Purchases</button>
        <button onclick="generateExpenseReport()">Generate Expense Report</button>
        <button onclick="exportFarmers()">Export Farmers</button>
        <button onclick="loadSortOptions()">sort Purchases</button>

        <input type="text" id="searchInput" placeholder="Search Farmers..." oninput="filterFarmers()">
        <div id="farmerList"></div>
        <div id="purchaseList"></div>
    `;
    displayFarmers();
    displayPurchases();
}

// Supplier Management Module (Integration with Farmers Module)
// Farmers and Purchases Data
 // Purchase records

// Load Supplier Management Module

// Add Farmer Prompt
function addFarmerPrompt() {
    const id = prompt("Enter Farmer ID (unique):");
    if (farmers.some(farmer => farmer.id === id)) {
        alert("Farmer ID already exists!");
        return;
    }
    const name = prompt("Enter Farmer Name:");
    const contact = prompt("Enter Contact Details (phone, email):");
    const location = prompt("Enter Location (address, region):");
    if (id && name && contact && location) {
        farmers.push({ id, name, contact, location });
        displayFarmers();
    } else {
        alert("All fields are required!");
    }
}

// Display Farmers
function displayFarmers() {
    const farmerList = document.getElementById('farmerList');
    farmerList.innerHTML = "<h3>Farmer Profiles</h3>";
    if (farmers.length === 0) {
        farmerList.innerHTML += `<p>No farmers available. Add some farmers!</p>`;
    }
    farmers.forEach(farmer => {
        farmerList.innerHTML += `
            <div class="box">
                <p><strong>ID:</strong> ${farmer.id}</p>
                <p><strong>Name:</strong> ${farmer.name}</p>
                <p><strong>Contact:</strong> ${farmer.contact}</p>
                <p><strong>Location:</strong> ${farmer.location}</p>
                <button onclick="updateFarmer('${farmer.id}')">Update</button>
                <button onclick="deleteFarmer('${farmer.id}')">Delete</button>
            </div>
        `;
    });
}

// Filter Farmers
function filterFarmers() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredFarmers = farmers.filter(farmer => 
        farmer.name.toLowerCase().includes(query) || farmer.location.toLowerCase().includes(query)
    );

    const farmerList = document.getElementById('farmerList');
    farmerList.innerHTML = "<h3>Farmer Profiles</h3>";
    filteredFarmers.forEach(farmer => {
        farmerList.innerHTML += `
            <div class="box">
                <p><strong>ID:</strong> ${farmer.id}</p>
                <p><strong>Name:</strong> ${farmer.name}</p>
                <p><strong>Location:</strong> ${farmer.location}</p>
            </div>
        `;
    });
}

// Delete Farmer
function deleteFarmer(id) {
    farmers = farmers.filter(farmer => farmer.id !== id);
    purchases = purchases.filter(purchase => purchase.farmerId !== id); // Remove related purchases
    displayFarmers();
    displayPurchases();
}
// Function to Update Farmer Details
function updateFarmer(farmerId) {
    const farmer = farmers.find(f => f.id === farmerId);
    if (!farmer) {
        alert("Farmer not found!");
        return;
    }

    const newName = prompt("Enter new name:", farmer.name);
    const newContact = prompt("Enter new contact:", farmer.contact || ""); // Default to empty if undefined
    const newLocation = prompt("Enter new location:", farmer.location);

    if (newName) farmer.name = newName;
    if (newContact) farmer.contact = newContact; // Update contact
    if (newLocation) farmer.location = newLocation;

    alert("Farmer details updated successfully!");
    displayFarmers();
}



// Add Purchase Prompt
function addPurchasePrompt() {
    const farmerId = prompt("Enter Farmer ID (linked to Farmers):");
    const farmerExists = farmers.some(farmer => farmer.id === farmerId);
    if (!farmerExists) {
        alert("Farmer ID not found! Add the farmer first.");
        return;
    }

    const date = prompt("Enter Date of Purchase (YYYY-MM-DD):");
    const quantity = parseFloat(prompt("Enter Quantity Purchased (kg):"));
    const pricePerKg = parseFloat(prompt("Enter Price per Kilogram:"));

    if (!date || isNaN(quantity) || isNaN(pricePerKg) || quantity <= 0 || pricePerKg <= 0) {
        alert("Invalid input! Please provide valid details.");
        return;
    }

    const purchaseId = `P${Date.now()}`; // Generate a unique ID for purchase
    const totalCost = (quantity * pricePerKg).toFixed(2);
    
    const name =farmers.find(farmer=>farmer.id===farmerId).name
    console.log(name)
    

    purchases.push({ purchaseId, farmerId,name, date, quantity, pricePerKg, totalCost });
    
    // Log the updated purchases array
    console.log("Adding purchase:", purchases);

    alert("Purchase added successfully!");
    displayPurchases(purchases); // Pass the updated purchases array
}

function loadSortOptions() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>View and Sort Records</h2>
        <button onclick="sortPurchases('latest')">Latest First</button>
        <button onclick="sortPurchases('earliest')">Earliest First</button>
        <button onclick="sortPurchases('quantityHigh')">Quantity (High-Low)</button>
        <button onclick="sortPurchases('quantityLow')">Quantity (Low-High)</button>
        <button onclick="sortPurchases('farmer')">Farmer Name</button>
        <button onclick="filterByTimePeriod()">Time Period</button>
        <div id="purchaseList"></div>
    `;

    displayPurchases(purchases);
}
function sortPurchases(criteria) {
    let sorted = [...purchases];

    switch (criteria) {
        case 'latest':
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); // Latest First
            break;
        case 'earliest':
            sorted.sort((a, b) => new Date(a.date) - new Date(b.date)); // Earliest First
            break;
        case 'quantityHigh':
            sorted.sort((a, b) => b.quantity - a.quantity); // Quantity High to Low
            break;
        case 'quantityLow':
            sorted.sort((a, b) => a.quantity - b.quantity); // Quantity Low to High
            break;
            case 'farmer':
                filterByFarmer(); // Call the new farmer filtering function
                return;
        
    }

    displayPurchases(sorted);
}
function filterByTimePeriod() {
    const startDate = prompt("Enter Start Date (YYYY-MM-DD):");
    const endDate = prompt("Enter End Date (YYYY-MM-DD):");

    if (!startDate || !endDate) {
        alert("Invalid date input.");
        return;
    }

    const filtered = purchases.filter(purchase => {
        const purchaseDate = new Date(purchase.date);
        return purchaseDate >= new Date(startDate) && purchaseDate <= new Date(endDate);
    });

    displayPurchases(filtered);
}
function filterByFarmer() {
    const farmerName = prompt("Enter the farmer's name:").trim();
    console.log(purchases)
    console.log(farmers)
    if (!farmerName) {
        alert("Farmer name cannot be empty.");
        return;
    }

    const filtered = purchases.filter(purchase =>
        purchase.name.toLowerCase() === farmerName.toLowerCase()
    );

    if (filtered.length === 0) {
        alert(`No purchases found for farmer: ${farmerName}`);
    }
    console.log(filtered)
    

    displayPurchases(filtered);
}


// Display Purchases
function displayPurchases(data = purchases) {
    const purchaseList = document.getElementById("purchaseList");

    if (!purchaseList) {
        console.error("Element with ID 'purchaseList' not found.");
        return;
    }

    purchaseList.innerHTML = "<h3>Purchase Records</h3>";

    if (data.length === 0) {
        purchaseList.innerHTML += "<p>No purchase records found. Add new purchases!</p>";
        return;
    }

    purchaseList.innerHTML += data.map(purchase => `
        <div class="box">
            <p><strong>Purchase ID:</strong> ${purchase.purchaseId}</p>
            <p><strong>Farmer ID:</strong> ${purchase.farmerId}</p>
            <p><strong>Date:</strong> ${purchase.date}</p>
            <p><strong>Quantity:</strong> ${purchase.quantity} kg</p>
            <p><strong>Price/Kg:</strong> $${purchase.pricePerKg}</p>
            <p><strong>Total Cost:</strong> $${purchase.totalCost}</p>
        </div>
    `).join('');
}

// Summarize Purchases
function summarizePurchases() {
    const summary = purchases.reduce((acc, purchase) => {
        acc.totalQuantity += purchase.quantity;
        acc.totalCost += parseFloat(purchase.totalCost);
        return acc;
    }, { totalQuantity: 0, totalCost: 0 });

    alert(`Purchase Summary:
- Total Quantity: ${summary.totalQuantity} kg
- Total Cost: $${summary.totalCost.toFixed(2)}`);
}



// Generate Expense Report
function generateExpenseReport() {
    const period = prompt("Enter Time Period (daily, weekly, monthly):").toLowerCase();
    if (!["daily", "weekly", "monthly"].includes(period)) {
        alert("Invalid time period! Use 'daily', 'weekly', or 'monthly'.");
        return;
    }

    const report = purchases.reduce((acc, purchase) => {
        const purchaseDate = new Date(purchase.date);
        const today = new Date();

        let valid = false;
        if (period === "daily" && purchaseDate.toDateString() === today.toDateString()) valid = true;
        if (period === "weekly" && isSameWeek(purchaseDate, today)) valid = true;
        if (period === "monthly" && purchaseDate.getMonth() === today.getMonth() && purchaseDate.getFullYear() === today.getFullYear()) valid = true;

        if (valid) {
            acc.totalQuantity += purchase.quantity;
            acc.totalCost += parseFloat(purchase.totalCost);
        }
        return acc;
    }, { totalQuantity: 0, totalCost: 0 });

    alert(`Expense Report (${period.charAt(0).toUpperCase() + period.slice(1)}):
- Total Quantity: ${report.totalQuantity} kg
- Total Cost: $${report.totalCost.toFixed(2)}`);
}

// Helper: Check if two dates are in the same week
function isSameWeek(date1, date2) {
    const startOfWeek1 = new Date(date1);
    startOfWeek1.setDate(date1.getDate() - date1.getDay());

    const startOfWeek2 = new Date(date2);
    startOfWeek2.setDate(date2.getDate() - date2.getDay());

    return startOfWeek1.toDateString() === startOfWeek2.toDateString();
}

// Export Farmers to CSV
function exportFarmers() {
    if (farmers.length === 0) {
        alert("No farmers to export!");
        return;
    }
    const csvContent = "data:text/csv;charset=utf-8,"
        + "Farmer ID,Name,Contact,Location\n"
        + farmers.map(f => `${f.id},${f.name},${f.contact},${f.location}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "farmers_data.csv");
    document.body.appendChild(link);
    link.click();
}
  // Farmers, Purchases, and Product Categories Data
// Farmers, Purchases, and Product Categories Data
// Product Categories Data
let products = []; // Product list
const categories = [
    { id: 1, name: "Small", weight: 100, description: "100g" },
    { id: 2, name: "Medium", weight: 250, description: "250g" },
    { id: 3, name: "Large", weight: 500, description: "500g" },
    { id: 4, name: "Extra Large", weight: 1000, description: "1kg" },
    { id: 5, name: "Family Pack", weight: 2000, description: "2kg" },
    { id: 6, name: "Bulk Pack", weight: 5000, description: "5kg" },
    { id: 7, name: "Premium", weight: "custom", description: "Custom Weight" }
];

// Function to load Product Categorization Module
function loadProductCategorization() {
  const content = document.getElementById('content');
  console.log(content); // Debug: Check if the content div is found
  content.innerHTML = `
      <h2>Product Categorization Module</h2>
      <p>Manage product categories and packaging.</p>
      <button onclick="addProductPrompt()">Add Product</button>
      <button onclick="showProductSummary()">Show Summary</button>
      <div id="productList"></div>
  `;
  displayProducts();
}

// Function to Add Product
function addProductPrompt() {
  const productName = prompt("Enter Product Name (e.g., Blueberry Batch):");
  if (!productName) {
      alert("Product name is required!");
      return;
  }

  const category = selectCategoryPrompt();
  if (!category) return;

  let weight;
  if (category.weight === "custom") {
      weight = parseFloat(prompt("Enter Custom Weight (grams):"));
      if (isNaN(weight) || weight <= 0) {
          alert("Invalid weight for custom category.");
          return;
      }
  } else {
      weight = category.weight;
  }

  products.push({
      id: `P${Date.now()}`,
      name: productName,
      category: category.name,
      weight: weight
  });

  displayProducts();
}

// Prompt to Select Category
function selectCategoryPrompt() {
  let message = "Select a Category:\n";
  categories.forEach(cat => {
      message += `${cat.id}. ${cat.name} (${cat.description})\n`;
  });

  const choice = parseInt(prompt(message));
  return categories.find(cat => cat.id === choice);
}

// Display Products
function displayProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = "<h3>Products List</h3>";

  if (products.length === 0) {
      productList.innerHTML += "<p>No products available.</p>";
      return;
  }

  productList.innerHTML = products.map(product => `
      <div class="box">
          <p><strong>Name:</strong> ${product.name}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Weight:</strong> ${product.weight}g</p>
      </div>
  `).join('');
}

// Show Product Summary
function showProductSummary() {
    console.log(products)
  const summary = products.reduce((acc, product) => {
      acc[product.name] = (acc[product.name] || 0) + 1;
      return acc;
  }, {});
  console.log(summary)

  let message = "Product Summary:\n";
  for (const [category, count] of Object.entries(summary)) {
      message += `- ${category}: ${count} product(s)\n`;
  }

  alert(message);
}
// Pricing Structure Data
const pricingStructure = {
  Small: 5.0,          // Default price per kg for Small category
  Medium: 4.5,
  Large: 4.0,
  "Extra Large": 3.8,
  "Family Pack": 3.5,
  "Bulk Pack": 3.0,
  Premium: 6.0         // Default price per kg for Premium
};

// Function to load Product Categorization and Pricing Module
function loadProductCategorization() {
  const content = document.getElementById('content');
  content.innerHTML = `
      <h2>Product Categorization and Pricing Module</h2>
      <p>Manage product categories, packaging, and pricing.</p>
      <button onclick="addProductPrompt()">Add Product</button>
      <button onclick="updatePricingPrompt()">Update Pricing Structure</button>
      <button onclick="showProductSummary()">Show Summary</button>
      <div id="productList"></div>
      <div id="pricingList"></div>
   
  `;
  displayProducts();
  displayPricingStructure();
 
  
}

// Display Pricing Structure
function displayPricingStructure() {
  const pricingList = document.getElementById('pricingList');
  pricingList.innerHTML = "<h3>Pricing Structure</h3>";

  pricingList.innerHTML += Object.entries(pricingStructure)
      .map(([category, price]) => `
          <div class="box">
              <p><strong>Category:</strong> ${category}</p>
              <p><strong>Price per Kilogram:</strong> $${price.toFixed(2)}</p>
          </div>
      `).join('');
}

// Prompt to Update Pricing Structure
function updatePricingPrompt() {
  let message = "Update Pricing Structure:\n";
  Object.keys(pricingStructure).forEach((key, index) => {
      message += `${index + 1}. ${key} - Current Price: $${pricingStructure[key]}/kg\n`;
  });

  const choice = parseInt(prompt(message + "\nSelect a category number to update the price:"));
  const categories = Object.keys(pricingStructure);

  if (choice < 1 || choice > categories.length || isNaN(choice)) {
      alert("Invalid category selection.");
      return;
  }

  const selectedCategory = categories[choice - 1];
  const newPrice = parseFloat(prompt(`Enter new price per kilogram for ${selectedCategory}:`));

  if (isNaN(newPrice) || newPrice <= 0) {
      alert("Invalid price entered. Please enter a positive number.");
      return;
  }

  pricingStructure[selectedCategory] = newPrice;
  alert(`Price for ${selectedCategory} updated to $${newPrice.toFixed(2)} per kilogram.`);
  displayPricingStructure();
}

// Add Product Prompt (Integrated with Pricing)
function addProductPrompt() {
  const productName = prompt("Enter Product Name (e.g., Blueberry Batch):");
  if (!productName) {
      alert("Product name is required!");
      return;
  }

  const category = selectCategoryPrompt();
  if (!category) return;

  let weight;
  if (category.weight === "custom") {
      weight = parseFloat(prompt("Enter Custom Weight (grams):"));
      if (isNaN(weight) || weight <= 0) {
          alert("Invalid weight for custom category.");
          return;
      }
  } else {
      weight = category.weight;
  }

  const categoryPrice = pricingStructure[category.name] || 6.0; // Default to Premium pricing
  const totalPrice = ((weight / 1000) * categoryPrice).toFixed(2);

  products.push({
      id: `P${Date.now()}`,
      name: productName,
      category: category.name,
      weight: weight,
      pricePerKg: categoryPrice,
      totalPrice: totalPrice
  });

  displayProducts();
}

// Display Products with Pricing



// Function to Load Inventory Tracking Module
function loadInventoryManagement() {
  const content = document.getElementById('content');
  content.innerHTML = `
       <h2>Inventory Management Module</h2>
        <p>Monitor and manage the stock levels of blueberries across different categories.</p>
        <button onclick="viewInventory()">View Inventory</button>
        <button onclick="updateInventoryPrompt()">Update Inventory</button>
        <button onclick="checkRestockAlerts()">Restock Alerts</button>
        <button onclick="generateInventoryReport()">Generate Inventory Report</button>
        <button onclick="analyzeSalesTrends()">Analyze Sales Trends</button>
        <button onclick="recommendStockAdjustments()">Recommend Stock Adjustments</button>
        <button onclick="checkReorderAlerts()">Check Reorder Alerts</button>
        <button onclick="sendRestockReminders()">Send Restock Reminders</button>
        <button onclick="showInventorySummaryOptions()">Inventory Summaries</button>
        <button onclick="analyzeTurnoverRates()">Analyze Turnover Rates</button>
         <button onclick="checkStockLevels()">Check Stock Levels</button>
        <div id="forecastingDetails"></div>
        <div id="inventoryList"></div>
  `;
  displayInventory();
  
}

// Example Inventory Data

// Sales Management Data
let orders = [];

// Function to Load Sales Management Module
function loadSalesManagement() {
  const content = document.getElementById('content');
  content.innerHTML = `
      <h2>Sales Management Module</h2>
      <p>Log new orders, update statuses, view order details, and track revenue.</p>
      <button onclick="addNewOrder()">Log New Order</button>
      <button onclick="updateOrderStatus()">Update Order Status</button>
      <button onclick="filterOrders()">Search and Filter Orders</button>
      <button onclick="displayAllOrders()">View All Orders</button>
      <button onclick="loadRevenueTracking()">Track Revenue</button>
      <button onclick="loadSalesReports()">Sales Reports</button> <!-- New Button -->
      <div id="orderList"></div>
  `;
  displayAllOrders();
}


// Function to Add a New Order
function addNewOrder() {
    const orderID = `O${Date.now()}`; // Generate unique Order ID
    const customerName = prompt("Enter Customer Name:");
    const contact = prompt("Enter Customer Contact:");
    const address = prompt("Enter Shipping Address:");
    const category = prompt("Enter Product Category (e.g., Small, Medium, Large):");
    const quantity = parseInt(prompt("Enter Quantity Ordered:"));
    const unitPrice = parseFloat(prompt("Enter Unit Price:"));

    if (!customerName || !contact || !address || !category || isNaN(quantity) || isNaN(unitPrice)) {
        alert("All fields are required and must be valid!");
        return;
    }

    const totalPrice = (quantity * unitPrice).toFixed(2);
    const orderStatus = "Pending";

    orders.push({
        orderID,
        customerName,
        contact,
        address,
        category,
        quantity,
        unitPrice,
        totalPrice,
        orderStatus
    });

    alert(`Order ${orderID} logged successfully!`);
    displayAllOrders();
}

// Function to Update Order Status
function updateOrderStatus() {
    const orderID = prompt("Enter Order ID to update status:");
    const order = orders.find(o => o.orderID === orderID);

    if (!order) {
        alert("Order not found. Please check the Order ID.");
        return;
    }

    const newStatus = prompt("Enter new status (Pending, Processed, Shipped, Delivered):");
    if (!["Pending", "Processed", "Shipped", "Delivered"].includes(newStatus)) {
        alert("Invalid status. Please enter a valid status.");
        return;
    }

    order.orderStatus = newStatus;
    alert(`Order ${orderID} status updated to ${newStatus}.`);
    displayAllOrders();
}

// Function to Filter and Search Orders
function filterOrders() {
    const criteria = prompt("Filter by (status, customer, category):");
    const value = prompt(`Enter value for ${criteria}:`);

    let filteredOrders = [];
    switch (criteria.toLowerCase()) {
        case "status":
            filteredOrders = orders.filter(o => o.orderStatus.toLowerCase() === value.toLowerCase());
            break;
        case "customer":
            filteredOrders = orders.filter(o => o.customerName.toLowerCase().includes(value.toLowerCase()));
            break;
        case "category":
            filteredOrders = orders.filter(o => o.category.toLowerCase() === value.toLowerCase());
            break;
        default:
            alert("Invalid filter criteria.");
            return;
    }

    displayOrders(filteredOrders);
}

// Function to Display All Orders
function displayAllOrders() {
    displayOrders(orders);
}

// Generic Function to Display Orders
function displayOrders(orderList) {
    const orderListDiv = document.getElementById('orderList');
    orderListDiv.innerHTML = "<h3>Order List</h3>";

    if (orderList.length === 0) {
        orderListDiv.innerHTML += "<p>No orders to display.</p>";
        return;
    }

    orderListDiv.innerHTML += orderList.map(order => `
        <div class="box" style="border: 1px solid #ccc; padding: 10px; margin: 5px;">
            <p><strong>Order ID:</strong> ${order.orderID}</p>
            <p><strong>Customer:</strong> ${order.customerName} (${order.contact})</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Product Category:</strong> ${order.category}</p>
            <p><strong>Quantity:</strong> ${order.quantity}</p>
            <p><strong>Unit Price:</strong> $${order.unitPrice}</p>
            <p><strong>Total Price:</strong> $${order.totalPrice}</p>
            <p><strong>Status:</strong> ${order.orderStatus}</p>
        </div>
    `).join('');
}
// Function to Calculate Total Revenue
function calculateTotalRevenue() {
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);
  alert(`💰 Total Revenue: $${totalRevenue.toFixed(2)}`);
}

// Function to Calculate Revenue by Category
function revenueByCategory() {
  const revenueByCategory = {};

  orders.forEach(order => {
      if (!revenueByCategory[order.category]) {
          revenueByCategory[order.category] = 0;
      }
      revenueByCategory[order.category] += parseFloat(order.totalPrice);
  });

  let message = "📊 Revenue by Product Category:\n";
  for (const [category, revenue] of Object.entries(revenueByCategory)) {
      message += `- ${category}: $${revenue.toFixed(2)}\n`;
  }

  alert(message);
}
function loadRevenueTracking() {
  const content = document.getElementById('content');
  content.innerHTML = `
      <h2>Revenue Tracking</h2>
      <p>Automatically calculate and analyze revenue data.</p>
      <button onclick="calculateTotalRevenue()">Total Revenue</button>
      <button onclick="revenueByCategory()">Revenue by Category</button>
      <button onclick="displayAllOrders()">View All Orders</button>
      <div id="orderList"></div>
  `;
  displayAllOrders();
}
// Function to Generate Sales Report
function generateSalesReport() {
  if (orders.length === 0) {
      alert("No sales data available.");
      return;
  }

  const unitsSoldByCategory = {};
  const revenueByCategory = {};
  let overallRevenue = 0;

  // Aggregate data
  orders.forEach(order => {
      const category = order.category;
      const revenue = parseFloat(order.totalPrice);

      // Units Sold
      if (!unitsSoldByCategory[category]) unitsSoldByCategory[category] = 0;
      unitsSoldByCategory[category] += order.quantity;

      // Revenue Per Category
      if (!revenueByCategory[category]) revenueByCategory[category] = 0;
      revenueByCategory[category] += revenue;

      // Overall Revenue
      overallRevenue += revenue;
  });

  // Display Sales Report
  let reportMessage = "📊 Sales Report:\n";
  reportMessage += "Units Sold by Category:\n";
  for (const [category, units] of Object.entries(unitsSoldByCategory)) {
      reportMessage += `- ${category}: ${units} units\n`;
  }
  reportMessage += "\nRevenue by Category:\n";
  for (const [category, revenue] of Object.entries(revenueByCategory)) {
      reportMessage += `- ${category}: $${revenue.toFixed(2)}\n`;
  }
  reportMessage += `\nOverall Revenue: $${overallRevenue.toFixed(2)}`;

  alert(reportMessage);

  // Optionally, display as visual charts
  displaySalesCharts(unitsSoldByCategory, revenueByCategory);
}

// Function to Display Visual Charts (Bar Charts)
function displaySalesCharts(unitsSold, revenue) {
  const canvasContainer = document.getElementById('salesChartContainer');
  canvasContainer.innerHTML = `
      <h3>Sales Trends</h3>
      <canvas id="unitsSoldChart" width="400" height="200"></canvas>
      <canvas id="revenueChart" width="400" height="200"></canvas>
  `;

  // Prepare Chart.js
  const ctxUnits = document.getElementById('unitsSoldChart').getContext('2d');
  new Chart(ctxUnits, {
      type: 'bar',
      data: {
          labels: Object.keys(unitsSold),
          datasets: [{
              label: 'Units Sold',
              data: Object.values(unitsSold),
              backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }]
      }
  });

  const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
  new Chart(ctxRevenue, {
      type: 'bar',
      data: {
          labels: Object.keys(revenue),
          datasets: [{
              label: 'Revenue',
              data: Object.values(revenue),
              backgroundColor: 'rgba(153, 102, 255, 0.6)'
          }]
      }
  });
}

// Function to Export Sales Report as CSV
function exportSalesReportAsCSV() {
  if (orders.length === 0) {
      alert("No sales data available to export.");
      return;
  }

  const csvHeader = "Order ID,Customer Name,Category,Quantity,Unit Price,Total Price,Order Status\n";
  const csvRows = orders.map(order =>
      `${order.orderID},${order.customerName},${order.category},${order.quantity},${order.unitPrice},${order.totalPrice},${order.orderStatus}`
  );

  const csvContent = "data:text/csv;charset=utf-8," + csvHeader + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "sales_report.csv");
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
}

// Function to Load Sales Report UI
function loadSalesReports() {
  const content = document.getElementById('content');
  content.innerHTML = `
      <h2>Sales Reports</h2>
      <p>Generate detailed sales reports and view visual trends.</p>
      <button onclick="generateSalesReport()">Generate Sales Report</button>
      <button onclick="exportSalesReportAsCSV()">Export Report as CSV</button>
      <div id="salesChartContainer"></div>
  `;
}
// Financial Data
let expenses = 0; // Total expenses from blueberry purchases
const taxRate = 0.15; // Example: 15% tax rate

// Function to Load Financial Analysis Module
function loadFinancialAnalysis() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Financial Analysis Module</h2>
        <p>Calculate overall income, expenses, taxes, and net profit.</p>
        <button onclick="calculateFinancialSummary()">View Financial Summary</button>
        <div id="financialSummary"></div>
    `;
   
}

// Function to Log Expenses


// Function to Calculate Financial Summary
function calculateFinancialSummary() {
    if (orders.length === 0) {
        alert("No sales data available to generate financial summary.");
        return;
    }

    // Calculate Total Income
    const totalIncome = orders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);

    // Calculate Taxes
    const taxes = totalIncome * taxRate;

    // Calculate Net Profit
    const netProfit = totalIncome - expenses - taxes;

    // Display Financial Summary
    const financialSummaryDiv = document.getElementById('financialSummary');
    financialSummaryDiv.innerHTML = `
        <h3>Financial Summary</h3>
        <p><strong>Total Income:</strong> $${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> $${expenses.toFixed(2)}</p>
        <p><strong>Taxes (15%):</strong> $${taxes.toFixed(2)}</p>
        <p><strong>Net Profit:</strong> $${netProfit.toFixed(2)}</p>
    `;
}
function integrateAlertsWithInventory() {
    // Example inventory data for testing
    inventory = [
        {
            itemId: 'F001',
            category: 'Fresh',
            quantityAvailable: 20,
            reorderLevel: 50,
            restockDate: '2024-12-25',
            storageLocation: 'Warehouse A - Bin 1'
        },
        {
            itemId: 'F002',
            category: 'Frozen',
            quantityAvailable: 70,
            reorderLevel: 30,
            restockDate: '2024-12-22',
            storageLocation: 'Warehouse B - Bin 2'
        },
        {
            itemId: 'F003',
            category: 'Organic',
            quantityAvailable: 10,
            reorderLevel: 20,
            restockDate: '2024-12-23',
            storageLocation: 'Warehouse C - Bin 3'
        }
        
    ];

    // Automatically check alerts on module load
    checkReorderAlerts();
    sendRestockReminders();
    
    
}

// Initialize the inventory and alerts module
integrateAlertsWithInventory();
function viewInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = "<h3>Inventory List</h3>";

    if (inventory.length === 0) {
        inventoryList.innerHTML += "<p>No inventory data available.</p>";
        return;
    }

    inventory.forEach(item => {
        inventoryList.innerHTML += `
            <div class="box">
                <p><strong>Item ID:</strong> ${item.itemId}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Quantity Available:</strong> ${item.quantityAvailable} kg</p>
                <p><strong>Reorder Level:</strong> ${item.reorderLevel} kg</p>
                <p><strong>Restock Date:</strong> ${item.restockDate}</p>
                <p><strong>Storage Location:</strong> ${item.storageLocation}</p>
            </div>
        `;
    });
}
function updateInventoryPrompt() {
    const itemId = prompt("Enter Item ID to update:");
    const item = inventory.find(i => i.itemId === itemId);

    if (!item) {
        alert("Item ID not found.");
        return;
    }

    const newQuantity = parseInt(prompt("Enter new quantity (in kg):", item.quantityAvailable));
    const newRestockDate = prompt("Enter new restock date (YYYY-MM-DD):", item.restockDate);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
        item.quantityAvailable = newQuantity;
    }

    if (newRestockDate) {
        item.restockDate = newRestockDate;
    }

    alert("Inventory updated successfully.");
    viewInventory();
}
function checkRestockAlerts() {
    const alerts = inventory.filter(item => item.quantityAvailable <= item.reorderLevel);

    if (alerts.length === 0) {
        alert("All stock levels are above the reorder level.");
        return;
    }

    let message = "⚠️ Restock Alerts:\n";
    alerts.forEach(item => {
        message += `- ${item.category}: Only ${item.quantityAvailable} kg left (Reorder Level: ${item.reorderLevel} kg)\n`;
    });

    alert(message);
}
function generateInventoryReport() {
    let report = "📊 Inventory Report:\n";
    inventory.forEach(item => {
        report += `
        Category: ${item.category}\n
        Quantity Available: ${item.quantityAvailable} kg\n
        Reorder Level: ${item.reorderLevel} kg\n
        Restock Date: ${item.restockDate}\n
        Storage Location: ${item.storageLocation}\n
        ---------------------------\n`;
    });

    alert(report);
}
// Inventory Tracking Data
let inventoryTracking = [
    {
        category: "Small",
        stockLevel: 1000,
        restockAlert: 200
    },
    {
        category: "Medium",
        stockLevel: 800,
        restockAlert: 150
    },
    {
        category: "Large",
        stockLevel: 500,
        restockAlert: 100
    }
];
// Sales Data for Demand Forecasting
let salesData = [
    { category: "Fresh", date: "2024-01-01", quantity: 50 },
    { category: "Frozen", date: "2024-01-02", quantity: 30 },
    { category: "Organic", date: "2024-01-03", quantity: 20 },
    { category: "Fresh", date: "2024-01-05", quantity: 70 },
    { category: "Frozen", date: "2024-01-06", quantity: 40 },
    { category: "Organic", date: "2024-01-07", quantity: 25 },
];

// Load Demand Forecasting Module
function loadDemandForecasting() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Demand Forecasting Module</h2>
        <p>Analyze sales trends to predict future demand and recommend stock adjustments.</p>
        <button onclick="analyzeSalesTrends()">Analyze Sales Trends</button>
        <button onclick="recommendStockAdjustments()">Recommend Stock Adjustments</button>
        <div id="forecastingDetails"></div>
    `;
   
}

// Analyze Sales Trends
function analyzeSalesTrends() {
    const salesByCategory = salesData.reduce((acc, sale) => {
        if (!acc[sale.category]) acc[sale.category] = 0;
        acc[sale.category] += sale.quantity;
        return acc;
    }, {});

    let analysisMessage = "📊 Sales Trends Analysis:\n";
    for (const [category, totalSales] of Object.entries(salesByCategory)) {
        analysisMessage += `- ${category}: ${totalSales} units sold\n`;
    }

    alert(analysisMessage);
}

// Recommend Stock Adjustments
function recommendStockAdjustments() {
    const recommendations = inventory.map(item => {
        const totalSales = salesData
            .filter(sale => sale.category === item.category)
            .reduce((sum, sale) => sum + sale.quantity, 0);

        const averageDailySales = totalSales / 7; // Assuming a 7-day sales period
        const recommendedStock = averageDailySales * 14; // Recommend 2 weeks of stock

        return {
            category: item.category,
            currentStock: item.stockLevel,
            recommendedStock: Math.ceil(recommendedStock), // Round up to the nearest unit
        };
    });

    let recommendationMessage = "🔮 Stock Adjustment Recommendations:\n";
    recommendations.forEach(rec => {
        recommendationMessage += `- ${rec.category}: Current Stock = ${rec.currentStock} kg, Recommended Stock = ${rec.recommendedStock} kg\n`;
    });

    alert(recommendationMessage);
}

// Integration Example: Forecasting Button in Inventory Module
function integrateForecastingInInventory() {
    const inventoryDetails = document.getElementById('inventoryDetails');
    inventoryDetails.innerHTML += `
        <button onclick="loadDemandForecasting()">Go to Demand Forecasting</button>
    `;
}
function checkReorderAlerts() {
    inventory.forEach(item => {
        if (item.quantityAvailable < item.reorderLevel) {
            alert(`⚠️ Alert: Stock for ${item.category} (Item ID: ${item.itemId}) is below the reorder level. Current Stock: ${item.quantityAvailable} kg.`);
        }
    });
}

// Function to send reminders for scheduled restocking
function sendRestockReminders() {
    const today = new Date();
    inventory.forEach(item => {
        const restockDate = new Date(item.restockDate);
        const daysToRestock = Math.ceil((restockDate - today) / (1000 * 60 * 60 * 24));

        if (daysToRestock <= 7 && daysToRestock > 0) {
            alert(`🔔 Reminder: Scheduled restocking for ${item.category} (Item ID: ${item.itemId}) is in ${daysToRestock} day(s).`);
        } else if (daysToRestock === 0) {
            alert(`🔔 Reminder: Today is the scheduled restocking date for ${item.category} (Item ID: ${item.itemId}).`);
        }
    });
}
function generateInventorySummary(period) {
    const today = new Date();
    let filteredInventory = inventory;

    // Filter inventory based on the selected period
    if (period === "daily") {
        filteredInventory = inventory.filter(item => isSameDay(new Date(item.lastUpdated), today));
    } else if (period === "weekly") {
        filteredInventory = inventory.filter(item => isSameWeek(new Date(item.lastUpdated), today));
    } else if (period === "monthly") {
        filteredInventory = inventory.filter(item => isSameMonth(new Date(item.lastUpdated), today));
    }

    // Generate summary
    let summaryMessage = `📊 Inventory Summary (${capitalize(period)}):\n\n`;
    filteredInventory.forEach(item => {
        summaryMessage += `- ${item.category} (${item.itemId}):\n`;
        summaryMessage += `  Quantity Available: ${item.quantityAvailable} kg\n`;
        summaryMessage += `  Reorder Level: ${item.reorderLevel} kg\n`;
        summaryMessage += `  Last Updated: ${item.lastUpdated}\n\n`;
    });

    alert(summaryMessage || `No inventory updates for the ${period} period.`);
}

// Function to analyze turnover rates for each category
function analyzeTurnoverRates() {
    let turnoverData = {};

    // Calculate turnover rate
    inventory.forEach(item => {
        const turnoverRate = item.soldQuantity / item.quantityAvailable || 0;
        turnoverData[item.category] = turnoverRate.toFixed(2);
    });

    // Generate report
    let turnoverMessage = "📊 Turnover Rates by Category:\n\n";
    for (const [category, rate] of Object.entries(turnoverData)) {
        turnoverMessage += `- ${category}: ${rate} (sales/stock)\n`;
    }

    alert(turnoverMessage || "No turnover data available.");
}

// Helper functions for date comparisons
function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function isSameWeek(date1, date2) {
    const startOfWeek1 = new Date(date1);
    startOfWeek1.setDate(date1.getDate() - date1.getDay());

    const startOfWeek2 = new Date(date2);
    startOfWeek2.setDate(date2.getDate() - date2.getDay());

    return startOfWeek1.toDateString() === startOfWeek2.toDateString();
}

function isSameMonth(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
    );
}

// Helper to capitalize first letter of period
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function showInventorySummaryOptions() {
    const summaryOptions = document.getElementById('summaryOptions');
    summaryOptions.innerHTML = `
        <h3>Generate Inventory Summary</h3>
        <button onclick="generateInventorySummary('daily')">Daily Summary</button>
        <button onclick="generateInventorySummary('weekly')">Weekly Summary</button>
        <button onclick="generateInventorySummary('monthly')">Monthly Summary</button>
    `;
}
function checkStockLevels() {
    inventory.forEach(item => {
        if (item.quantityAvailable <= item.reorderLevel) {
            const supplier = farmers.find(farmer => farmer.id === item.supplierId); // Link inventory to suppliers
            const contactInfo = supplier ? `${supplier.name} (${supplier.contact})` : "No supplier info available";

            alert(`Stock low for ${item.category} (${item.quantityAvailable} kg remaining). Contact supplier: ${contactInfo}`);
        }
    });
}
// Generate Comprehensive Report
function generateComprehensiveReport() {
    let totalIncome = 0;
    let totalExpenses = 0;
    let taxRate = 0.15; // Example tax rate
    let salesByCategory = {};
    let remainingStockByCategory = {};

    // Calculate total income from sales
    orders.forEach(order => {
        totalIncome += parseFloat(order.totalPrice);
        salesByCategory[order.category] = (salesByCategory[order.category] || 0) + order.quantity;
    });

    // Calculate total expenses from purchases
    purchases.forEach(purchase => {
        totalExpenses += parseFloat(purchase.totalCost);
    });

    // Calculate remaining stock per category
    inventory.forEach(item => {
        remainingStockByCategory[item.category] = item.quantityAvailable;
    });

    // Calculate tax and net profit
    const taxApplied = totalIncome * taxRate;
    const netProfit = totalIncome - totalExpenses - taxApplied;

    // Generate Report
    let report = `
        <h3>Comprehensive Report</h3>
        <p><strong>Total Income:</strong> $${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> $${totalExpenses.toFixed(2)}</p>
        <p><strong>Tax Applied:</strong> $${taxApplied.toFixed(2)}</p>
        <p><strong>Net Profit:</strong> $${netProfit.toFixed(2)}</p>
        <h4>Number of Products Sold per Category:</h4>
        <ul>
            ${Object.entries(salesByCategory).map(([category, quantity]) => `<li>${category}: ${quantity} units</li>`).join('')}
        </ul>
        <h4>Remaining Stock per Category:</h4>
        <ul>
            ${Object.entries(remainingStockByCategory).map(([category, stock]) => `<li>${category}: ${stock} kg</li>`).join('')}
        </ul>
    `;

    // Display Report
    const content = document.getElementById('content');
    content.innerHTML = report;
}

// Load Comprehensive Report Module
function loadComprehensiveReportModule() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Comprehensive Report Generation Module</h2>
        <button onclick="generateComprehensiveReport()">Generate Report</button>
        <div id="reportOutput"></div>
    `;
}



