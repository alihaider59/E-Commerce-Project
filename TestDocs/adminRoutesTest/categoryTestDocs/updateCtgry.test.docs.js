/**
 * @testcase
 * @title Update Category - Success
 * @description Should update a category
 * @method PUT
 * @endpoint /admin/category/:id
 * @body
 *   name: "Updated Name"
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Category Updated", data: <category>, code: 200 }
 */

/**
 * @testcase
 * @title Update Category - Not Found
 * @description Category does not exist
 * @method PUT
 * @endpoint /admin/category/:id
 * @body
 *   name: "Updated Name"
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "Category not found", code: 404 }
 */

/**
 * @testcase
 * @title Update Category - Server Error
 * @description Simulate DB/server error
 * @method PUT
 * @endpoint /admin/category/:id
 * @body
 *   name: "Updated Name"
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
