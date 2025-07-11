/**
 * @testcase
 * @title Get Products - Success
 * @description Should return all products
 * @method GET
 * @endpoint /admin/product
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "All Products", data: <products[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get Products - No Products
 * @description No products in DB
 * @method GET
 * @endpoint /admin/product
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Not any product found", data: [], code: 200 }
 */

/**
 * @testcase
 * @title Get Products - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /admin/product
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
