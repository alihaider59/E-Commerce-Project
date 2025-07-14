/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get user wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist retrieved
 *   post:
 *     summary: Add product to wishlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6a7b8c9d0e1"
 *     responses:
 *       201:
 *         description: Product added to wishlist
 * /wishlist/{id}:
 *   delete:
 *     summary: Remove from wishlist
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
 *         description: Removed from wishlist
 */
