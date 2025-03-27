Collecting workspace information

# Proje Yapısı ve Paketlerin Açıklaması

Bu stok yönetim sistemi, Node.js ve Express.js kullanılarak geliştirilmiş bir RESTful API projesidir. Projenin yapısı ve kullanılan paketler şu şekildedir:

## Klasör Yapısı

### src/

Ana kaynak kodların bulunduğu klasör.

- **config/**: Yapılandırma dosyalarını içerir
    
    - [supabase.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Supabase bağlantı ayarlarını yapılandırır
    - [db-setup.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Veritabanı kurulum kontrolü sağlar
- **controllers/**: API endpoint'lerinin iş mantığının uygulandığı dosyalar
    
    - [authController.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Kimlik doğrulama işlemleri (kayıt, giriş, çıkış)
    - [firmaController.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Şirket yönetimi işlemleri
    - [personelController.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Personel yönetimi işlemleri
    - [reportController.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Raporlama işlemleri
    - [siparisController.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Sipariş yönetimi işlemleri
    - [stokController.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Stok yönetimi işlemleri
    - [tedarikciController.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Tedarikçi yönetimi işlemleri
- **middleware/**: Express middleware fonksiyonları
    
    - [auth.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): JWT token doğrulama
    - [errorHandler.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Hata yakalama ve işleme
    - [roles.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Rol tabanlı erişim kontrolü
    - [validate.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): İstek verilerini doğrulama
- **routes/**: API endpoint'lerinin tanımlandığı dosyalar
    
    - [auth.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Kimlik doğrulama rotaları
    - [firma.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Şirket yönetimi rotaları
    - [personel.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Personel yönetimi rotaları
    - [reports.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Raporlama rotaları
    - [siparis.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Sipariş yönetimi rotaları
    - [stok.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Stok yönetimi rotaları
    - [tedarikci.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Tedarikçi yönetimi rotaları
- **utils/**: Yardımcı fonksiyonlar
    
    - [swagger.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Swagger/OpenAPI dokümantasyon yapılandırması
- **server.js**: Uygulamanın ana giriş noktası ve Express sunucusunun yapılandırıldığı dosya
    

## Kullanılan Paketler

### Temel Paketler

- **express**: Web uygulaması geliştirmek için minimalist ve esnek bir Node.js web uygulama çatısı
- **@supabase/supabase-js**: Supabase veritabanı ile etkileşim kurmak için resmi JavaScript istemcisi
- **dotenv**: Ortam değişkenlerini [.env](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) dosyasından yükler ve process.env içinde kullanılabilir hale getirir
- **cors**: Cross-Origin Resource Sharing (CORS) için Express middleware. Farklı kaynaklardan (domain) API isteklerinin yapılmasına izin verir

### API Dokümantasyon Paketleri

- **swagger-jsdoc**: JSDoc yorumlarından Swagger/OpenAPI spesifikasyonu oluşturur
- **swagger-ui-express**: Swagger UI'ı Express uygulamasına entegre ederek API dokümantasyonu sağlar

### Geliştirme Araçları

- **nodemon**: Dosya değişikliklerini izleyerek sunucuyu otomatik olarak yeniden başlatan bir geliştirme aracı

## Uygulama Akışı

1. **server.js** dosyası ile Express sunucusu başlatılır
2. Middleware'ler (cors, json parser) eklenir
3. API rotaları tanımlanır ve ilgili endpoint'ler belirlenir
4. Swagger/OpenAPI dokümantasyonu yapılandırılır
5. Her API çağrısında:
    - Kimlik doğrulama ([auth.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)) kontrol edilir
    - İstek verileri doğrulanır ([validate.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html))
    - Controller'daki ilgili fonksiyon çağrılır
    - Controller, Supabase veritabanı ile etkileşime girer
    - Yanıt, istemciye döndürülür
6. Hatalar, [errorHandler.js](vscode-file://vscode-app/c:/Users/Seyfullah%20Kurt/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) tarafından yakalanır ve işlenir

Bu yapı, MVC (Model-View-Controller) desenini takip eder, ancak View katmanı olmadan. Veritabanı işlemleri Supabase ile gerçekleştirilir ve bu, model katmanının yerini alır.