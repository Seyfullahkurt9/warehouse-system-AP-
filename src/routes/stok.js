const express = require('express');
const router = express.Router();
const stokController = require('../controllers/stokController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Stok:
 *       type: object
 *       required:
 *         - stok_giris_tarihi
 *         - stok_miktari
 *         - siparis_siparis_id
 *       properties:
 *         stok_id:
 *           type: integer
 *           description: Stok kaydı ID'si
 *         stok_giris_tarihi:
 *           type: string
 *           format: date
 *           description: Stok giriş tarihi
 *         stok_cikis_tarihi:
 *           type: string
 *           format: date
 *           description: Stok çıkış tarihi (varsa)
 *         stok_miktari:
 *           type: integer
 *           description: Stok miktarı
 *         siparis_siparis_id:
 *           type: integer
 *           description: İlgili sipariş ID'si
 */

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Tüm stok kayıtlarını listeler
 *     tags: [Stok]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stok kayıtları listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stok'
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/', authMiddleware, stokController.getAllStocks);

/**
 * @swagger
 * /api/stocks/{id}:
 *   get:
 *     summary: ID'ye göre stok kaydını getirir
 *     tags: [Stok]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Stok kaydı ID'si
 *     responses:
 *       200:
 *         description: Stok bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stok'
 *       404:
 *         description: Stok kaydı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.get('/:id', authMiddleware, stokController.getStockById);

/**
 * @swagger
 * /api/stocks:
 *   post:
 *     summary: Yeni stok girişi oluşturur
 *     tags: [Stok]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stok_giris_tarihi
 *               - stok_miktari
 *               - siparis_siparis_id
 *             properties:
 *               stok_giris_tarihi:
 *                 type: string
 *                 format: date
 *               stok_miktari:
 *                 type: integer
 *               siparis_siparis_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Stok girişi başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz veri
 *       500:
 *         description: Sunucu hatası
 */
router.post('/', authMiddleware, stokController.createStock);

/**
 * @swagger
 * /api/stocks/{id}:
 *   put:
 *     summary: Stok kaydını günceller
 *     tags: [Stok]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Stok kaydı ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stok'
 *     responses:
 *       200:
 *         description: Stok kaydı başarıyla güncellendi
 *       404:
 *         description: Stok kaydı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.put('/:id', authMiddleware, stokController.updateStock);

/**
 * @swagger
 * /api/stocks/{id}/exit:
 *   patch:
 *     summary: Stok çıkışı kaydeder
 *     tags: [Stok]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Stok kaydı ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stok_cikis_tarihi
 *               - stok_miktari
 *             properties:
 *               stok_cikis_tarihi:
 *                 type: string
 *                 format: date
 *               stok_miktari:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stok çıkışı başarıyla kaydedildi
 *       404:
 *         description: Stok kaydı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.patch('/:id/exit', authMiddleware, stokController.recordStockExit);

/**
 * @swagger
 * /api/stocks/{id}:
 *   delete:
 *     summary: Stok kaydını siler
 *     tags: [Stok]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Stok kaydı ID'si
 *     responses:
 *       200:
 *         description: Stok kaydı başarıyla silindi
 *       404:
 *         description: Stok kaydı bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete('/:id', authMiddleware, stokController.deleteStock);

module.exports = router;
