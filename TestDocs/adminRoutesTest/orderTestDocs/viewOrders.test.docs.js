/**
 * @testcase
 * @title View Orders - Success
 * @description Should return all orders
 * @method GET
 * @endpoint /admin/orders
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Total Orders", data: <orders[]>, code: 200 }
 */

/**
 * @testcase
 * @title View Orders - No Orders
 * @description No orders in DB
 * @method GET
 * @endpoint /admin/orders
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "No any order placed", data: [], code: 200 }
 */

/**
 * @testcase
 * @title View Orders - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /admin/orders
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
