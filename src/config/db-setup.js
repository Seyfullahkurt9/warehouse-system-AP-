require('dotenv').config();
const supabase = require('./supabase');

async function checkDatabaseSetup() {
  console.log('Checking database setup...');
  
  try {
    // Check if essential tables exist
    const requiredTables = ['firma', 'personel', 'tedarikci', 'siparis', 'stok'];
    
    for (const table of requiredTables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.error(`Table ${table} might not exist or has issues:`, error.message);
      } else {
        console.log(`Table ${table} exists and is accessible.`);
      }
    }
    
    console.log('Database check completed.');
  } catch (error) {
    console.error('Database setup check failed:', error);
  }
}

checkDatabaseSetup()
  .then(() => {
    console.log('Setup check finished.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Setup check failed:', err);
    process.exit(1);
  });
