/**
 * @testcase
 * @title Login - Success
 * @description User can log in with valid credentials
 * @method POST
 * @endpoint /auth/login
 * @body
 *   email: user@example.com
 *   password: password123
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Login Successfully", data: { token: <jwt> }, code: 200 }
 */

/**
 * @testcase
 * @title Login - User Does Not Exist
 * @description Login attempt with non-existent email
 * @method POST
 * @endpoint /auth/login
 * @body
 *   email: notfound@example.com
 *   password: password123
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "User does not exist", code: 404 }
 */

/**
 * @testcase
 * @title Login - Incorrect Password
 * @description Login attempt with wrong password
 * @method POST
 * @endpoint /auth/login
 * @body
 *   email: user@example.com
 *   password: wrongpassword
 * @expected
 *   Status: 401 Unauthorized
 *   Body: { success: false, message: "Passowrd not match", code: 401 }
 */

/**
 * @testcase
 * @title Login - Missing Email or Password
 * @description Login attempt with missing fields
 * @method POST
 * @endpoint /auth/login
 * @body
 *   email: (missing)
 *   password: (missing)
 * @expected
 *   Status: 500 Internal Server Error (or custom validation)
 */

/**
 * @testcase
 * @title Login - Server Error
 * @description Simulate DB down or throw error
 * @method POST
 * @endpoint /auth/login
 * @body
 *   email: user@example.com
 *   password: password123
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
