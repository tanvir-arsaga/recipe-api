// routes/recipes.js
const express = require('express');
const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../db/recipeQueries');

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await getRecipeById(id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error retrieving recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST new recipe
router.post('/', async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  try {
    const newRecipeId = await createRecipe(name, ingredients, instructions);
    res.status(201).json({ id: newRecipeId, message: 'Recipe created successfully' });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update recipe
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  try {
    await updateRecipe(id, name, ingredients, instructions);
    res.json({ message: 'Recipe updated successfully' });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRecipe(id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
