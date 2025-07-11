/**
 * @testcase
 * @title Verify Email - Success
 * @description User can verify email if exists
 * @method POST
 * @endpoint /auth/verify-email
 * @body
 *   email: user@example.com
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Email Verified", mail: <mailStatus>, code: 200 }
 */

/**
 * @testcase
 * @title Verify Email - Not Exist
 * @description Attempt to verify non-existent email
 * @method POST
 * @endpoint /auth/verify-email
 * @body
 *   email: notfound@example.com
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "Email not exist", code: 404 }
 */

/**
 * @testcase
 * @title Verify Email - Server Error
 * @description Simulate DB down or throw error
 * @method POST
 * @endpoint /auth/verify-email
 * @body
 *   email: user@example.com
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
