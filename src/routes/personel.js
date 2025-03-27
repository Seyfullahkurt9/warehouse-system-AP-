const express = require('express');
const router = express.Router();
const personelController = require('../controllers/personelController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Personel:
 *       type: object
 *       properties:
 *         personel_id:
 *           type: integer
 *           description: Personel ID'si
 *           example: 1
 *         personel_ad:
 *           type: string
 *           description: Personelin adı
 *           example: Ahmet
 *         personel_soyad:
 *           type: string
 *           description: Personelin soyadı
 *           example: Yılmaz
 *         personel_telefon_no:
 *           type: string
 *           description: Personelin telefon numarası
 *           example: 05551234567
 *         personel_eposta:
 *           type: string
 *           description: Personelin e-posta adresi
 *           example: ahmet.yilmaz@firma.com
 *         personel_rol:
 *           type: string
 *           description: Personelin rolü
 *           example: admin
 *         firma_firma_id:
 *           type: integer
 *           description: Personelin çalıştığı şirketin ID'si
 *           example: 1
 *         firma:
 *           $ref: '#/components/schemas/Firma'
 */

/**
 * @swagger
 * /api/personnel:
 *   get:
 *     summary: Tüm personeli listeler
 *     tags: [Personel]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Personel listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personel'
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/', authMiddleware, personelController.getAllPersonnel);

/**
 * @swagger
 * /api/personnel/{id}:
 *   get:
 *     summary: ID'ye göre personel bilgilerini getirir
 *     tags: [Personel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Personel ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Personel bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personel'
 *       404:
 *         description: Personel bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.get('/:id', authMiddleware, personelController.getPersonnelById);

/**
 * @swagger
 * /api/personnel/{id}:
 *   put:
 *     summary: Personel bilgilerini günceller
 *     tags: [Personel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Personel ID'si
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personel_ad:
 *                 type: string
 *                 example: Ahmet
 *               personel_soyad:
 *                 type: string
 *                 example: Yılmaz
 *               personel_telefon_no:
 *                 type: string
 *                 example: 05551234567
 *               personel_eposta:
 *                 type: string
 *                 example: ahmet.yilmaz@firma.com
 *               firma_firma_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Personel başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personel'
 *       404:
 *         description: Personel bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.put('/:id', authMiddleware, personelController.updatePersonnel);

/**
 * @swagger
 * /api/personnel/{id}:
 *   delete:
 *     summary: Personeli siler
 *     tags: [Personel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Personel ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Personel başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Personnel deleted successfully
 *       404:
 *         description: Personel bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete('/:id', authMiddleware, personelController.deletePersonnel);

/**
 * @swagger
 * /api/personnel/company/{companyId}:
 *   get:
 *     summary: Şirkete göre personeli listeler
 *     tags: [Personel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Şirket ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Personel listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personel'
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/company/:companyId', authMiddleware, personelController.getPersonnelByCompany);

module.exports = router;
