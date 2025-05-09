const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });


require('dotenv').config({ path: '.env' });

console.log({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
  });

async function importData() {
  const data = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));

  try {
    await pool.query('BEGIN');

    for (const genre of data.genres) {
      await pool.query(
        'INSERT INTO genres (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
        [genre.id, genre.name]
      );
    }

    for (const director of data.directors) {
      await pool.query(
        'INSERT INTO directors (id, name, biography) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
        [director.id, director.name, director.biography]
      );
    }

    for (const movie of data.movies) {
      await pool.query(
        `INSERT INTO movies (id, title, description, release_year, rating, director_id, genre_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`,
        [
          movie.id,
          movie.title,
          movie.description,
          movie.releaseYear,
          movie.rating,
          movie.directorId,
          movie.genreId,
        ]
      );
    }

    await pool.query('COMMIT');
    console.log('Data imported successfully!');
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error importing data:', err);
  } finally {
    await pool.end();
  }
}

importData();
