/**
 * @testcase
 * @title View Profile - Success
 * @description User can view their profile with valid token
 * @method GET
 * @endpoint /user/profile
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Your profile", data: <profileObj>, code: 200 }
 */

/**
 * @testcase
 * @title View Profile - Server Error
 * @description Simulate DB down or throw error
 * @method GET
 * @endpoint /user/profile
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
