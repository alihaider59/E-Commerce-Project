/**
 * @testcase
 * @title Get Payments - Success
 * @description Should return all payments
 * @method GET
 * @endpoint /admin/payments
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "All payments", data: <payments[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get Payments - No Payments
 * @description No payments in DB
 * @method GET
 * @endpoint /admin/payments
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "There is no any payment", data: [], code: 200 }
 */

/**
 * @testcase
 * @title Get Payments - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /admin/payments
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
