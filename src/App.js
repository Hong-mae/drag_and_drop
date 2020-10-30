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

  useEffect(() => { }, [colors]);

  const onDragStart = (e) => {
    setDragged(e.target);

    e.target.style.opacity = 0.4;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  }

  const onDragEnter = (e) => {
    e.target.classList.add("over");
  }

  const onDragLeave = (e) => {
    e.stopPropagation();
    e.target.classList.remove("over");
  }

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  const onDrop = (e) => {
    if (dragged !== e.target) {
      let data = [...colors];
      let from = Number(dragged.dataset.id);
      let to = Number(e.target.dataset.id);

      data[from] = data.splice(to, 1, data[from])[0];

      setColors(data);
    }
    return false;
  }

  const onDragEnd = (e) => {
    const list_item = document.getElementsByClassName("list_item");
    [].forEach.call(list_item, item => {
      item.classList.remove('over');
    });
    e.target.style.opacity = 1;
  }

  return (
    <div className="App">
      <ul className='list'>
        {
          colors.map((color, i) => {
            return (
              <li
                data-id={i}
                key={i}
                className="list_item"
                draggable
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              >{color}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
