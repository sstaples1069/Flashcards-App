import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readDeck, createCard } from "../utils/api"
import FormForCard from "./FormForCard"

// This will be the AddCard path:	/decks/:deckId/cards/new
function AddCard() {
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({front: "", back: ""})
    const history = useHistory()
    const {deckId} = useParams()

// create cancel button handler, return to deck screen
    const cancelButtonHandler = () => {
        history.push(`/decks/${deck.id}`)
    }

// call readDeck() from utils to load deck
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
            // console.log(response)
        }
        loadDeck()
    }, [deckId])

// create submit handler - createCard() from utils>api>index.js, readDeck() from utils>api>index.js
    const submitFormHandler = async (event) => {
        event.preventDefault()
        const response = await createCard(deckId, {front: card.front, back: card.back})
        // console.log(response)
        await readDeck(response.deckId)
        history.go(0)
    }

    const inputChangeHandler = (event) => {
        setCard({
            ...card,
            [event.target.name]: event.target.value
        })
    } 

// add breadcrumbs nav, formForCard component
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
                    <li className="breadcrumb-item active" area-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <FormForCard
                submitFormHandler={submitFormHandler}
                cancelButtonHandler={cancelButtonHandler}
                inputChangeHandler={inputChangeHandler}
                card={card}
                type="add"
            />
        </div>
    )
}

export default AddCard