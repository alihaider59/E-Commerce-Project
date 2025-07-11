/**
 * @testcase
 * @title Get Categories - Success
 * @description Should return all categories
 * @method GET
 * @endpoint /admin/category
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Categories Sent", data: <categories[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get Categories - No Categories
 * @description No categories in DB
 * @method GET
 * @endpoint /admin/category
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Categories not found", data: [], code: 200 }
 */

/**
 * @testcase
 * @title Get Categories - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /admin/category
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
