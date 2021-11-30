import './App.css';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Typography,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import Searching from '../Searching/Searching';
import Broken from '../Broken/Broken';
import { BagOfCrafting, SeededBagOfCrafting, Items } from '../../lib/index';


window.BagOfCrafting = BagOfCrafting;
window.SeededBagOfCrafting = SeededBagOfCrafting;
window.Items = Items;

function App() {
  const [isBroken, setIsBroken] = useState(false);
  const [seed, setSeed] = useState('');
  const [seedValid, setSeedValid] = useState(false);

  useEffect(() => {
    const valid = SeededBagOfCrafting.str2seed(seed) != 0; 
    setSeedValid(valid);
    if (valid) {
      SeededBagOfCrafting.setSeed(seed);
    }
  }, [seed]);

  const handleSeedChange = (event) => setSeed(event.target.value);
  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" aria-label="menu" onClick={() => setIsBroken(!isBroken)}>
            <Menu />
          </IconButton>
          <Typography variant="h6">{isBroken ? '(Broken) ' : ''}Isaac Crafting</Typography>
          <TextField id="seed" variant="filled" helperText="seed" value={seed} onChange={handleSeedChange} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {!seedValid && <div>Valid Seed Required</div>}
        {seedValid && isBroken && <Broken />}
        {seedValid && !isBroken && <Searching />}
      </Container>
    </div>
  );
}

export default App;
