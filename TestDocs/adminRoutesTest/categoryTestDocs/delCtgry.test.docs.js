/**
 * @testcase
 * @title Delete Category - Success
 * @description Should delete a category
 * @method DELETE
 * @endpoint /admin/category/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Category Deleted", data: <category>, code: 200 }
 */

/**
 * @testcase
 * @title Delete Category - Not Found
 * @description Category does not exist
 * @method DELETE
 * @endpoint /admin/category/:id
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "Category not found", code: 404 }
 */

/**
 * @testcase
 * @title Delete Category - Server Error
 * @description Simulate DB/server error
 * @method DELETE
 * @endpoint /admin/category/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
