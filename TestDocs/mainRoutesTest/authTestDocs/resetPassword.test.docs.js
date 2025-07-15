/**
 * @testcase
 * @title Reset Password - Success
 * @description User can reset password with valid old password
 * @method PATCH
 * @endpoint /auth/reset-password
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   oldPassword: oldpassword123
 *   newPassword: newpassword123
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Password Changed", code: 200 }
 */

/**
 * @testcase
 * @title Reset Password - Old Password Not Match
 * @description Attempt to reset password with wrong old password
 * @method PATCH
 * @endpoint /auth/reset-password
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   oldPassword: wrongpassword
 *   newPassword: newpassword123
 * @expected
 *   Status: 401 Unauthorized
 *   Body: { success: false, message: "Old password not match", code: 401 }
 */

/**
 * @testcase
 * @title Reset Password - Server Error
 * @description Simulate DB down or throw error
 * @method PATCH
 * @endpoint /auth/reset-password
 * @headers
 *   Authorization: Bearer <valid_token>
 * @body
 *   oldPassword: oldpassword123
 *   newPassword: newpassword123
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
