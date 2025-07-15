/**
 * @testcase
 * @title Forget Password - Success
 * @description User can update password with valid email
 * @method PATCH
 * @endpoint /auth/forgot-password
 * @body
 *   email: user@example.com
 *   password: newpassword123
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Password Updated", code: 200 }
 */

/**
 * @testcase
 * @title Forget Password - User Not Found
 * @description Attempt to update password for non-existent email
 * @method PATCH
 * @endpoint /auth/forgot-password
 * @body
 *   email: notfound@example.com
 *   password: newpassword123
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "User not found for this email", code: 404 }
 */

/**
 * @testcase
 * @title Forget Password - Server Error
 * @description Simulate DB down or throw error
 * @method PATCH
 * @endpoint /auth/forgot-password
 * @body
 *   email: user@example.com
 *   password: newpassword123
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
