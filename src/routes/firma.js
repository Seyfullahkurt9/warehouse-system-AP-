const express = require('express');
const router = express.Router();
const firmaController = require('../controllers/firmaController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Firma:
 *       type: object
 *       required:
 *         - firma_ad
 *         - firma_vergi_no
 *       properties:
 *         firma_id:
 *           type: integer
 *           description: Şirket ID'si
 *           example: 1
 *         firma_ad:
 *           type: string
 *           description: Şirket adı
 *           example: ABC Teknoloji Ltd. Şti.
 *         firma_vergi_no:
 *           type: string
 *           description: Vergi numarası
 *           example: 1234567890
 *         firma_telefon:
 *           type: string
 *           description: Şirket telefon numarası
 *           example: 02121234567
 *         firma_adres:
 *           type: string
 *           description: Şirket adresi
 *           example: Atatürk Cad. No:123 İstanbul
 *         firma_eposta_adresi:
 *           type: string
 *           description: Şirket e-posta adresi
 *           example: info@abcteknoloji.com
 */

/**
 * @swagger
 * /api/firmas:
 *   get:
 *     summary: Tüm şirketleri listeler
 *     tags: [Şirketler]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Şirket listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Firma'
 *             example: 
 *               - firma_id: 1
 *                 firma_ad: ABC Teknoloji Ltd. Şti.
 *                 firma_vergi_no: 1234567890
 *                 firma_telefon: 02121234567
 *                 firma_adres: Atatürk Cad. No:123 İstanbul
 *                 firma_eposta_adresi: info@abcteknoloji.com
 *               - firma_id: 2
 *                 firma_ad: XYZ Yazılım A.Ş.
 *                 firma_vergi_no: 0987654321
 *                 firma_telefon: 02169876543
 *                 firma_adres: İnönü Cad. No:456 Ankara
 *                 firma_eposta_adresi: info@xyzyazilim.com
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/', authMiddleware, firmaController.getAllFirmas);

/**
 * @swagger
 * /api/firmas/{id}:
 *   get:
 *     summary: ID'ye göre şirket bilgilerini getirir
 *     tags: [Şirketler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Şirket ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Şirket bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Firma'
 *       404:
 *         description: Şirket bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Company not found
 *       500:
 *         description: Sunucu hatası
 */
router.get('/:id', authMiddleware, firmaController.getFirmaById);

/**
 * @swagger
 * /api/firmas:
 *   post:
 *     summary: Yeni şirket oluşturur
 *     tags: [Şirketler]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firma_ad
 *               - firma_vergi_no
 *             properties:
 *               firma_ad:
 *                 type: string
 *                 example: DEF Bilişim Ltd. Şti.
 *               firma_vergi_no:
 *                 type: string
 *                 example: 5678901234
 *               firma_telefon:
 *                 type: string
 *                 example: 02161112233
 *               firma_adres:
 *                 type: string
 *                 example: Cumhuriyet Mah. No:78 İzmir
 *               firma_eposta_adresi:
 *                 type: string
 *                 example: info@defbilisim.com
 *     responses:
 *       201:
 *         description: Şirket başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Firma'
 *       400:
 *         description: Geçersiz veri
 *       500:
 *         description: Sunucu hatası
 */
router.post('/', authMiddleware, firmaController.createFirma);

/**
 * @swagger
 * /api/firmas/{id}:
 *   put:
 *     summary: Şirket bilgilerini günceller
 *     tags: [Şirketler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Şirket ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Firma'
 *     responses:
 *       200:
 *         description: Şirket başarıyla güncellendi
 *       404:
 *         description: Şirket bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.put('/:id', authMiddleware, firmaController.updateFirma);

/**
 * @swagger
 * /api/firmas/{id}:
 *   delete:
 *     summary: Şirketi siler
 *     tags: [Şirketler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Şirket ID'si
 *     responses:
 *       200:
 *         description: Şirket başarıyla silindi
 *       404:
 *         description: Şirket bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete('/:id', authMiddleware, firmaController.deleteFirma);

module.exports = router;
