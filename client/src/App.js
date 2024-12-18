import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000')
      
      const data = await res.json()
      
      setItems(data.items)
    }
    fetchData()

    
  })

  return (
    <div className="App">
      {
        items.map((item) => (
          <h1 key={item._id}>{item._id} --- {item.name}</h1>
        ))
      }
    </div>
  );
}

export default App;
