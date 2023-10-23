import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readCard, readDeck, updateCard } from "../utils/api/index"
import FormForCard from "./FormForCard"

//This will be the EditCart path: /decks/:deckId/cards/:cardId/edit

function EditCard() {
    const history = useHistory()
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})
    const {deckId, cardId} = useParams()

// call readDeck() from utils to load deck containing card using deckId
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
            // console.log(response)
        }
        loadDeck()
    }, [deckId])

// need to load the card and read the card being changed
    useEffect(() => {
        async function loadCard() {
            const response = await readCard(cardId)
            setCard(response)
            // console.log('set card', response)
        }
        loadCard()
    }, [cardId, setCard])

// create cancel button handler, return to home screen
    const cancelButtonHandler = () => {
        history.push(`/decks/${deckId}`)
    }

// create submit button handler - updateCard() from utils/api/index.js
    const submitButtonHandler = async (event) => {
        event.preventDefault()
        await updateCard({...card})
        history.push(`/decks/${deckId}`)
    }

    const inputChangeHandler = event => setCard({...card,[event.target.name]: event.target.value})

// set up breadcrumb nav, display form, prefill with data to edited or updated
    return (
        <div>
            <nav className="aria-lable breadcrumb">
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
                    <li className="breadcrumb-item">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <FormForCard
                inputChangeHandler={inputChangeHandler}
                submitFormHandler={submitButtonHandler}
                cancelButtonHandler={cancelButtonHandler}
                card={card}
                type="edit"
            />
        </div>
    )
}

export default EditCard