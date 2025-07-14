/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Get all orders (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved
 * /admin/orders/{id}:
 *   delete:
 *     summary: Delete an order (admin)
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
 *         description: Order deleted
 * /admin/orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order (admin)
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
 *             required:
 *               - cancelReason
 *             properties:
 *               cancelReason:
 *                 type: string
 *                 example: "Customer requested cancellation"
 *     responses:
 *       200:
 *         description: Order cancelled
 * /admin/orders/{id}/status:
 *   patch:
 *     summary: Update order status (admin)
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "shipped"
 *     responses:
 *       200:
 *         description: Order status updated
 */
