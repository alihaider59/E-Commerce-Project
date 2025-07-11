/**
 * @swagger
 * /admin/profiles:
 *   get:
 *     summary: Get all user profiles (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profiles retrieved
 * /admin/admin/create:
 *   post:
 *     summary: Create admin user
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Admin created
 */
