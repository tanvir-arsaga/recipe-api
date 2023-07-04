// db/recipeQueries.js
const pool = require('../db/db');

// GET all recipes
const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// GET recipe by ID
const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM recipes WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// POST new recipe
const createRecipe = (name, ingredients, instructions) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)',
      [name, ingredients, instructions],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
};

// PUT update recipe
const updateRecipe = (id, name, ingredients, instructions) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id = ?',
      [name, ingredients, instructions, id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

// DELETE recipe
const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM recipes WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
