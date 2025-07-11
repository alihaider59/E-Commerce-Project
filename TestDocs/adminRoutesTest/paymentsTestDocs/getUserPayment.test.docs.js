/**
 * @testcase
 * @title Get User Payments - Success
 * @description Should return all payments for a user
 * @method GET
 * @endpoint /admin/payments/user/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Payments for this user", data: <payments[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get User Payments - No Payments
 * @description No payments for this user
 * @method GET
 * @endpoint /admin/payments/user/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "There is no any payment", data: [], code: 200 }
 */

/**
 * @testcase
 * @title Get User Payments - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /admin/payments/user/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
