/**
 * @testcase
 * @title Update Global Deals - Success
 * @description Should update a global deal
 * @method PUT
 * @endpoint /admin/deals/global/:id
 * @body
 *   categories: [...], startTime: <date>, endTime: <date>
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Deal updated", data: <deal>, code: 200 }
 */

/**
 * @testcase
 * @title Update Global Deals - Server Error
 * @description Simulate DB/server error
 * @method PUT
 * @endpoint /admin/deals/global/:id
 * @body
 *   categories: [...], startTime: <date>, endTime: <date>
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
