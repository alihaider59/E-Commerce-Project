/**
 * @testcase
 * @title Signup - Success
 * @description User can sign up with valid email and password
 * @method POST
 * @endpoint /auth/signup
 * @body
 *   email: user@example.com
 *   password: password123
 *   name: John Doe
 * @expected
 *   Status: 201 Created
 *   Body: { success: true, message: "Signed Up Successfully", code: 201 }
 */

/**
 * @testcase
 * @title Signup - Invalid Email
 * @description Signup attempt with invalid email
 * @method POST
 * @endpoint /auth/signup
 * @body
 *   email: invalidemail
 *   password: password123
 *   name: John Doe
 * @expected
 *   Status: 400 Bad Request
 *   Body: { success: false, message: "Email is not valid", code: 400 }
 */

/**
 * @testcase
 * @title Signup - Server Error
 * @description Simulate DB down or throw error
 * @method POST
 * @endpoint /auth/signup
 * @body
 *   email: user@example.com
 *   password: password123
 *   name: John Doe
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
