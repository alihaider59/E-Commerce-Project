/**
 * @testcase
 * @title Delete Global Deals - Success
 * @description Should delete a global deal
 * @method DELETE
 * @endpoint /admin/deals/global/:id
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Deal deleted", data: <deal>, code: 200 }
 */

/**
 * @testcase
 * @title Delete Global Deals - Server Error
 * @description Simulate DB/server error
 * @method DELETE
 * @endpoint /admin/deals/global/:id
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
