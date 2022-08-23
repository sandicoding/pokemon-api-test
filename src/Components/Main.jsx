/* eslint-disable jsx-a11y/anchor-is-valid */

//* Section import packages
import React, { useEffect, useState } from "react";
import axios from "axios";

//* Section import components
import Card from "./Card";

import Pagination from "./Pagination";
//* Section import assets
import "./style.css";
import logo from "../poke-logo.jpeg";

const Main = () => {

    //* State
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    useEffect(() => {
        const getAllPokemons = async () => {
            try {
            const res = await axios(url);

            function createPokemonObject(results) {
                results.forEach(async (pokemon) => {
                const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                setPokeData((list) => [...list, res.data]);
                });
            }
            createPokemonObject(res.data.results);
            setLoading(false)
            } catch (error) {
            console.log(error);
            }
        };
        getAllPokemons();
    }, [url]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = pokeData.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand poke-nav" href="#">
                    <img
                    src={logo}
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                    alt=""
                    />
                    &nbsp; Pokemon anjay
                </a>
            </nav>
            <div className="container">
                <Card pokemon={currentPosts} loading={loading}></Card>
                <div className="btn-div" style={{ display: 'flex' }}>
                    <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={pokeData.length}
                    paginate={paginate}
                    />
                </div>
            </div>
        </>
        );
};

export default Main;
