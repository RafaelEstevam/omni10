import React, { useEffect, useState } from 'react';
import UserCard from './components/user-card';
import api from './services/api';

function App() {

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [github_user, setGithubUser] = useState('');

  useEffect(() =>{
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

  async function handleSubmit(e){
    e.preventDefault();
    const response = await api.post('/devs',{
      github_user,
      technologies,
      latitude,
      longitude,
    })

    console.log(response.data);
  }

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-3">Cadastrar</h2>
                <form onSubmit={handleSubmit}>
                  <input className="form-control mb-3" placeholder="Usuário do Github" onChange={e => setGithubUser(e.target.value)}/>
                  <input className="form-control mb-3" placeholder="Tecnologias (separadas por vírgula)" onChange={e => setTechnologies(e.target.value)}/>
                  <div className="d-flex justify-content-between">
                  <input className="form-control mb-3 mr-3" type="number" placeholder="Latitude" value={latitude} onChange={e => setLatitude(e.target.value)} />
                  <input className="form-control mb-3"  type="number" placeholder="Longitude" value={longitude} onChange={e => setLongitude(e.target.value)}/>
                  </div>
                  <button className="btn btn-primary btn-block btn-lg">Salvar</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row mt-3 mt-md-0 ">
              <UserCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
