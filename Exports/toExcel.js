//Models
const Orders = require("../Models/orders");
const Products = require("../Models/products");
const UserLogins = require("../Models/userLogins");
const UserProfiles = require("../Models/userProfiles");

const ExcelJS = require("exceljs");

//Orders
const exportOrders = async () => {
  const orders = await Orders.find();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Orders");

  worksheet.columns = [
    { header: "Order ID", key: "_id", width: 25 },
    { header: "Ordered By", key: "ordered_by", width: 30 },
    { header: "Ordered Products", key: "products", width: 40 },
    { header: "Shipping Address", key: "shippingAddress", width: 40 },
    { header: "Total Amount", key: "total_amount", width: 20 },
    { header: "Payment Method", key: "payment_method", width: 20 },
    { header: "Status", key: "status", width: 20 },
    { header: "Cancelled By", key: "cancelled_by", width: 20 },
    { header: "Cancel Reason", key: "cancelReason", width: 30 },
  ];

  const formattedOrders = orders.map((order) => ({
    _id: order._id.toString(),
    ordered_by: order.ordered_by,
    products: order.ordered_products
      .map((p) => `ID: ${p.product_id}, Qty: ${p.quantity}`)
      .join(";\n "),
    shippingAddress: order.shippingAddress,
    total_amount: order.total_amount,
    payment_method: order.payment_method,
    status: order.status,
    cancelled_by: order.cancelled_by || "N/A",
    cancelReason: order.cancelReason || "N/A",
  }));

  formattedOrders.forEach((order) => {
    worksheet.addRow(order);
  });

  await workbook.xlsx.writeFile("orders.xlsx");
  console.log("Excel file created: orders.xlsx");
};

//Products
const exportProducts = async () => {
  const products = await Products.find();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Products");

  worksheet.columns = [
    { header: "Product Name", key: "name", width: 30 },
    { header: "Description", key: "description", width: 50 },
    { header: "Price", key: "price", width: 15 },
    { header: "Category", key: "category", width: 20 },
    { header: "Stock", key: "stock", width: 10 },
    { header: "Images (URLs)", key: "images", width: 50 },
  ];

  const formattedProducts = products.map((p) => ({
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    stock: p.stock,
    images: p.images.join(", "),
  }));

  formattedProducts.forEach((product) => {
    worksheet.addRow(product);
  });

  await workbook.xlsx.writeFile("products.xlsx");
  console.log("Excel file created: products.xlsx");
};

//Profiles
const exportProfiles = async () => {
  const profiles = await UserProfiles.find();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Profiles");

  worksheet.columns = [
    { header: "ID", key: "_id", width: 40 },
    { header: "Name", key: "name", width: 30 },
    { header: "Phone", key: "phone", width: 50 },
    { header: "Role", key: "role", width: 15 },
    { header: "Address", key: "address", width: 40 },
    { header: "Country", key: "country", width: 15 },
  ];

  profiles.forEach((profile) => {
    worksheet.addRow(profile);
  });

  await workbook.xlsx.writeFile("profiles.xlsx");
  console.log("Excel file created: profiles.xlsx");
};

//Login Data
const exportLogins = async () => {
  const logins = await UserLogins.find();

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Logins");

  worksheet.columns = [
    { header: "Profile Id", key: "profileId", width: 40 },
    { header: "Email", key: "email", width: 30 },
    { header: "Password", key: "password", width: 30 },
  ];

  logins.forEach((login) => {
    worksheet.addRow(login);
  });

  await workbook.xlsx.writeFile("logins.xlsx");
  console.log("Excel file created: logins.xlsx");
};

module.exports = { exportOrders, exportProducts, exportProfiles, exportLogins };
