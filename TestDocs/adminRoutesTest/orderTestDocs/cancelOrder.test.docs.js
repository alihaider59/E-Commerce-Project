/**
 * @testcase
 * @title Cancel Order - Success
 * @description Should cancel an order by admin
 * @method PUT
 * @endpoint /admin/orders/cancel/:id
 * @body
 *   cancelReason: "Admin cancelled"
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Order Cancelled by admin", data: <order>, code: 200 }
 */

/**
 * @testcase
 * @title Cancel Order - Not Found
 * @description Order does not exist
 * @method PUT
 * @endpoint /admin/orders/cancel/:id
 * @body
 *   cancelReason: "Admin cancelled"
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "Order not found", code: 404 }
 */

/**
 * @testcase
 * @title Cancel Order - Already Cancelled
 * @description Order is already cancelled
 * @method PUT
 * @endpoint /admin/orders/cancel/:id
 * @body
 *   cancelReason: "Admin cancelled"
 * @expected
 *   Status: 409 Conflict
 *   Body: { success: false, message: "Your order is already Cancelled", code: 409 }
 */

/**
 * @testcase
 * @title Cancel Order - Not Allowed
 * @description Order is already delivered or on the way
 * @method PUT
 * @endpoint /admin/orders/cancel/:id
 * @body
 *   cancelReason: "Admin cancelled"
 * @expected
 *   Status: 403 Forbidden
 *   Body: { success: false, message: "You can't cancel this order now, because it is <status>", code: 403 }
 */

/**
 * @testcase
 * @title Cancel Order - Server Error
 * @description Simulate DB/server error
 * @method PUT
 * @endpoint /admin/orders/cancel/:id
 * @body
 *   cancelReason: "Admin cancelled"
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
