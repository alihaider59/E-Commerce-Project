/**
 * @testcase
 * @title Refresh Token - Success
 * @description Should return a new access token with a valid refresh token
 * @method POST
 * @endpoint /refresh-token
 * @body
 *   refreshToken: <valid_refresh_token>
 * @expected
 *   Status: 200 OK
 *   Body: { accessToken: "<new_access_token>" }
 */

/**
 * @testcase
 * @title Refresh Token - Invalid Token
 * @description Should return 400 for an invalid or expired refresh token
 * @method POST
 * @endpoint /refresh-token
 * @body
 *   refreshToken: invalid_token
 * @expected
 *   Status: 400 Bad Request
 *   Body: { error: "Invalid or expired refresh token" }
 */

/**
 * @testcase
 * @title Refresh Token - Missing Token
 * @description Should return 400 if refresh token is missing
 * @method POST
 * @endpoint /refresh-token
 * @expected
 *   Status: 400 Bad Request
 *   Body: { error: "Refresh token is required" }
 */
