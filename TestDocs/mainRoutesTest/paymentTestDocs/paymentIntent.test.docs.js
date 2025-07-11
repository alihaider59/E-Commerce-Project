/**
 * @testcase
 * @title Payment Intent - Success
 * @description Should create a payment intent
 * @method POST
 * @endpoint /payment/intent
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   amount: 100
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Payment intent created", data: { clientSecret: <string> }, code: 200 }
 */

/**
 * @testcase
 * @title Payment Intent - Server Error
 * @description Simulate Stripe or server error
 * @method POST
 * @endpoint /payment/intent
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   amount: 100
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
