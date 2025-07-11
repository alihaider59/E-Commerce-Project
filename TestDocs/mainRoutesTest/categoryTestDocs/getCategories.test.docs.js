/**
 * @testcase
 * @title Get Categories - Success
 * @description Should return all categories
 * @method GET
 * @endpoint /categories
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Categories Sent", data: <categories[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get Categories - Not Found
 * @description No categories exist in DB
 * @method GET
 * @endpoint /categories
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "Categories not found", code: 404 }
 */

/**
 * @testcase
 * @title Get Categories - Server Error
 * @description Simulate DB error
 * @method GET
 * @endpoint /categories
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
