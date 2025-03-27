const supabase = require('../config/supabase');

// Get all companies
exports.getAllFirmas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('firma')
      .select('*');
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

// Get company by ID
exports.getFirmaById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('firma')
      .select('*')
      .eq('firma_id', id)
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
};

// Create new company
exports.createFirma = async (req, res) => {
  try {
    const { firma_ad, firma_vergi_no, firma_telefon, firma_adres, firma_eposta_adresi } = req.body;
    
    const { data, error } = await supabase
      .from('firma')
      .insert([{ 
        firma_ad, 
        firma_vergi_no, 
        firma_telefon, 
        firma_adres, 
        firma_eposta_adresi 
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
};

// Update company
exports.updateFirma = async (req, res) => {
  try {
    const { id } = req.params;
    const { firma_ad, firma_vergi_no, firma_telefon, firma_adres, firma_eposta_adresi } = req.body;
    
    const { data, error } = await supabase
      .from('firma')
      .update({ 
        firma_ad, 
        firma_vergi_no, 
        firma_telefon, 
        firma_adres, 
        firma_eposta_adresi 
      })
      .eq('firma_id', id)
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (data.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
};

// Delete company
exports.deleteFirma = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('firma')
      .delete()
      .eq('firma_id', id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
};
