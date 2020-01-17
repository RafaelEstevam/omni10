import React from 'react';

function UserCard(){
    return (
        <div className="col-6 mb-3">
            <div className="card">
                <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <img src="#" className="rounded-circle mr-3"/>
                    <div>
                    <h4>Nome do participante</h4>
                    <small>Tecnologias</small>
                    </div>
                </div>
                <p>Bio</p>
                <a href="#">Link do Github</a>
                </div>
            </div>
        </div>
    );
}

export default UserCard;