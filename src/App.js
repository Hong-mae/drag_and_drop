import { useState, useEffect } from 'react';
import './App.css';

const _colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Indigo',
  'Violet'
]

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

const App = () => {
  const [colors, setColors] = useState(_colors);
  const [dragged, setDragged] = useState(null);
  const [over, setOver] = useState(null);

  useEffect(() => { }, [colors]);

  const dragStart = (e) => {
    setDragged(e.currentTarget);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragged);
  }

  const dragEnd = (e) => {
    dragged.style.display = 'block';
    dragged.parentNode.removeChild(placeholder);

    // update state
    var data = [...colors];
    var from = Number(dragged.dataset.id);
    var to = Number(over.dataset.id);

    if (from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    setColors(data);
  }

  const dragOver = (e) => {
    e.preventDefault();
    dragged.style.display = "none";

    if (e.target.className === 'placeholder') return;

    setOver(e.target);
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  return (
    <div className="App">
      <ul className='list' onDragOver={dragOver}>
        {
          colors.map((color, i) => {
            return (
              <li
                data-id={i}
                key={i}
                className="list_item"
                draggable
                onDragStart={dragStart}
                onDragEnd={dragEnd}
              >{color}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
