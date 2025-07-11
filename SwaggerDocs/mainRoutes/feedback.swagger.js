/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: Get feedback by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback retrieved
 *   delete:
 *     summary: Delete feedback
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback deleted
 *   patch:
 *     summary: Update feedback
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Feedback updated
 * /feedback:
 *   post:
 *     summary: Add feedback
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - rating
 *               - feedback
 *             properties:
 *               product:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6a7b8c9d0e1"
 *               rating:
 *                 type: integer
 *                 example: 5
 *               feedback:
 *                 type: string
 *                 example: "Great product and fast delivery!"
 *     responses:
 *       201:
 *         description: Feedback added
 */
