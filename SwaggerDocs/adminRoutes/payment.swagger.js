/**
 * @swagger
 * /admin/payments:
 *   get:
 *     summary: Get all payments (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payments retrieved
 * /admin/user/payments/{id}:
 *   get:
 *     summary: Get user payment by ID (admin)
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
 *         description: User payment retrieved
 */
