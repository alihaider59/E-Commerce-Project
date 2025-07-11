/**
 * @testcase
 * @title Add Review - Success
 * @description Should add a review
 * @method POST
 * @endpoint /reviews
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   rating: 5, comment: "Great!"
 * @expected
 *   Status: 201 Created
 *   Body: { success: true, message: "Feedback added", code: 201 }
 */

/**
 * @testcase
 * @title Add Review - Server Error
 * @description Simulate DB/server error
 * @method POST
 * @endpoint /reviews
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   rating: 5, comment: "Great!"
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
