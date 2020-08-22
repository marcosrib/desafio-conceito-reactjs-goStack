import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(
      response => {
        setRepositories(response.data);
      }
    )
  }, [])

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: 'Porejeto node.js',
      url: 'https://github.com/marcosrib',
      techs: ['java', 'React']
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`)

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const currentRepositories = repositories;
    currentRepositories.splice(repositoryIndex, 1)  
    setRepositories([...currentRepositories])
    // return response.status;
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
          </li>)
        }
        )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
