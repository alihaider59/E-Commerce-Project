/**
 * @testcase
 * @title Get One Product - Success
 * @description Should return a single product by ID
 * @method GET
 * @endpoint /products/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "View Product", data: <product>, code: 200 }
 */

/**
 * @testcase
 * @title Get One Product - Not Found
 * @description Product does not exist
 * @method GET
 * @endpoint /products/:id
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, messages: "Product not found", code: 404 }
 */

/**
 * @testcase
 * @title Get One Product - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /products/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
