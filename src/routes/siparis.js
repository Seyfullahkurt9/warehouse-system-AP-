const express = require('express');
const router = express.Router();
const siparisController = require('../controllers/siparisController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Siparis:
 *       type: object
 *       required:
 *         - siparis_tarihi
 *         - urun_kodu
 *         - urun_adi
 *         - urun_miktari
 *         - tedarikci_tedarikci_id
 *         - personel_personel_id
 *       properties:
 *         siparis_id:
 *           type: integer
 *           description: Sipariş ID'si
 *           example: 1
 *         siparis_tarihi:
 *           type: string
 *           format: date
 *           description: Sipariş tarihi
 *           example: 2023-05-15
 *         urun_kodu:
 *           type: string
 *           description: Ürün kodu
 *           example: PROD123
 *         urun_adi:
 *           type: string
 *           description: Ürün adı
 *           example: Dizüstü Bilgisayar
 *         urun_miktari:
 *           type: integer
 *           description: Sipariş edilen ürün miktarı
 *           example: 5
 *         tedarikci_tedarikci_id:
 *           type: integer
 *           description: Tedarikçi ID'si
 *           example: 1
 *         personel_personel_id:
 *           type: integer
 *           description: Siparişi veren personelin ID'si
 *           example: 2
 *         tedarikci:
 *           $ref: '#/components/schemas/Tedarikci'
 *         personel:
 *           $ref: '#/components/schemas/Personel'
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Tüm siparişleri listeler
 *     tags: [Siparişler]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sipariş listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Siparis'
 *             example:
 *               - siparis_id: 1
 *                 siparis_tarihi: 2023-05-15
 *                 urun_kodu: PROD123
 *                 urun_adi: Dizüstü Bilgisayar
 *                 urun_miktari: 5
 *                 tedarikci_tedarikci_id: 1
 *                 personel_personel_id: 2
 *                 tedarikci:
 *                   tedarikci_id: 1
 *                   tedarikci_ad: Örnek Teknoloji A.Ş.
 *                 personel:
 *                   personel_id: 2
 *                   personel_ad: Ahmet
 *                   personel_soyad: Yılmaz
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/', authMiddleware, siparisController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: ID'ye göre sipariş bilgilerini getirir
 *     tags: [Siparişler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sipariş ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Sipariş bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Siparis'
 *       404:
 *         description: Sipariş bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.get('/:id', authMiddleware, siparisController.getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Yeni sipariş oluşturur
 *     tags: [Siparişler]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - siparis_tarihi
 *               - urun_kodu
 *               - urun_adi
 *               - urun_miktari
 *               - tedarikci_tedarikci_id
 *               - personel_personel_id
 *             properties:
 *               siparis_tarihi:
 *                 type: string
 *                 format: date
 *                 example: 2023-05-15
 *               urun_kodu:
 *                 type: string
 *                 example: PROD123
 *               urun_adi:
 *                 type: string
 *                 example: Dizüstü Bilgisayar
 *               urun_miktari:
 *                 type: integer
 *                 example: 5
 *               tedarikci_tedarikci_id:
 *                 type: integer
 *                 example: 1
 *               personel_personel_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Sipariş başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Siparis'
 *       400:
 *         description: Geçersiz veri
 *       500:
 *         description: Sunucu hatası
 */
router.post('/', authMiddleware, siparisController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Sipariş bilgilerini günceller
 *     tags: [Siparişler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sipariş ID'si
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Siparis'
 *     responses:
 *       200:
 *         description: Sipariş başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Siparis'
 *       404:
 *         description: Sipariş bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.put('/:id', authMiddleware, siparisController.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Siparişi siler
 *     tags: [Siparişler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sipariş ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Sipariş başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order deleted successfully
 *       404:
 *         description: Sipariş bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete('/:id', authMiddleware, siparisController.deleteOrder);

/**
 * @swagger
 * /api/orders/personnel/{personnelId}:
 *   get:
 *     summary: Personel ID'sine göre siparişleri listeler
 *     tags: [Siparişler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: personnelId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Personel ID'si
 *         example: 2
 *     responses:
 *       200:
 *         description: Sipariş listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Siparis'
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/personnel/:personnelId', authMiddleware, siparisController.getOrdersByPersonnel);

/**
 * @swagger
 * /api/orders/supplier/{supplierId}:
 *   get:
 *     summary: Tedarikçi ID'sine göre siparişleri listeler
 *     tags: [Siparişler]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tedarikçi ID'si
 *         example: 1
 *     responses:
 *       200:
 *         description: Sipariş listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Siparis'
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/supplier/:supplierId', authMiddleware, siparisController.getOrdersBySupplier);

module.exports = router;
