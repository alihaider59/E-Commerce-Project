/**
 * @testcase
 * @title Get Chat User - Success
 * @description Should return all chats for a user
 * @method GET
 * @endpoint /chat/user
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "All Chats for this user", data: <chats[]>, code: 200 }
 */

/**
 * @testcase
 * @title Get Chat User - No Chats
 * @description No chats for this user
 * @method GET
 * @endpoint /chat/user
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "No chats there", data: [], code: 200 }
 */

/**
 * @testcase
 * @title Get Chat User - Server Error
 * @description Simulate DB/server error
 * @method GET
 * @endpoint /chat/user
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
