/**
 * @testcase
 * @title Add Deals - Success
 * @description Should add or update a flash deal
 * @method POST
 * @endpoint /admin/deals/:id
 * @body
 *   discountPercent: 10, flashDeal: {...}
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Discount Added", data: <product>, code: 200 }
 */

/**
 * @testcase
 * @title Add Deals - Remove Discount
 * @description Should remove discount if percent is 0
 * @method POST
 * @endpoint /admin/deals/:id
 * @body
 *   discountPercent: 0, flashDeal: { discountPercent: 0, isActive: false }
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "Discount Removed", data: <product>, code: 200 }
 */

/**
 * @testcase
 * @title Add Deals - Invalid Discount
 * @description Discount percent out of range
 * @method POST
 * @endpoint /admin/deals/:id
 * @body
 *   discountPercent: 200
 * @expected
 *   Status: 400 Bad Request
 *   Body: { success: false, message: "Invalid discount percentage", code: 400 }
 */

/**
 * @testcase
 * @title Add Deals - Server Error
 * @description Simulate DB/server error
 * @method POST
 * @endpoint /admin/deals/:id
 * @body
 *   discountPercent: 10, flashDeal: {...}
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
