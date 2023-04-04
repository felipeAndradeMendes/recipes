import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeInProgress() {
  const { id } = useParams();
  console.log(id);
  return (
    <h1>Recipe In Progress</h1>
  );
}

export default RecipeInProgress;
