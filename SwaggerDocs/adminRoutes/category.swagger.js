/**
 * @swagger
 * /admin/categories:
 *   get:
 *     summary: Get all categories (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved
 *   delete:
 *     summary: Delete a category (admin)
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
 *         description: Category deleted
 *   post:
 *     summary: Add a category (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - icon
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               icon:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpg, jpeg, or png)
 *     responses:
 *       201:
 *         description: Category added
 *   patch:
 *     summary: Update a category (admin)
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
 *             required:
 *               - name
 *               - icon
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               icon:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpg, jpeg, or png)
 *     responses:
 *       200:
 *         description: Category updated
 */
