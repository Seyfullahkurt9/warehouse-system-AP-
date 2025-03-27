const supabase = require('../config/supabase');

// Register a new user/personnel
exports.register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone, company_id } = req.body;

    // First create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name
        }
      }
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Then create record in personel table
    const { data: personelData, error: personelError } = await supabase
      .from('personel')
      .insert([
        {
          personel_ad: first_name,
          personel_soyad: last_name,
          personel_telefon_no: phone,
          personel_eposta: email,
          // Store a reference to the auth.id or a hashed value, not the actual password
          personel_sifre: 'auth_managed',
          firma_firma_id: company_id
        }
      ]);

    if (personelError) {
      console.error('Error creating personnel record:', personelError);
      return res.status(400).json({ error: personelError.message });
    }

    res.status(201).json({ 
      message: 'User registered. Check your email for verification.',
      userId: authData.user.id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ 
      message: 'Login successful',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to log out' });
  }
};

// Reset password request
exports.resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Reset password request error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
};
