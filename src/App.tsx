// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import CrudDemo from './components/CrudDemo';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '30px',
      }}
    >
      <h2>Vite app </h2>
      <CrudDemo />
    </div>
  );
}

export default App;
