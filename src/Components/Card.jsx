/* eslint-disable jsx-a11y/img-redundant-alt */

//* Section import packages
import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";

//* Section import assets
import './style.css';

const Card = React.memo(({pokemon, loading}) => {
    //* State
    const [showModal, setShow] = useState(false);
    const [pokeName, setPokeName] = useState('');
    const [pokeHeight, setPokeHeight] = useState('');
    const [pokeWeight, setPokeWeight] = useState('');
    const [pokeImg, setPokeImg] = useState();
    const [searchInput, setSearchInput] = useState('');

    //* Function
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const openPokeInfo = async(res) => {
        setPokeName(res.name);
        setPokeHeight(res.height);
        setPokeWeight(res.weight);
        setPokeImg(res.sprites.front_default);
        handleShow();

    }

    console.log(pokemon);

    return(
        <>
            <Modal show={showModal} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{pokeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="poke-content">
                    <img src={pokeImg} className="img-fluid img-height" alt="Responsive image"></img>
                    <p>
                        Height : {pokeHeight}
                    </p>

                    <p>
                        Weight : {pokeWeight}
                    </p>
                    
                </Modal.Body>
            </Modal>

            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback">
                    <RiSearch2Line className="search-icon" />
                </span>
                <input type="text" className="form-control"
                onChange={event => {setSearchInput(event.target.value)}}
                placeholder="Search" />
            </div>

            <div className="row card-row">
                

                {
                    loading ? <h1>Loading...</h1> :
                    // eslint-disable-next-line array-callback-return
                    pokemon.filter((item) => {
                        if (searchInput === "") {
                            return item
                        } else if (item.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return item
                        }
                    }).map((item, index) => {
                        return (
                            <div key={index} className="col-md-3">
                                <div className="card poke-card" key={item.id} onClick={()=> openPokeInfo(item)}>
                                    <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card image cap"></img>
                                    <div className="card-body">
                                        <h5 className="card-title poke-name">{item.name}</h5>
                                        <div className="stats">
                                            <div>
                                                <h3>{item?.stats[1]?.base_stat}</h3>
                                                <p>Attack</p>
                                            </div>
                                            <div>
                                                <h3>{item?.stats[2]?.base_stat}</h3>
                                                <p>Defense</p>
                                            </div>
                                            <div>
                                                <h3>{item?.stats[5]?.base_stat}</h3>
                                                <p>Speed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        </>
        
    )
})

export default Card;