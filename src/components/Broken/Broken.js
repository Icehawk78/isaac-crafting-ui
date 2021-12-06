import { 
  Grid, 
  Paper, 
  FormControl,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useState, useEffect } from 'react';

import Material from '../Material/Material';
import Recipe from '../Recipe/Recipe';
import { SeededBagOfCrafting, CraftParts, Items } from '../../lib/index';
import { RepeatedCombinations } from '../../lib/RepeatedCombinations';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [results, setResults] = useState([]);
  const [resultNames, setResultNames] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [itemFilter, setItemFilter] = useState("");
  const toggleItem = (item) => {setSelectedItems(existingItems => {
    let newItems = [...existingItems];
    const index = existingItems.indexOf(item);
    if (index > -1) {
      newItems.splice(index, 1);
    } else {
      newItems.push(item);
      newItems.sort();
    }
    return newItems;
  })};
  const items = ['b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','AA','BB','CC','DD'];

  useEffect(() => {
    if (selectedItems.length >= 1) {
      let recipes = [];
      for (let comb of RepeatedCombinations(8, selectedItems)) {
        const result = SeededBagOfCrafting.calculate(comb.map(i => CraftParts[i]['id']));
        const item = Items.get(result);
        if (item) {
          recipes.push({
            materials: comb,
            item: item,
          });
        }
      }
      recipes.sort((a,b) => a.item.name < b.item.name ? -1 : 1);
      setResults(recipes);
      setResultNames([...new Set(recipes.map(r => r.item.name))].sort());
    } else {
      setResults([]);
      setResultNames([]);
      setItemFilter("");
    }
  }, [selectedItems]);

  useEffect(() => {
    if (itemFilter !== "") {
      setFilteredResults(results.filter(r => r.item.name === itemFilter).sort((a,b) => [...new Set(a.materials)].length < [...new Set(b.materials)].length ? -1 : 1));
    } else {
      setFilteredResults([]);
    }
  }, [itemFilter, results]);
  return (
    <Grid container spacing={3}>
      {/* Item Selectors */}
      <Grid item xs={12} md={6} lg={4}>
        <Paper>
          {items.map(i => (
            <Material action={() => toggleItem(i)} type={i} />
          ))}
        </Paper>
      </Grid>
      {/* Selection Display */}
      <Grid item xs={12} md={6} lg={4}>
        <Paper>
        {selectedItems.map(i => (
            <Material action={() => toggleItem(i)} type={i} />
          )) || "No materials!"}
        </Paper>
      </Grid>
      {/* Recipes */}
      <Grid container item xs={12} m={12} lg={12}>
        <Paper>
          <Grid container xs={12}>
            <FormControl fullWidth>
              <Autocomplete 
                fullWidth
                value={itemFilter} 
                onChange={(e, newValue) => setItemFilter(newValue)}
                options={resultNames}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>
          <Grid container xs={12} spacing={2}>
          {filteredResults.map(r => (
            <Grid item xs={3}>
              <Recipe {...r} />
            </Grid>
          ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
