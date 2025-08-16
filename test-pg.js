const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: 5433,
  database: 'meb_coordination',
  user: 'postgres',
  password: 'postgres123',
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT version()');
    console.log('✅ PostgreSQL bağlantısı başarılı!');
    console.log('Versiyon:', res.rows[0].version);
  } catch (err) {
    console.error('❌ Bağlantı hatası:', err.message);
  } finally {
    await pool.end();
  }
}

testConnection();