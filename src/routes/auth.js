const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yeni bir kullanıcı kaydeder
 *     tags: [Kimlik Doğrulama]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *               - phone
 *               - company_id
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Kullanıcının email adresi
 *                 example: kullanici@sirket.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Kullanıcı şifresi (en az 6 karakter)
 *                 example: guvenli123
 *               first_name:
 *                 type: string
 *                 description: Kullanıcının adı
 *                 example: Ahmet
 *               last_name:
 *                 type: string
 *                 description: Kullanıcının soyadı
 *                 example: Yılmaz
 *               phone:
 *                 type: string
 *                 description: Kullanıcının telefon numarası
 *                 example: 05551234567
 *               company_id:
 *                 type: integer
 *                 description: Kullanıcının bağlı olduğu şirketin ID'si
 *                 example: 1
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla kaydedildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered. Check your email for verification.
 *                 userId:
 *                   type: string
 *                   example: 550e8400-e29b-41d4-a716-446655440000
 *       400:
 *         description: Geçersiz veri formatı veya eksik bilgi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email already registered
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to register user
 */
router.post('/register', 
  validate({
    email: { type: 'string', required: true, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
    password: { type: 'string', required: true, minLength: 6 },
    first_name: { type: 'string', required: true },
    last_name: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    company_id: { type: 'number', required: true }
  }),
  authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar ve kimlik token'ı alır
 *     tags: [Kimlik Doğrulama]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Kullanıcının email adresi
 *                 example: kullanici@sirket.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Kullanıcı şifresi
 *                 example: guvenli123
 *     responses:
 *       200:
 *         description: Başarılı giriş ve token bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 550e8400-e29b-41d4-a716-446655440000
 *                     email:
 *                       type: string
 *                       example: kullanici@sirket.com
 *                 session:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Geçersiz kimlik bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid login credentials
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to login user
 */
router.post('/login', 
  validate({
    email: { type: 'string', required: true },
    password: { type: 'string', required: true }
  }),
  authController.login
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Kullanıcı çıkışı yapar
 *     tags: [Kimlik Doğrulama]
 *     responses:
 *       200:
 *         description: Başarılı çıkış
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       400:
 *         description: Çıkış yapılamadı
 *       500:
 *         description: Sunucu hatası
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Şifre sıfırlama isteği gönderir
 *     tags: [Kimlik Doğrulama]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Kullanıcının email adresi
 *                 example: kullanici@sirket.com
 *     responses:
 *       200:
 *         description: Şifre sıfırlama e-postası gönderildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent
 *       400:
 *         description: Geçersiz email adresi
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to send password reset email
 */
router.post('/reset-password', 
  validate({
    email: { type: 'string', required: true, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' }
  }),
  authController.resetPasswordRequest
);

module.exports = router;
