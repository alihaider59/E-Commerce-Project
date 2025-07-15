/**
 * @testcase
 * @title Update Profile - Success
 * @description User can update their profile with valid token
 * @method PATCH
 * @endpoint /user/profile
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   name: New Name
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Profile Updated", data: <profileObj>, code: 200 }
 */

/**
 * @testcase
 * @title Update Profile - Not Found
 * @description Update attempt for non-existent profile
 * @method PATCH
 * @endpoint /user/profile
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   name: New Name
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "Profile not found", code: 404 }
 */

/**
 * @testcase
 * @title Update Profile - Server Error
 * @description Simulate DB down or throw error
 * @method PATCH
 * @endpoint /user/profile
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   name: New Name
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
