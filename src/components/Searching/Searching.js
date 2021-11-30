import { 
  Grid, 
  Paper, 
} from '@material-ui/core';
import { useState, useEffect } from 'react';

import Material from '../Material/Material';
import Recipe from '../Recipe/Recipe';
import { SeededBagOfCrafting, CraftParts, Items } from '../../lib/index';
import { Combinations } from '../../lib/Combinations';

function Searching() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [results, setResults] = useState([]);
  const addItem = (item) => {setSelectedItems(existingItems => [...existingItems, item].sort())}
  const removeItem = (item) => {setSelectedItems(existingItems => {
    let newItems = [...existingItems];
    const index = existingItems.indexOf(item);
    newItems.splice(index, 1);
    return newItems;
  })};
  const items = ['b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','AA','BB','CC','DD'];

  useEffect(() => {
    if (selectedItems.length >= 8) {
      const combos = [...new Set(Combinations(selectedItems, 8).map(JSON.stringify))].map(c => JSON.parse(c));
      const recipes = combos.map(c => {
        return {
          materials: c, 
          item: Items.get(SeededBagOfCrafting.calculate(c.map(i => CraftParts[i]['id'])))
        };
      }).sort((a,b) => a.item.name < b.item.name ? -1 : 1);
      console.log("Recipes: ", recipes);
      setResults(recipes);
    } else {
      setResults([]);
    }
  }, [selectedItems]);
  return (
    <Grid container spacing={3}>
        {/* Item Selectors */}
        <Grid item xs={12} md={6} lg={5}>
            <Paper>
                {items.map(i => (
                <Material action={() => addItem(i)} type={i} />
                ))}
            </Paper>
        </Grid>
        {/* Selection Display */}
        <Grid item xs={12} md={6} lg={5}>
            <Paper>
            {selectedItems.map(i => (
                <Material action={() => removeItem(i)} type={i} />
                )) || "No materials!"}
            </Paper>
        </Grid>
        {/* Recipes */}
        <Grid container item xs={12} m={12} lg={12}>
            <Paper>
                <Grid container xs={12} spacing={2}>
                {results.map(r => (
                <Grid item xs={3}>
                    <Recipe action={() => r.materials.forEach(x => removeItem(x))} {...r} />
                </Grid>
                ))}
                </Grid>
            </Paper>
        </Grid>
    </Grid>
  );
}

export default Searching;
