/**
 * @testcase
 * @title Create Category - Success
 * @description Should create a new category
 * @method POST
 * @endpoint /admin/category
 * @body
 *   name: "Electronics", icon: <file>
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Category created successfully", data: <category>, code: 200 }
 */

/**
 * @testcase
 * @title Create Category - Server Error
 * @description Simulate DB/server error
 * @method POST
 * @endpoint /admin/category
 * @body
 *   name: "Electronics", icon: <file>
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
