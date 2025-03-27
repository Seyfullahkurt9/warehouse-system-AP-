const supabase = require('../config/supabase');

// Generate stock summary report
exports.getStockSummary = async (req, res) => {
  try {
    const { data: stockData, error: stockError } = await supabase
      .from('stok')
      .select(`
        *,
        siparis:siparis_siparis_id (
          urun_kodu,
          urun_adi,
          tedarikci:tedarikci_tedarikci_id (tedarikci_ad)
        )
      `);
    
    if (stockError) {
      return res.status(400).json({ error: stockError.message });
    }
    
    // Aggregate stock data by product
    const stockSummary = stockData.reduce((acc, stock) => {
      const productCode = stock.siparis?.urun_kodu;
      
      if (!productCode) return acc;
      
      if (!acc[productCode]) {
        acc[productCode] = {
          product_code: productCode,
          product_name: stock.siparis?.urun_adi || 'Unknown Product',
          supplier: stock.siparis?.tedarikci?.tedarikci_ad || 'Unknown Supplier',
          total_quantity: 0,
          available_quantity: 0,
          last_entry_date: null
        };
      }
      
      acc[productCode].total_quantity += stock.stok_miktari;
      
      // If no exit date, add to available quantity
      if (!stock.stok_cikis_tarihi) {
        acc[productCode].available_quantity += stock.stok_miktari;
      }
      
      // Update last entry date if newer
      const entryDate = new Date(stock.stok_giris_tarihi);
      if (!acc[productCode].last_entry_date || 
          entryDate > new Date(acc[productCode].last_entry_date)) {
        acc[productCode].last_entry_date = stock.stok_giris_tarihi;
      }
      
      return acc;
    }, {});
    
    // Convert to array
    const result = Object.values(stockSummary);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error generating stock summary:', error);
    res.status(500).json({ error: 'Failed to generate stock summary' });
  }
};

// Generate low stock alert report
exports.getLowStockAlerts = async (req, res) => {
  try {
    const minThreshold = req.query.threshold || 10; // Default threshold is 10
    
    const { data: stockData, error: stockError } = await supabase
      .from('stok')
      .select(`
        *,
        siparis:siparis_siparis_id (
          urun_kodu,
          urun_adi,
          tedarikci:tedarikci_tedarikci_id (tedarikci_ad, tedarikci_telefon_no)
        )
      `);
    
    if (stockError) {
      return res.status(400).json({ error: stockError.message });
    }
    
    // Aggregate available stock by product
    const stockByProduct = stockData.reduce((acc, stock) => {
      const productCode = stock.siparis?.urun_kodu;
      
      if (!productCode) return acc;
      
      if (!acc[productCode]) {
        acc[productCode] = {
          product_code: productCode,
          product_name: stock.siparis?.urun_adi || 'Unknown Product',
          supplier: stock.siparis?.tedarikci?.tedarikci_ad || 'Unknown Supplier',
          supplier_phone: stock.siparis?.tedarikci?.tedarikci_telefon_no || 'N/A',
          available_quantity: 0
        };
      }
      
      // If no exit date, add to available quantity
      if (!stock.stok_cikis_tarihi) {
        acc[productCode].available_quantity += stock.stok_miktari;
      }
      
      return acc;
    }, {});
    
    // Filter products with quantity below threshold
    const lowStockItems = Object.values(stockByProduct).filter(
      item => item.available_quantity < minThreshold
    );
    
    res.status(200).json(lowStockItems);
  } catch (error) {
    console.error('Error generating low stock alerts:', error);
    res.status(500).json({ error: 'Failed to generate low stock alerts' });
  }
};

// Generate stock movement report by date range
exports.getStockMovementByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }
    
    // Get all stock entries and exits within date range
    const { data: stockData, error: stockError } = await supabase
      .from('stok')
      .select(`
        *,
        siparis:siparis_siparis_id (
          urun_kodu,
          urun_adi,
          personel:personel_personel_id (personel_ad, personel_soyad)
        )
      `)
      .or(`stok_giris_tarihi.gte.${startDate},stok_cikis_tarihi.gte.${startDate}`)
      .or(`stok_giris_tarihi.lte.${endDate},stok_cikis_tarihi.lte.${endDate}`);
    
    if (stockError) {
      return res.status(400).json({ error: stockError.message });
    }
    
    // Process data for visualization
    const stockMovements = stockData.map(stock => {
      // Create an entry movement if entry date is within range
      const entryDate = new Date(stock.stok_giris_tarihi);
      const entry = entryDate >= new Date(startDate) && entryDate <= new Date(endDate) 
        ? {
            date: stock.stok_giris_tarihi,
            product_code: stock.siparis?.urun_kodu || 'Unknown',
            product_name: stock.siparis?.urun_adi || 'Unknown',
            quantity: stock.stok_miktari,
            type: 'entry',
            personnel: stock.siparis?.personel ? 
              `${stock.siparis.personel.personel_ad} ${stock.siparis.personel.personel_soyad}` : 'Unknown'
          }
        : null;
      
      // Create an exit movement if exit date is within range
      const exitDate = stock.stok_cikis_tarihi ? new Date(stock.stok_cikis_tarihi) : null;
      const exit = exitDate && exitDate >= new Date(startDate) && exitDate <= new Date(endDate)
        ? {
            date: stock.stok_cikis_tarihi,
            product_code: stock.siparis?.urun_kodu || 'Unknown',
            product_name: stock.siparis?.urun_adi || 'Unknown',
            quantity: stock.stok_miktari,
            type: 'exit',
            personnel: stock.siparis?.personel ? 
              `${stock.siparis.personel.personel_ad} ${stock.siparis.personel.personel_soyad}` : 'Unknown'
          }
        : null;
      
      // Return array of valid movements
      return [entry, exit].filter(Boolean);
    });
    
    // Flatten the array
    const result = stockMovements.flat();
    
    // Sort by date
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error generating stock movement report:', error);
    res.status(500).json({ error: 'Failed to generate stock movement report' });
  }
};
