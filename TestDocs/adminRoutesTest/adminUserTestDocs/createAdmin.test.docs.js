/**
 * @testcase
 * @title Create Admin - Success
 * @description Should create a new admin
 * @method POST
 * @endpoint /admin/user
 * @body
 *   email: "admin@example.com", password: "pass123", ...otherData
 * @expected
 *   Status: 201 Created
 *   Body: { success: true, message: "Admin Created", code: 201 }
 */

/**
 * @testcase
 * @title Create Admin - Email Not Valid
 * @description Invalid email format
 * @method POST
 * @endpoint /admin/user
 * @body
 *   email: "bademail", password: "pass123"
 * @expected
 *   Status: 400 Bad Request
 *   Body: { success: false, message: "Email not valid", code: 400 }
 */

/**
 * @testcase
 * @title Create Admin - User Already Exists
 * @description Email already registered
 * @method POST
 * @endpoint /admin/user
 * @body
 *   email: "admin@example.com", password: "pass123"
 * @expected
 *   Status: 409 Conflict
 *   Body: { success: false, message: "User already Exist", code: 409 }
 */

/**
 * @testcase
 * @title Create Admin - Server Error
 * @description Simulate DB/server error
 * @method POST
 * @endpoint /admin/user
 * @body
 *   email: "admin@example.com", password: "pass123"
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
