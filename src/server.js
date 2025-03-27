require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

// Swagger bağımlılıklarını doğrudan içe aktarma
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger ayarları
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stok Yönetim Sistemi API',
      version: '1.0.0',
      description: 'Stok Yönetim Sistemi için API dokümantasyonu',
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:3000',
        description: 'Geliştirme sunucusu',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(__dirname, './routes/*.js')], // API rotalarınızın yolu
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Import routes
const authRoutes = require('./routes/auth');
const firmaRoutes = require('./routes/firma');
const stokRoutes = require('./routes/stok');
const personelRoutes = require('./routes/personel');
const tedarikciRoutes = require('./routes/tedarikci');
const siparisRoutes = require('./routes/siparis');
const reportRoutes = require('./routes/reports');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/firmas', firmaRoutes);
app.use('/api/stocks', stokRoutes);
app.use('/api/personnel', personelRoutes);
app.use('/api/suppliers', tedarikciRoutes);
app.use('/api/orders', siparisRoutes);
app.use('/api/reports', reportRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Inventory Management API' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
