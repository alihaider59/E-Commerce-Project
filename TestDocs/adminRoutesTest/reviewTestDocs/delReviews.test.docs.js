/**
 * @testcase
 * @title Delete Review - Success
 * @description Should delete a review by ID
 * @method DELETE
 * @endpoint /admin/reviews/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Review deleted by admin", data: <review>, code: 200 }
 */

/**
 * @testcase
 * @title Delete Review - Server Error
 * @description Simulate DB/server error
 * @method DELETE
 * @endpoint /admin/reviews/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
