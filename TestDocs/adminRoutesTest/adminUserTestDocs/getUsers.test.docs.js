/**
 * @testcase
 * @title Get Users - Success
 * @description Should return all user profiles
 * @method GET
 * @endpoint /admin/user
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "All User's Profiles", data: <profiles[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get Users - No Users
 * @description No users in DB
 * @method GET
 * @endpoint /admin/user
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Not any user registered", data: [], code: 200 }
 */

/**
 * @testcase
 * @title Get Users - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /admin/user
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
