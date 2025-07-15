/**
 * @testcase
 * @title Delete Profile - Success
 * @description User can delete their profile with valid token
 * @method DELETE
 * @endpoint /user/profile
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Deleted Successfully", code: 200 }
 */

/**
 * @testcase
 * @title Delete Profile - Server Error
 * @description Simulate DB down or throw error
 * @method DELETE
 * @endpoint /user/profile
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
