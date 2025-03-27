const express = require('express');
const router = express.Router();
const tedarikciController = require('../controllers/tedarikciController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Tedarikci:
 *       type: object
 *       required:
 *         - tedarikci_ad
 *       properties:
 *         tedarikci_id:
 *           type: integer
 *           description: Tedarikçi ID'si
 *           example: 1
 *         tedarikci_ad:
 *           type: string
 *           description: Tedarikçi adı
 *           example: Örnek Teknoloji A.Ş.
 *         tedarikci_telefon_no:
 *           type: string
 *           description: Tedarikçi telefon numarası
 *           example: 02128765432
 *         tedarikci_adresi:
 *           type: string
 *           description: Tedarikçi adresi
 *           example: Bağdat Cad. No:789 İstanbul
 *         tedarikci_eposta_adresi:
 *           type: string
 *           description: Tedarikçi e-posta adresi
 *           example: info@ornekteknoloji.com
 */

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Tüm tedarikçileri listeler
 *     tags: [Tedarikçiler]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tedarikçi listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tedarikci'
 *             example:
 *               - tedarikci_id: 1
 *                 tedarikci_ad: Örnek Teknoloji A.Ş.
 *                 tedarikci_telefon_no: 02128765432
 *                 tedarikci_adresi: Bağdat Cad. No:789 İstanbul
 *                 tedarikci_eposta_adresi: info@ornekteknoloji.com
 *               - tedarikci_id: 2
 *                 tedarikci_ad: Test Bilgisayar Ltd.
 *                 tedarikci_telefon_no: 02169876543
 *                 tedarikci_adresi: Atatürk Cad. No:456 Ankara
 *                 tedarikci_eposta_adresi: info@testbilgisayar.com
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/', authMiddleware, tedarikciController.getAllSuppliers);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     summary: ID'ye göre tedarikçi bilgilerini getirir
 *     tags: [Tedarikçiler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tedarikçi ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Tedarikçi bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tedarikci'
 *       404:
 *         description: Tedarikçi bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Supplier not found
 *       500:
 *         description: Sunucu hatası
 */
router.get('/:id', authMiddleware, tedarikciController.getSupplierById);

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Yeni tedarikçi oluşturur
 *     tags: [Tedarikçiler]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tedarikci_ad
 *             properties:
 *               tedarikci_ad:
 *                 type: string
 *                 example: Yeni Tedarikçi Ltd.
 *               tedarikci_telefon_no:
 *                 type: string
 *                 example: 02165557788
 *               tedarikci_adresi:
 *                 type: string
 *                 example: İnönü Mah. No:45 İzmir
 *               tedarikci_eposta_adresi:
 *                 type: string
 *                 example: info@yenitedarikci.com
 *     responses:
 *       201:
 *         description: Tedarikçi başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tedarikci'
 *       400:
 *         description: Geçersiz veri
 *       500:
 *         description: Sunucu hatası
 */
router.post('/', authMiddleware, tedarikciController.createSupplier);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     summary: Tedarikçi bilgilerini günceller
 *     tags: [Tedarikçiler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tedarikçi ID'si
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tedarikci'
 *     responses:
 *       200:
 *         description: Tedarikçi başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tedarikci'
 *       404:
 *         description: Tedarikçi bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.put('/:id', authMiddleware, tedarikciController.updateSupplier);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Tedarikçiyi siler
 *     tags: [Tedarikçiler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tedarikçi ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Tedarikçi başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Supplier deleted successfully
 *       404:
 *         description: Tedarikçi bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete('/:id', authMiddleware, tedarikciController.deleteSupplier);

module.exports = router;
