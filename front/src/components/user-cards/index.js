import React from 'react';
import './index.css';

function UserCard(props){
    const { dev } = props;
    return (
        <div className="col-md-6 mb-3">
            <div className="card">
                <div className="card-body">
                <div className="d-flex justify-content-start align-items-center">
                    <img src={dev.avatar_url} className="rounded-circle mr-3 img-fluid" style={{maxWidth: 50 +'px'}} />
                    <div>
                    <h4>{dev.name || dev.github_user}</h4>
                        {dev.technologies.map(tech => (
                          <span key={tech} class="badge badge-secondary mr-1">{tech}</span> 
                        ))}
                    </div>
                </div>
                <p class="mt-3">{dev.bio}</p>
                <a href={"https://github.com/" + dev.github_user} className="btn btn-info btn-sm">Link do Github</a>
                </div>
            </div>
        </div>
    );
}

export default UserCard;