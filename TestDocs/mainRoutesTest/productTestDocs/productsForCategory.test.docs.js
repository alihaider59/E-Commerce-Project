/**
 * @testcase
 * @title Products For Category - Success
 * @description Should return products for a specific category
 * @method GET
 * @endpoint /products/category/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Available Products for this category", data: <products[]>, code: 200 }
 */

/**
 * @testcase
 * @title Products For Category - No Products
 * @description No products for this category
 * @method GET
 * @endpoint /products/category/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "No products available", code: 200 }
 */

/**
 * @testcase
 * @title Products For Category - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /products/category/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
