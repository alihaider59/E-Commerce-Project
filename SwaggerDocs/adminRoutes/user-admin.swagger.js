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
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - address
 *               - country
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Admin User"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPassword123"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Admin St, City"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Admin created
 */
