import pool from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT * FROM movies WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch movie details.' });
    }
  } else {
    res.status(405).end();
  }
}
