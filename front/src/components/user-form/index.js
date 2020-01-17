import React, { useEffect, useState } from 'react';
import './index.css';

function UserForm({onSubmit}){

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

    async function handleSubmit(e){
        e.preventDefault();
        await onSubmit({
            github_user,
            technologies,
            latitude,
            longitude,
        });
        setGithubUser('');
        setTechnologies('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <input className="form-control mb-3" placeholder="Usuário do Github" value={github_user} onChange={e => setGithubUser(e.target.value)}/>
            <input className="form-control mb-3" placeholder="Tecnologias (separadas por vírgula)" value={technologies} onChange={e => setTechnologies(e.target.value)}/>
            <div className="d-flex justify-content-between">
            <input className="form-control mb-3 mr-3" type="number" placeholder="Latitude" value={latitude} onChange={e => setLatitude(e.target.value)} />
            <input className="form-control mb-3"  type="number" placeholder="Longitude" value={longitude} onChange={e => setLongitude(e.target.value)}/>
            </div>
            <button className="btn btn-primary btn-block btn-lg">Salvar</button>
        </form>
    )
}

export default UserForm;