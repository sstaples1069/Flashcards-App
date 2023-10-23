import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { updateDeck, readDeck } from "../utils/api"

//This will be the EditDeck path: /decks/:deckId/edit

function EditDeck() {
    const history = useHistory()
    const [deck, setDeck] = useState({id:"", name:"", description:"", cards:""})
    const {deckId} = useParams()

// call readDeck() from utils to load deck
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
            console.log(response) 
        }
            loadDeck()   
    }, [deckId])

// create submit event handler for the form
const submitHandler = async (event) =>{ 
    event.preventDefault()
    await updateDeck(deck)
    history.go(`/decks/${deck.id}`)
};

// create cancel button handler
const cancelButtonHandler = (event) => {
    event.preventDefault()
    history.push(`/decks/${deck.id}`);
}

// create name change event handler
const nameChangeHandler = (event) => {
    setDeck({...deck, name: event.target.value})
}

// create description change event handler
const descriptionChangeHandler = (event) => {
    setDeck({...deck, description: event.target.value})
}

// set the breadcrumb navigation, create submit handler for the form 
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Decks
                    </li>
                </ol>
            </nav>
            <form onSubmit={submitHandler}>
                <div>
                    <h2>Edit Deck</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            name="name"
                            value={deck.name}
                            onChange={nameChangeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea
                            className="form-control"
                            id="description"
                            type="text"
                            name="description"
                            value={deck.description}
                            onChange={descriptionChangeHandler}
                        />  
                    </div>
                </div>
                <div className="mt-2">
                    <button className="btn btn-secondary text-white" type="button" onClick={cancelButtonHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary ml-2">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck