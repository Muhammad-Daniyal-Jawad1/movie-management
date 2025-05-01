import {  getDirectorsWithMovies } from '../../utils/dataUtils';

export default function handler(req, res) {
  res.status(200).json(getDirectorsWithMovies());
}
