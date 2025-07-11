/**
 * @testcase
 * @title Cancel Order - Success
 * @description Should cancel an order successfully
 * @method PUT
 * @endpoint /orders/cancel/:id
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   cancelReason: "Changed mind"
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Order Cancelled", data: <order>, code: 200 }
 */

/**
 * @testcase
 * @title Cancel Order - Order Not Found
 * @description Order does not exist
 * @method PUT
 * @endpoint /orders/cancel/:id
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   cancelReason: "Changed mind"
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "Order not found", code: 404 }
 */

/**
 * @testcase
 * @title Cancel Order - User Not Found
 * @description User does not exist
 * @method PUT
 * @endpoint /orders/cancel/:id
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   cancelReason: "Changed mind"
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "User not found", code: 404 }
 */

/**
 * @testcase
 * @title Cancel Order - Already Cancelled
 * @description Order is already cancelled
 * @method PUT
 * @endpoint /orders/cancel/:id
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   cancelReason: "Changed mind"
 * @expected
 *   Status: 409 Conflict
 *   Body: { success: false, message: "Your order is already Cancelled", code: 409 }
 */

/**
 * @testcase
 * @title Cancel Order - Not Allowed
 * @description Order is already delivered or on the way
 * @method PUT
 * @endpoint /orders/cancel/:id
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   cancelReason: "Changed mind"
 * @expected
 *   Status: 403 Forbidden
 *   Body: { success: false, message: "You can't cancel this order now, because it is <status>", code: 403 }
 */

/**
 * @testcase
 * @title Cancel Order - Server Error
 * @description Simulate DB/server error
 * @method PUT
 * @endpoint /orders/cancel/:id
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   cancelReason: "Changed mind"
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
