import React, { useEffect, useState } from 'react';
import UserCard from './components/user-cards';
import UserForm from './components/user-form';
import api from './services/api';

function App() {

  const [latitude, setLatitude] = useState(''); //useState = usado para alterar estado da função
  const [longitude, setLongitude] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [github_user, setGithubUser] = useState('');
  const [devs, setDevs] = useState([]);

  useEffect(() =>{ //useEffect = usado para funções executadas uma única vez na renderização da tela
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) =>{
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleSubmit(data){
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-3">Cadastrar</h2>
                <UserForm onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row mt-3 mt-md-0 ">
              {devs.map( dev =>(
                <UserCard key={dev._id} dev={dev}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
