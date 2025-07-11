/**
 * @testcase
 * @title Delete Chat User - Success
 * @description Should delete all chats for a user
 * @method DELETE
 * @endpoint /chat/user
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 200 OK
 *   Body: { success: true, message: "All chat deleted", data: <number>, code: 200 }
 */

/**
 * @testcase
 * @title Delete Chat User - No Chats Found
 * @description No chats found for this user
 * @method DELETE
 * @endpoint /chat/user
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 404 Not Found
 *   Body: { success: false, message: "No chats found for this user", code: 404 }
 */

/**
 * @testcase
 * @title Delete Chat User - Server Error
 * @description Simulate DB/server error
 * @method DELETE
 * @endpoint /chat/user
 * @headers
 *   Authorization: Bearer <valid_token>
 * @expected
 *   Status: 500 Internal Server Error
 *   Body: { success: false, message: "Internal server error", code: 500 }
 */
