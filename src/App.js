import React, { useState, useEffect } from 'react'
import {
  FaLinkedin,
  FaTwitterSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaGithubSquare,
  FaLine,
} from 'react-icons/fa'
import styled from 'styled-components';

const initialLists = [
  {
    title: "LinkedIn",
    icon: <FaLinkedin size="2em" />
  },
  {
    title: "Twitter",
    icon: <FaTwitterSquare size="2em" />
  },
  {
    title: "Facebook",
    icon: <FaFacebookSquare size="2em" />
  },
  {
    title: "Instagram",
    icon: <FaInstagramSquare size="2em" />
  },
  {
    title: "Github",
    icon: <FaGithubSquare size="2em" />
  },
  {
    title: "Line",
    icon: <FaLine size="2em" />
  },
]

const initialDragData = {
  target: null,
  index: -1,
  move_down: [],
  move_up: [],
  updateLists: []
}

const App = () => {
  const [lists, setLists] = useState(initialLists);
  const [dragData, setDragData] = useState(initialDragData);
  const [isDragged, setIsDragged] = useState(false)

  // useEffect(() => { }, [lists])

  const _onDragOver = (e) => {
    e.preventDefault();
    return false;
  }
  const _onDragStart = (e) => {
    setIsDragged(true);
    setDragData({
      ...dragData,
      target: e.target,
      index: Number(e.target.dataset.index),
      updateLists: [...lists]
    });
  }
  const _onDragEnter = (e) => {
    const _dragged = Number(dragData.target.dataset.index);
    const _index = Number(dragData.index);
    const _target = Number(e.target.dataset.index);
    let move_down = [...dragData.move_down];
    let move_up = [...dragData.move_up];

    let data = [...dragData.updateLists];
    data[_index] = data.splice(_target, 1, data[_index])[0];

    if (_dragged > _target) {
      move_down.includes(_target) ? move_down.pop() : move_down.push(_target);
    } else if (_dragged < _target) {
      move_up.includes(_target) ? move_up.pop() : move_up.push(_target);
    } else {
      move_down = [];
      move_up = [];
    }

    setDragData({
      ...dragData,
      updateLists: data,
      index: _target,
      move_up,
      move_down
    })
  }
  const _onDragLeave = (e) => {
    if (e.target === dragData.target) {
      e.target.style.visibility = "hidden";
    }
  }
  const _onDragEnd = (e) => {
    setIsDragged(false);
    setLists([
      ...dragData.updateLists
    ]);

    setDragData({
      ...dragData,
      move_down: [],
      move_up: [],
      updateLists: [],
    });

    e.target.style.visibility = "visible";
  }

  return (
    <Container className='container'>
      <List className='list'>
        {
          lists.map((e, i) => {
            let default_class = "";

            dragData.move_down.includes(i) && (
              default_class = "move_down"
            );

            dragData.move_up.includes(i) && (
              default_class = "move_up"
            );

            return (
              <ListItem
                key={i}
                data-index={i}
                draggable

                onDragOver={_onDragOver}
                onDragStart={_onDragStart}
                onDragEnter={_onDragEnter}
                onDragLeave={_onDragLeave}
                onDragEnd={_onDragEnd}

                className={default_class}
                isDragged={isDragged}
              >
                <i>{e.icon}</i>
                <p>{e.title}</p>
              </ListItem>
            )
          })
        }
      </List>
    </Container>
  )
}

const Container = styled.div`
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  * {
    padding: 0;
    margin: 0;
  }
`;

const List = styled.ul`
  width: 300px;
  list-style: none;
  background-color: white;
  border-radius: 5px;
  display: flex;

  flex-direction: column;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 8px;
  ${props => props.isDragged && 'transition: transform 200ms ease 0s'};

  i {
    flex: 1;
  }

  p {
    flex: 6;
  }

  &.move_up {
    transform: translate(0, -65px);
    z-index: 1;
  }

  &.move_down {
    transform: translate(0, 65px);
    z-index: 1;
  }


  & > * {
    pointer-events: none;
  }

`;

export default App
