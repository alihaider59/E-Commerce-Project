/**
 * @testcase
 * @title Get Reviews - Success
 * @description Should return all reviews for a product
 * @method GET
 * @endpoint /admin/reviews/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Reviews", data: <reviews[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get Reviews - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /admin/reviews/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
