/**
 * @testcase
 * @title Delete Product - Success
 * @description Should delete a product by ID
 * @method DELETE
 * @endpoint /admin/product/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Product Deleted", data: <product>, code: 200 }
 */

/**
 * @testcase
 * @title Delete Product - Server Error
 * @description Simulate DB/server error
 * @method DELETE
 * @endpoint /admin/product/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
