/**
 * @testcase
 * @title Global Deals - Success
 * @description Should create a global deal
 * @method POST
 * @endpoint /admin/deals/global
 * @body
 *   categories: [...], startTime: <date>, endTime: <date>
 * @expected
 *   Status: 201 Created
 *   Body: { success: true, message: "Global deal created", data: <deal>, code: 201 }
 */

/**
 * @testcase
 * @title Global Deals - Server Error
 * @description Simulate DB/server error
 * @method POST
 * @endpoint /admin/deals/global
 * @body
 *   categories: [...], startTime: <date>, endTime: <date>
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
