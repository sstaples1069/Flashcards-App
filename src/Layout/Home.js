import React from "react";
import { useHistory, Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
    //initial value of decks stored as state
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        async function getDeck() {
            const response = await listDecks();
            setDecks(response);
        }
        getDeck();
    }, [])

    //delete button handler, use deckId
    function deleteButtonHandler(deckId) {
        if (
            window.confirm("Are you sure you want to delete this deck? It will be unrecoverable.")
        ) {
            deleteDeck(deckId).then(history.go(0));
        }
    }

    return (
        <div >
        <div>           
          <Link to="/decks/new" className="btn btn-secondary text-white"> 
            {" "}Create Deck
          </Link>
        </div>
        <div>
          {decks?.map((deck)=>
            <div className="d-grid gap-2 d-md-block mt-2 mb-4" key={deck.id}> 
              <div className="card">
                <div className="card-header bg-light">
                  <h5 className="float-left">{deck.name}</h5>
                    <p className="float-right">{deck.cards.length} cards</p>
                </div>
                <div className="card-body">
                  <p className="card-text">{deck.description}</p>
                </div>
                <div className="ml-2 mr-2 mb-3">
                    <Link to ={`/decks/${deck.id}`} className="btn btn-secondary float-left mr-2">
                      {" "}View
                    </Link>                
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary float-left">
                      {" "}Study
                    </Link>
                    <button type="button" className="btn btn-danger float-right" onClick={() => deleteButtonHandler(deck.id)}>Delete</button>
                </div>
              </div>  
            </div>
            )}  
          </div>
        </div>
    )
}

export default Home