# Stok Yönetim Sistemi API

Supabase tabanlı bir envanter ve stok yönetim sistemi için RESTful API.

## Özellikler

- Kullanıcı Kimlik Doğrulama ve Yetkilendirme
- E-posta Doğrulaması
- Rol Tabanlı Erişim Kontrolü
- Şirket Yönetimi
- Personel Yönetimi
- Tedarikçi Yönetimi
- Sipariş İşleme
- Stok/Envanter Yönetimi
- Raporlama ve Analiz
- Kapsamlı Hata Yönetimi
- Swagger/OpenAPI ile API Dokümantasyonu

## Teknoloji Yığını

- **Backend**: Node.js ve Express
- **Veritabanı**: Supabase (PostgreSQL)
- **Kimlik Doğrulama**: Supabase Auth
- **Dokümantasyon**: Swagger/OpenAPI

## Başlangıç

### Gereksinimler

- Node.js >= 14.0.0
- Supabase hesabı ve projesi
- DATABASE_SCHEMA.md'de tanımlanan veritabanı tabloları

### Kurulum

1. Repoyu klonlayın
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Ortam değişkenlerini yapılandırın:
   `.env.example` dosyasını `.env` olarak kopyalayın ve Supabase kimlik bilgilerinizi doldurun:
   ```
   SUPABASE_URL=https://yourproject.supabase.co
   SUPABASE_KEY=your-supabase-key
   ```

4. Veritabanı kurulum kontrolünü çalıştırın:
   ```bash
   npm run setup-db
   ```

5. Sunucuyu başlatın:
   ```bash
   npm run dev
   ```

6. API dokümantasyonuna erişin:
   ```
   http://localhost:3000/api-docs
   ```

## API Endpointleri

API'nin tüm endpointleri Swagger dokümantasyonunda detaylı olarak belgelenmiştir. Sunucuyu başlattıktan sonra `/api-docs` adresini ziyaret ederek tüm API endpoint'lerini ve örnek istek/yanıtları görebilirsiniz.

### Kimlik Doğrulama

- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Kullanıcı çıkışı
- `POST /api/auth/reset-password` - Şifre sıfırlama isteği

### Şirket Yönetimi

- `GET /api/firmas` - Tüm şirketleri listele
- `GET /api/firmas/:id` - ID'ye göre şirket bilgisini getir
- `POST /api/firmas` - Yeni şirket oluştur
- `PUT /api/firmas/:id` - Şirket bilgilerini güncelle
- `DELETE /api/firmas/:id` - Şirket sil

### Personel Yönetimi

- `GET /api/personnel` - Tüm personeli listele
- `GET /api/personnel/:id` - ID'ye göre personel bilgisini getir
- `PUT /api/personnel/:id` - Personel bilgilerini güncelle
- `DELETE /api/personnel/:id` - Personel sil
- `GET /api/personnel/company/:companyId` - Şirkete göre personeli listele

### Tedarikçi Yönetimi

- `GET /api/suppliers` - Tüm tedarikçileri listele
- `GET /api/suppliers/:id` - ID'ye göre tedarikçi bilgisini getir
- `POST /api/suppliers` - Yeni tedarikçi oluştur
- `PUT /api/suppliers/:id` - Tedarikçi bilgilerini güncelle
- `DELETE /api/suppliers/:id` - Tedarikçi sil

### Sipariş Yönetimi

- `GET /api/orders` - Tüm siparişleri listele
- `GET /api/orders/:id` - ID'ye göre sipariş bilgisini getir
- `POST /api/orders` - Yeni sipariş oluştur
- `PUT /api/orders/:id` - Sipariş bilgilerini güncelle
- `DELETE /api/orders/:id` - Sipariş sil
- `GET /api/orders/personnel/:personnelId` - Personele göre siparişleri listele
- `GET /api/orders/supplier/:supplierId` - Tedarikçiye göre siparişleri listele

### Stok Yönetimi

- `GET /api/stocks` - Tüm stok kayıtlarını listele
- `GET /api/stocks/:id` - ID'ye göre stok kaydını getir
- `POST /api/stocks` - Yeni stok girişi oluştur
- `PUT /api/stocks/:id` - Stok kaydını güncelle
- `PATCH /api/stocks/:id/exit` - Stok çıkışı kaydet
- `DELETE /api/stocks/:id` - Stok kaydını sil

### Raporlama

- `GET /api/reports/stock-summary` - Stok özetini getir
- `GET /api/reports/low-stock-alerts` - Düşük stok uyarılarını getir
- `GET /api/reports/stock-movement` - Tarih aralığına göre stok hareketlerini getir

## API Testi

API'nizi test etmek için aşağıdaki yöntemlerden birini kullanabilirsiniz:

### Swagger UI

API dokümantasyonundaki "Try it out" özelliğini kullanarak doğrudan tarayıcıdan istekleri test edebilirsiniz:

1. `/api-docs` sayfasını ziyaret edin
2. Test etmek istediğiniz endpoint'i seçin
3. "Try it out" butonuna tıklayın
4. İstek parametrelerini doldurun
5. "Execute" butonuna tıklayın
6. Yanıtı kontrol edin

### Postman

[Postman](https://www.postman.com/) ile daha kapsamlı testler yapabilirsiniz:

1. Postman'de yeni bir koleksiyon oluşturun
2. Önce `/api/auth/register` ve `/api/auth/login` endpoint'leriyle bir kullanıcı oluşturun
3. Login yanıtından gelen token'ı diğer isteklerin Authorization başlığına ekleyin:
   - Header: `Authorization: Bearer YOUR_TOKEN_HERE`
4. Diğer API endpoint'lerini test edin

### cURL Komutları

Terminal üzerinden hızlıca test etmek için cURL kullanabilirsiniz:

```bash
# Kullanıcı girişi
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}'

# Alınan token ile şirketleri listele
curl -X GET http://localhost:3000/api/firmas \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Veritabanı Şeması

Veritabanı şeması `DATABASE_SCHEMA.md` dosyasında detaylı olarak açıklanmıştır. Ana tablolar:

- `firma` - Şirket bilgileri
- `personel` - Personel bilgileri
- `tedarikci` - Tedarikçi bilgileri
- `siparis` - Sipariş kayıtları
- `stok` - Stok hareketleri

## Güvenlik Özellikleri

- JWT tabanlı kimlik doğrulama
- Rol tabanlı erişim kontrolü 
- Veri doğrulama
- Kapsamlı hata yönetimi

## Proje Yapısı

```
.
├── src/                    # Kaynak kodlar
│   ├── config/             # Yapılandırma dosyaları
│   │   ├── supabase.js     # Supabase client yapılandırması
│   │   └── db-setup.js     # Veritabanı kurulum kontrolü
│   ├── controllers/        # İş mantığı ve veri işleme
│   ├── middleware/         # Express middleware fonksiyonları
│   │   ├── auth.js         # Kimlik doğrulama middleware
│   │   ├── validate.js     # Veri doğrulama middleware
│   │   ├── roles.js        # Rol tabanlı erişim kontrolü
│   │   └── errorHandler.js # Hata işleme middleware
│   ├── routes/             # API rotaları
│   ├── utils/              # Yardımcı fonksiyonlar
│   │   └── swagger.js      # Swagger yapılandırması
│   └── server.js           # Ana uygulama dosyası
├── .env                    # Ortam değişkenleri
├── .gitignore              # Git tarafından yok sayılacak dosyalar
├── DATABASE_SCHEMA.md      # Veritabanı şema açıklamaları
├── package.json            # Proje bağımlılıkları ve komutları
└── README.md               # Proje dökümantasyonu
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.