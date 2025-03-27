const supabase = require('../config/supabase');

// Get all personnel
exports.getAllPersonnel = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('personel')
      .select('*, firma:firma_firma_id (*)');
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching personnel:', error);
    res.status(500).json({ error: 'Failed to fetch personnel' });
  }
};

// Get personnel by ID
exports.getPersonnelById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('personel')
      .select('*, firma:firma_firma_id (*)')
      .eq('personel_id', id)
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ error: 'Personnel not found' });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching personnel:', error);
    res.status(500).json({ error: 'Failed to fetch personnel' });
  }
};

// Update personnel
exports.updatePersonnel = async (req, res) => {
  try {
    const { id } = req.params;
    const { personel_ad, personel_soyad, personel_telefon_no, personel_eposta, firma_firma_id } = req.body;
    
    const { data, error } = await supabase
      .from('personel')
      .update({ 
        personel_ad, 
        personel_soyad, 
        personel_telefon_no, 
        personel_eposta,
        firma_firma_id
      })
      .eq('personel_id', id)
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (data.length === 0) {
      return res.status(404).json({ error: 'Personnel not found' });
    }
    
    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating personnel:', error);
    res.status(500).json({ error: 'Failed to update personnel' });
  }
};

// Delete personnel
exports.deletePersonnel = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('personel')
      .delete()
      .eq('personel_id', id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ message: 'Personnel deleted successfully' });
  } catch (error) {
    console.error('Error deleting personnel:', error);
    res.status(500).json({ error: 'Failed to delete personnel' });
  }
};

// Get personnel by company ID
exports.getPersonnelByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    
    const { data, error } = await supabase
      .from('personel')
      .select('*')
      .eq('firma_firma_id', companyId);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching company personnel:', error);
    res.status(500).json({ error: 'Failed to fetch company personnel' });
  }
};
