/**
 * @swagger
 * /create-payment-intent:
 *   post:
 *     summary: Create Stripe payment intent
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Payment intent created
 */
