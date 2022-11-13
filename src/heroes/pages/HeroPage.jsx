import { useState } from "react";
import { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import { getHeroeById } from "../helpers";

export const HeroPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // execute the function only when the id changes
    // not every time the component is rendered
    const hero = useMemo( () => getHeroeById(id), [id] );
    
    const [animation, setAnimation] = useState("animate__animated animate__fadeIn")

    const onNavigateBack = () => {
        
        setAnimation("animate__animated animate__fadeOutRight");
        setTimeout(() => {
            navigate(-1);
        }, 1000);
        
    };



    if (!hero) return <Navigate to="/" />;


    return (
        <div className={`row mt-5 ${animation}`}>
            <div className="col-4">
                <img
                    src={`/assets/heroes/${id}.jpg`}
                    alt={hero.superhero}
                    className="img-thumbnail"
                />
            </div>
            <div className="col-8">
                <h3>{hero.superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Alter ego: </b>
                        {hero.alter_ego}
                    </li>
                    <li className="list-group-item">
                        <b>Publisher: </b>
                        {hero.publisher}
                    </li>
                    <li className="list-group-item">
                        <b>First appearance: </b>
                        {hero.first_appearance}
                    </li>
                </ul>

                <h5 className="mt-3">Characters</h5>

                <p>{hero.characters}</p>

                <button onClick={onNavigateBack} className="btn btn-outline-primary">Return</button>
            </div>
        </div>
    );
};
