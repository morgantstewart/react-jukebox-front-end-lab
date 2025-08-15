import { useEffect, useState } from 'react';
import { index as fetchTracks } from './services/trackService.js';

const App = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const fetchedTracks = await fetchTracks();
        setTracks(fetchedTracks);
      } catch (err) {
        console.log(err);
      }
    };
    getTracks();
  }, []);

  return <h1>Hello world!</h1>;
};







export default App;
