/**
 * @testcase
 * @title Get Chats - Success
 * @description Should return all chats
 * @method GET
 * @endpoint /admin/chat
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "All Chats", data: <chats[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get Chats - No Chats
 * @description No chats in DB
 * @method GET
 * @endpoint /admin/chat
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "No chats there", data: [], code: 200 }
 */

/**
 * @testcase
 * @title Get Chats - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /admin/chat
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
