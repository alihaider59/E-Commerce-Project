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
 *             required:
 *               - name
 *               - price
 *               - description
 *               - stock
 *               - category
 *               - images
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               description:
 *                 type: string
 *                 example: "Latest Apple iPhone with advanced features."
 *               stock:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6a7b8c9d0e1"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Multiple image files (jpg, jpeg, or png)
 *               flashDeal:
 *                 type: string
 *                 description: |
 *                   Stringified JSON object with fields:
 *                   isActive (boolean), discountPercent (number), startTime (date-time), endTime (date-time)
 *                   Example: {"isActive":true,"discountPercent":20,"startTime":"2024-07-15T00:00:00Z","endTime":"2024-07-20T00:00:00Z"}
 *                 example: '{"isActive":true,"discountPercent":20,"startTime":"2024-07-15T00:00:00Z","endTime":"2024-07-20T00:00:00Z"}'
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
 *             required:
 *               - name
 *               - price
 *               - description
 *               - stock
 *               - category
 *               - images
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               description:
 *                 type: string
 *                 example: "Latest Apple iPhone with advanced features."
 *               stock:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6a7b8c9d0e1"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Multiple image files (jpg, jpeg, or png)
 *     responses:
 *       200:
 *         description: Product updated
 */
