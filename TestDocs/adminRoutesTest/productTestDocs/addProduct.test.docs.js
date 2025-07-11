/**
 * @testcase
 * @title Add Product - Success
 * @description Should add a new product
 * @method POST
 * @endpoint /admin/product
 * @body
 *   name: "Product Name", price: 100, ...
 * @expected
 *   Status: 201 Created
 *   Body: { success: true, message: "Product Added", data: <product>, code: 201 }
 */

/**
 * @testcase
 * @title Add Product - Invalid FlashDeal JSON
 * @description Invalid flashDeal JSON in body
 * @method POST
 * @endpoint /admin/product
 * @body
 *   flashDeal: "bad_json"
 * @expected
 *   Status: 400 Bad Request
 *   Body: { message: "Invalid flashDeal JSON" }
 */

/**
 * @testcase
 * @title Add Product - Server Error
 * @description Simulate DB/server error
 * @method POST
 * @endpoint /admin/product
 * @body
 *   name: "Product Name", price: 100
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
