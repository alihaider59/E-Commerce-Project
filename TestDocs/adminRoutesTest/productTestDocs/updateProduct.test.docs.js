/**
 * @testcase
 * @title Update Product - Success
 * @description Should update a product
 * @method PUT
 * @endpoint /admin/product/:id
 * @body
 *   name: "Updated Name"
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Product Updated", data: <product>, code: 200 }
 */

/**
 * @testcase
 * @title Update Product - Not Found
 * @description Product does not exist
 * @method PUT
 * @endpoint /admin/product/:id
 * @body
 *   name: "Updated Name"
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "Product not found", code: 404 }
 */

/**
 * @testcase
 * @title Update Product - Server Error
 * @description Simulate DB/server error
 * @method PUT
 * @endpoint /admin/product/:id
 * @body
 *   name: "Updated Name"
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
