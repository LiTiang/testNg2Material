// this file is let us reusing the same same connection throughout app
// omos = db name
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/omos';

module.exports = connectionString;
