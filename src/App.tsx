import React from 'react';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary" onClick={() => alert("lolwat") }>
      Hello World
    </Button>
  );
}

export default App;
