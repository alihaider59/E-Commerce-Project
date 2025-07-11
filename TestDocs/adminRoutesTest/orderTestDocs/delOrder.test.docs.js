/**
 * @testcase
 * @title Delete Order - Success
 * @description Should delete an order by ID
 * @method DELETE
 * @endpoint /admin/orders/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Order Deleted", data: <order>, code: 200 }
 */

/**
 * @testcase
 * @title Delete Order - Server Error
 * @description Simulate DB/server error
 * @method DELETE
 * @endpoint /admin/orders/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
