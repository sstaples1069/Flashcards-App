import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck, readDeck } from "../utils/api/index";

// This will be the CreateDeck path: /decks/new

function CreateDeck() {
    const history = useHistory()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

// create name change event handler
    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }

// create description change event handler
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }

// create submit event handler for the form
// createDeck()/readDeck() from utils/api/index.js 
    const submitFormHandler = async (event) => {
        event.preventDefault()
        const response = await createDeck({name, description})
        await readDeck(response.id)
        history.push(`/`)
    }

// set up breadcrumbs nav, then set up the submit handler for the form
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
                        Create Deck
                    </li>
                </ol>
            </nav>
            <form onSubmit={submitFormHandler}>
                <div >
                    <h2>Create Deck</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                        className="form-control"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck Name"
                        onChange={nameChangeHandler}
                        value={name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description:
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Brief description of the deck"
                            onChange={descriptionChangeHandler}
                            value={description}
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <Link to="/" className="btn btn-secondary text-white">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary ml-2">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck