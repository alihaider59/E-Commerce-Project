/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get user orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved
 *   post:
 *     summary: Place an order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - ordered_products
 *               - shippingAddress
 *               - stripePaymentId
 *             properties:
 *               ordered_products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       example: "64a1b2c3d4e5f6a7b8c9d0e1"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Main St, City"
 *               stripePaymentId:
 *                 type: string
 *                 example: "pi_1Hh1YZ2eZvKYlo2C0qF6a7b8"
 *     responses:
 *       201:
 *         description: Order placed
 * /orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order
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
 */
