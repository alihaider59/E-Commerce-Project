/**
 * @swagger
 * /chat/user:
 *   get:
 *     summary: Get chat user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat user retrieved
 *   delete:
 *     summary: Delete chat user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat user deleted
 * /chat/room/{roomid}:
 *   get:
 *     summary: Get chat room by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat room retrieved
 * /chatbot:
 *   post:
 *     summary: AI chatbot interaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hello, how can I help you?"
 *     responses:
 *       200:
 *         description: Chatbot response
 */
