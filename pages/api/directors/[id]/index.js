import pool from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const directorResult = await pool.query(
        'SELECT * FROM directors WHERE id = $1',
        [id]
      );

      if (directorResult.rows.length === 0) {
        return res.status(404).json({ error: 'Director not found' });
      }

      const moviesResult = await pool.query(
        'SELECT * FROM movies WHERE director_id = $1',
        [id]
      );

      res.status(200).json({
        ...directorResult.rows[0],
        movies: moviesResult.rows,
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch director details.' });
    }
  } else {
    res.status(405).end();
  }
}
