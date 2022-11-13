import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { HeroCard } from "./../components";
import { useForm } from "../../hooks";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { q = "" } = queryString.parse(location.search);

    const heroes = getHeroesByName(q);

    const showSearch = q.length === 0;
    const showError = q.length > 0 && heroes.length === 0;

    const { query, handleInputChange } = useForm({
        query: q,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (query.trim().length <= 1) return;

        navigate(`?q=${query.toLowerCase()}`);
    };

    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-sm-12 col-md-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            name="query"
                            autoComplete="off"
                            value={query}
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            className="btn mt-2 btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="mt-4 col-sm-12  col-md-7 mt-md-0">
                    <h4>Results</h4>
                    <hr />
                    {/* {
                        (q === '') 
                        ? <div className="alert alert-primary">Search a hero</div>
                        : (heroes.length === 0) && <div className="alert alert-danger">There is no a hero with {q}</div>
                    } */}

                    <div
                        className="alert alert-primary animate__animated animate__fadeIn"
                        style={{ display: showSearch ? "" : "none" }}
                    >
                        Search a hero
                    </div>

                    <div
                        className="alert alert-danger  animate__animated animate__fadeIn"
                        style={{ display: showError ? "" : "none" }}
                    >
                        There is no a hero with {q}
                    </div>

                    {heroes.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </>
    );
};
