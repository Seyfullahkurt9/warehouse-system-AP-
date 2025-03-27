const supabase = require('../config/supabase');

// Get all stock items
exports.getAllStocks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stok')
      .select(`
        *,
        siparis:siparis_siparis_id (
          *,
          tedarikci:tedarikci_tedarikci_id (*),
          personel:personel_personel_id (*)
        )
      `);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
};

// Get stock by ID
exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('stok')
      .select(`
        *,
        siparis:siparis_siparis_id (
          *,
          tedarikci:tedarikci_tedarikci_id (*),
          personel:personel_personel_id (*)
        )
      `)
      .eq('stok_id', id)
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ error: 'Stock item not found' });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
};

// Create new stock entry
exports.createStock = async (req, res) => {
  try {
    const { stok_giris_tarihi, stok_miktari, siparis_siparis_id } = req.body;
    
    const { data, error } = await supabase
      .from('stok')
      .insert([{ 
        stok_giris_tarihi, 
        stok_miktari, 
        siparis_siparis_id 
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating stock entry:', error);
    res.status(500).json({ error: 'Failed to create stock entry' });
  }
};

// Update stock entry
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stok_giris_tarihi, stok_cikis_tarihi, stok_miktari, siparis_siparis_id } = req.body;
    
    const { data, error } = await supabase
      .from('stok')
      .update({ 
        stok_giris_tarihi, 
        stok_cikis_tarihi, 
        stok_miktari, 
        siparis_siparis_id 
      })
      .eq('stok_id', id)
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (data.length === 0) {
      return res.status(404).json({ error: 'Stock entry not found' });
    }
    
    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating stock entry:', error);
    res.status(500).json({ error: 'Failed to update stock entry' });
  }
};

// Record stock exit
exports.recordStockExit = async (req, res) => {
  try {
    const { id } = req.params;
    const { stok_cikis_tarihi, stok_miktari } = req.body;
    
    // First get current stock to validate
    const { data: currentStock, error: fetchError } = await supabase
      .from('stok')
      .select('*')
      .eq('stok_id', id)
      .single();
    
    if (fetchError || !currentStock) {
      return res.status(404).json({ error: 'Stock entry not found' });
    }
    
    // Update with exit info
    const { data, error } = await supabase
      .from('stok')
      .update({ 
        stok_cikis_tarihi,
        stok_miktari: currentStock.stok_miktari - stok_miktari
      })
      .eq('stok_id', id)
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error recording stock exit:', error);
    res.status(500).json({ error: 'Failed to record stock exit' });
  }
};

// Delete stock entry
exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('stok')
      .delete()
      .eq('stok_id', id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ message: 'Stock entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock entry:', error);
    res.status(500).json({ error: 'Failed to delete stock entry' });
  }
};
