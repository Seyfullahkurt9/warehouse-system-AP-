const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');
const validate = require('../middleware/validate');

/**
 * @swagger
 * components:
 *   schemas:
 *     StockSummary:
 *       type: object
 *       properties:
 *         product_code:
 *           type: string
 *           description: Ürün kodu
 *           example: PROD123
 *         product_name:
 *           type: string
 *           description: Ürün adı
 *           example: Dizüstü Bilgisayar
 *         supplier:
 *           type: string
 *           description: Tedarikçi adı
 *           example: Örnek Teknoloji A.Ş.
 *         total_quantity:
 *           type: integer
 *           description: Toplam stok miktarı
 *           example: 20
 *         available_quantity:
 *           type: integer
 *           description: Kullanılabilir stok miktarı
 *           example: 15
 *         last_entry_date:
 *           type: string
 *           format: date
 *           description: Son stok giriş tarihi
 *           example: 2023-05-15
 *     LowStockAlert:
 *       type: object
 *       properties:
 *         product_code:
 *           type: string
 *           description: Ürün kodu
 *           example: PROD456
 *         product_name:
 *           type: string
 *           description: Ürün adı
 *           example: Monitör
 *         supplier:
 *           type: string
 *           description: Tedarikçi adı
 *           example: Test Bilgisayar Ltd.
 *         supplier_phone:
 *           type: string
 *           description: Tedarikçi telefon numarası
 *           example: 02169876543
 *         available_quantity:
 *           type: integer
 *           description: Kullanılabilir stok miktarı
 *           example: 5
 *     StockMovement:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Hareket tarihi
 *           example: 2023-05-15
 *         product_code:
 *           type: string
 *           description: Ürün kodu
 *           example: PROD123
 *         product_name:
 *           type: string
 *           description: Ürün adı
 *           example: Dizüstü Bilgisayar
 *         quantity:
 *           type: integer
 *           description: Hareket miktarı
 *           example: 5
 *         type:
 *           type: string
 *           enum: [entry, exit]
 *           description: Hareket tipi
 *           example: entry
 *         personnel:
 *           type: string
 *           description: Hareketi gerçekleştiren personel
 *           example: Ahmet Yılmaz
 */

/**
 * @swagger
 * /api/reports/stock-summary:
 *   get:
 *     summary: Stok özeti raporu getirir
 *     tags: [Raporlar]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stok özeti
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockSummary'
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/stock-summary', 
  authMiddleware, 
  reportController.getStockSummary
);

/**
 * @swagger
 * /api/reports/low-stock-alerts:
 *   get:
 *     summary: Düşük stok uyarıları raporu getirir
 *     tags: [Raporlar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Eşik değeri (bu değerin altındaki stoklar için uyarı)
 *     responses:
 *       200:
 *         description: Düşük stok uyarıları
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LowStockAlert'
 *       401:
 *         description: Yetkilendirme hatası
 *       500:
 *         description: Sunucu hatası
 */
router.get('/low-stock-alerts', 
  authMiddleware,
  validate({
    threshold: { type: 'number', required: false, min: 1 }
  }), 
  reportController.getLowStockAlerts
);

/**
 * @swagger
 * /api/reports/stock-movement:
 *   get:
 *     summary: Belirli bir tarih aralığındaki stok hareketlerini getirir
 *     tags: [Raporlar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Başlangıç tarihi (YYYY-MM-DD)
 *         example: 2023-01-01
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Bitiş tarihi (YYYY-MM-DD)
 *         example: 2023-05-31
 *     responses:
 *       200:
 *         description: Stok hareketleri
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockMovement'
 *       400:
 *         description: Geçersiz tarih aralığı
 *       401:
 *         description: Yetkilendirme hatası
 *       403:
 *         description: Yetersiz yetki
 *       500:
 *         description: Sunucu hatası
 */
router.get('/stock-movement', 
  authMiddleware,
  checkRole(['admin', 'manager']),
  validate({
    startDate: { type: 'string', required: true },
    endDate: { type: 'string', required: true }
  }),
  reportController.getStockMovementByDateRange
);

module.exports = router;
