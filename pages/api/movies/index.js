import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM movies');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch movies.' });
    }
  } else {
    res.status(405).end();
  }
}
