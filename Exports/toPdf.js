//Models
const Orders = require("../Models/orders");
const Products = require("../Models/products");
const UserLogins = require("../Models/userLogins");
const UserProfiles = require("../Models/userProfiles");

const PDFDocument = require("pdfkit");
const fs = require("fs");

//Orders
const exportOrdersPDF = async () => {
  const orders = await Orders.find();

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("orders.pdf"));

  doc.fontSize(20).text("Order List", { align: "center" });
  doc.moveDown();

  orders.forEach((order, index) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Order ${index + 1}`, { underline: true });
    doc.moveDown(); //

    doc.font("Helvetica-Bold").fontSize(12).text("Order ID:");
    doc.font("Helvetica").text(order._id.toString());

    doc.font("Helvetica-Bold").text("Ordered By (User ID):");
    doc
      .font("Helvetica")
      .text(order.ordered_by?._id?.toString() || order.ordered_by.toString());

    doc.font("Helvetica-Bold").text("Ordered Products:");
    order.ordered_products.forEach((item, i) => {
      const productLine = `${i + 1}. Product ID: ${
        item.product_id?._id || item.product_id
      } | Name: ${item.product_id?.name || "N/A"} | Quantity: ${item.quantity}`;
      doc.font("Helvetica").text(productLine);
    });

    doc.font("Helvetica-Bold").text("Shipping Address:");
    doc.font("Helvetica").text(order.shippingAddress);

    doc.font("Helvetica-Bold").text("Total Amount:");
    doc.font("Helvetica").text(order.total_amount.toString());

    doc.font("Helvetica-Bold").text("Payment Method:");
    doc.font("Helvetica").text(order.payment_method);

    doc.font("Helvetica-Bold").text("Status:");
    doc.font("Helvetica").text(order.status);

    doc.font("Helvetica-Bold").text("Cancelled By:");
    doc.font("Helvetica").text(order.cancelled_by || "N/A");

    doc.font("Helvetica-Bold").text("Cancel Reason:");
    doc.font("Helvetica").text(order.cancelReason || "N/A");

    doc.moveDown(3);
  });

  doc.end();
  console.log("PDF file created: Orders.pdf");
};

//Products
const exportProductsPDF = async () => {
  const products = await Products.find();

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("products.pdf"));

  doc.fontSize(20).text("Product List", { align: "center" });
  doc.moveDown();

  products.forEach((product, index) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Product ${index + 1}`, { underline: true });
    doc.moveDown();

    doc.font("Helvetica-Bold").fontSize(12).text("Name:");
    doc.font("Helvetica").text(product.name);

    doc.font("Helvetica-Bold").text("Description:");
    doc.font("Helvetica").text(product.description);

    doc.font("Helvetica-Bold").text("Price:");
    doc.font("Helvetica").text(product.price);

    doc.font("Helvetica-Bold").text("Category:");
    doc.font("Helvetica").text(product.category);
    doc.font("Helvetica-Bold").text("Stock:");
    doc.font("Helvetica").text(product.stock.toString());

    doc.font("Helvetica-Bold").text("Images:");
    product.images.forEach((url, i) => {
      doc.font("Helvetica").text(`  ${i + 1}. ${url}`);
    });

    doc.moveDown(3);
  });
  doc.end();
  console.log("PDF file created: Products.pdf");
};

//Profiles
const exportProfilesPDF = async () => {
  const profiles = await UserProfiles.find();

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("profiles.pdf"));

  doc.fontSize(20).text("Profile List", { align: "center" });
  doc.moveDown();

  profiles.forEach((profile, index) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Profile ${index + 1}`, { underline: true });
    doc.moveDown();

    doc.font("Helvetica-Bold").fontsize(12).text("ID:");
    doc.font("Helvetica").text(profile._id);

    doc.font("Helvetica-Bold").text("Name:");
    doc.font("Helvetica").text(profile.name);

    doc.font("Helvetica-Bold").text("Phone:");
    doc.font("Helvetica").text(profile.phone);

    doc.font("Helvetica-Bold").text("Role:");
    doc.font("Helvetica").text(profile.role);

    doc.font("Helvetica-Bold").text("Address:");
    doc.font("Helvetica").text(profile.address);
    doc.font("Helvetica-Bold").text("Country:");
    doc.font("Helvetica").text(profile.country);

    doc.moveDown(3);
  });
  doc.end();
  console.log("PDF file created: Profiles.pdf");
};

//Login Data
const exportLoginsPDF = async () => {
  const logins = await UserLogins.find();

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("logins.pdf"));

  doc.fontSize(20).text("Logins List", { align: "center" });
  doc.moveDown();

  logins.forEach((login, index) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Login ${index + 1}`, { underline: true });
    doc.moveDown();

    doc.font("Helvetica-Bold").fontSize(12).text("Profile ID:");
    doc.font("Helvetica").text(login.profileId);

    doc.font("Helvetica-Bold").text("Email:");
    doc.font("Helvetica").text(login.email);

    doc.font("Helvetica-Bold").text("Password:");
    doc.font("Helvetica").text(login.password);

    doc.moveDown(3);
  });
  doc.end(); 
  console.log("PDF file created: Logins.pdf");
};

module.exports = { exportOrdersPDF, exportProductsPDF, exportProfilesPDF, exportLoginsPDF };
