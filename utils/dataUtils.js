import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'movies.json');

export function getAllData() {
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(jsonData);
}

export function getAllMovies() {
  return getAllData().movies;
}

export function getAllMovieIds() {
  return getAllMovies().map(movie => ({ params: { id: movie.id } }));
}

export function getMovieById(id) {
  return getAllMovies().find(movie => movie.id === id);
}

export function getGenres() {
  return getAllData().genres;
}

export function getGenreById(id) {
  return getGenres().find(genre => genre.id === id);
}

export function getMoviesByGenreId(genreId) {
  return getAllMovies().filter(movie => movie.genreId === genreId);
}

export function getDirectors() {
  return getAllData().directors;
}

export function getDirectorById(id) {
  return getDirectors().find(d => d.id === id);
}

export function getMoviesByDirectorId(directorId) {
  return getAllMovies().filter(movie => movie.directorId === directorId);
}
