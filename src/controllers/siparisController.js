const supabase = require('../config/supabase');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('siparis')
      .select(`
        *,
        tedarikci:tedarikci_tedarikci_id (*),
        personel:personel_personel_id (*)
      `);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('siparis')
      .select(`
        *,
        tedarikci:tedarikci_tedarikci_id (*),
        personel:personel_personel_id (*)
      `)
      .eq('siparis_id', id)
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { 
      siparis_tarihi, 
      urun_kodu, 
      urun_adi, 
      urun_miktari, 
      tedarikci_tedarikci_id, 
      personel_personel_id 
    } = req.body;
    
    const { data, error } = await supabase
      .from('siparis')
      .insert([{ 
        siparis_tarihi, 
        urun_kodu, 
        urun_adi, 
        urun_miktari, 
        tedarikci_tedarikci_id, 
        personel_personel_id 
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      siparis_tarihi, 
      urun_kodu, 
      urun_adi, 
      urun_miktari, 
      tedarikci_tedarikci_id, 
      personel_personel_id 
    } = req.body;
    
    const { data, error } = await supabase
      .from('siparis')
      .update({ 
        siparis_tarihi, 
        urun_kodu, 
        urun_adi, 
        urun_miktari, 
        tedarikci_tedarikci_id, 
        personel_personel_id 
      })
      .eq('siparis_id', id)
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (data.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('siparis')
      .delete()
      .eq('siparis_id', id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

// Get orders by personnel ID
exports.getOrdersByPersonnel = async (req, res) => {
  try {
    const { personnelId } = req.params;
    
    const { data, error } = await supabase
      .from('siparis')
      .select(`
        *,
        tedarikci:tedarikci_tedarikci_id (*),
        personel:personel_personel_id (*)
      `)
      .eq('personel_personel_id', personnelId);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching personnel orders:', error);
    res.status(500).json({ error: 'Failed to fetch personnel orders' });
  }
};

// Get orders by supplier ID
exports.getOrdersBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    
    const { data, error } = await supabase
      .from('siparis')
      .select(`
        *,
        tedarikci:tedarikci_tedarikci_id (*),
        personel:personel_personel_id (*)
      `)
      .eq('tedarikci_tedarikci_id', supplierId);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching supplier orders:', error);
    res.status(500).json({ error: 'Failed to fetch supplier orders' });
  }
};
