/**
 * @swagger
 * /admin/deals/global:
 *   post:
 *     summary: Add global deal (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - discountPercent
 *               - isActive
 *               - applyTo
 *               - startTime
 *               - endTime
 *             properties:
 *               discountPercent:
 *                 type: number
 *                 example: 15
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               applyTo:
 *                 type: string
 *                 example: "all"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-07-15T00:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-07-20T00:00:00Z"
 *     responses:
 *       201:
 *         description: Global deal added
 * /admin/deals/global/{id}:
 *   patch:
 *     summary: Update global deal (admin)
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
 *               - discountPercent
 *               - isActive
 *               - applyTo
 *               - startTime
 *               - endTime
 *             properties:
 *               discountPercent:
 *                 type: number
 *                 example: 15
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               applyTo:
 *                 type: string
 *                 example: "all"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-07-15T00:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-07-20T00:00:00Z"
 *     responses:
 *       200:
 *         description: Global deal updated
 *   delete:
 *     summary: Delete global deal (admin)
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
 *         description: Global deal deleted
 * /admin/deals/product/{id}:
 *   patch:
 *     summary: Add product deal (admin)
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
 *               - flashDeal
 *             properties:
 *               flashDeal:
 *                 type: string
 *                 description: |
 *                   Stringified JSON object with fields:
 *                   isActive (boolean), discountPercent (number), startTime (date-time), endTime (date-time)
 *                   Example: {"isActive":true,"discountPercent":20,"startTime":"2024-07-15T00:00:00Z","endTime":"2024-07-20T00:00:00Z"}
 *                 example: '{"isActive":true,"discountPercent":20,"startTime":"2024-07-15T00:00:00Z","endTime":"2024-07-20T00:00:00Z"}'
 *     responses:
 *       200:
 *         description: Product deal added
 */
