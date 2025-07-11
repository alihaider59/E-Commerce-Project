/**
 * @testcase
 * @title Update Order Status - Success
 * @description Should update order status and send mail
 * @method PUT
 * @endpoint /admin/orders/:id
 * @body
 *   status: "Confirmed"
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Order Status Updated", status: <status>, mail: <string>, code: 200 }
 */

/**
 * @testcase
 * @title Update Order Status - Server Error
 * @description Simulate DB/server error
 * @method PUT
 * @endpoint /admin/orders/:id
 * @body
 *   status: "Confirmed"
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
