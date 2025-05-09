import pool from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT * FROM movies WHERE genre_id = $1',
        [id]
      );
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch movies by genre.' });
    }
  } else {
    res.status(405).end();
  }
}
