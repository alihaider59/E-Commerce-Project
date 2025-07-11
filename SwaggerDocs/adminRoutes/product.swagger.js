/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Get all products (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products retrieved
 *   post:
 *     summary: Add a product (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Product added
 * /admin/products/{id}:
 *   delete:
 *     summary: Delete a product (admin)
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
 *         description: Product deleted
 *   patch:
 *     summary: Update a product (admin)
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 */
