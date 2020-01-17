import React, { useEffect, useState } from 'react';

import './styles.css';

function DevForm({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            err => {
                console.log(err);
            },
            {
                timeout: 30000
            }
        );
    }, []);

    async function handlerSubmit(e) {
        e.preventDefault();
        await onSubmit({
            latitude,
            longitude,
            techs,
            github_username
        });

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handlerSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                    required
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">latitude</label>
                    <input
                        name="latitude"
                        id="latitude"
                        type="number"
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        required
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">longitude</label>
                    <input
                        name="longitude"
                        id="longitude"
                        type="number"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;
