import { useState, useEffect } from 'react';

import styled from 'styled-components';

const _colors = [
  {
    name: 'Red',
    textColor: "white",
  },
  {
    name: 'Orange',
    textColor: "black",
  },
  {
    name: 'Yellow',
    textColor: "black",
  },
  {
    name: 'Green',
    textColor: "white",
  },
  {
    name: 'Blue',
    textColor: "white",
  },
  {
    name: 'Indigo',
    textColor: "white",
  },
  {
    name: 'Violet',
    textColor: "white",
  }
]

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

const _data = {
  target: null,
  updateList: []
}

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
    <Container className="App">
      <List className='list'>
        {
          colors.map((color, i) => {
            return (
              <ListItem
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

                color_name={color.name}
                text_color={color.textColor}
              >{color.name}</ListItem>
            )
          })
        }
      </List>
    </Container>
  );
}

const Container = styled.div`
  background: lightgray;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul`
  background: transparent;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 500px;
`;

const ListItem = styled.li`
  border: 1px solid ${props => props.color_name};
  padding: 5px 10px;
  transition: all 200ms;
  background: ${props => props.color_name};
  color: ${props => props.text_color};
`;

export default App;
