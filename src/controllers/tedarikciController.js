const supabase = require('../config/supabase');

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tedarikci')
      .select('*');
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};

// Get supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('tedarikci')
      .select('*')
      .eq('tedarikci_id', id)
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).json({ error: 'Failed to fetch supplier' });
  }
};

// Create new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { tedarikci_ad, tedarikci_telefon_no, tedarikci_adresi, tedarikci_eposta_adresi } = req.body;
    
    const { data, error } = await supabase
      .from('tedarikci')
      .insert([{ 
        tedarikci_ad, 
        tedarikci_telefon_no, 
        tedarikci_adresi, 
        tedarikci_eposta_adresi 
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ error: 'Failed to create supplier' });
  }
};

// Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { tedarikci_ad, tedarikci_telefon_no, tedarikci_adresi, tedarikci_eposta_adresi } = req.body;
    
    const { data, error } = await supabase
      .from('tedarikci')
      .update({ 
        tedarikci_ad, 
        tedarikci_telefon_no, 
        tedarikci_adresi, 
        tedarikci_eposta_adresi 
      })
      .eq('tedarikci_id', id)
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (data.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    
    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ error: 'Failed to update supplier' });
  }
};

// Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('tedarikci')
      .delete()
      .eq('tedarikci_id', id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ error: 'Failed to delete supplier' });
  }
};
