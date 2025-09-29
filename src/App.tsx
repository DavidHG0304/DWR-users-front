import { useState } from 'react';
import ListContainer from './components/ListContainer.tsx';
import ListItem from './components/ListItem.tsx';
import FormWithInput from './components/FormWithInut.tsx';

function App() {
  const [list, setList] = useState<string[]>([]);

  const handleOnSubmit = (value: string) => {
    setList([
      ...list,
      value
    ]);
  }

  const handleOnSearchSubmit = (value: string) => {
    console.log(list.find(e => e === value));
  }

  return (
    <div>
      <h1>Todo list</h1>
      <FormWithInput
        id='add'
        buttonText='Agregar'
        placeholder='Ingrese una tarea...'
        onSubmit={handleOnSubmit}
      />
      <FormWithInput
        id='search'
        buttonText='Buscar'
        placeholder='Buscar en mis tareas'
        onSubmit={handleOnSearchSubmit}
      />
      <ListContainer>
        {
          list.map((item, index) => {
            return (
              <ListItem key={index}>
                {item}
              </ListItem>
            );
          })
        }
      </ListContainer>
    </div>
  );
}

export default App
