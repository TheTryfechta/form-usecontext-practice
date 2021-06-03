import "./App.css";
import Modal from "./Modal";
import { useReducer, useState, useRef } from "react";
import data from "./data";
import { reducer } from "./reducer";

const defaultState = {
  people: data,
  isModalOpen: false,
  modalContent: "works",
  isEditing: false,
};

function App() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [personToEdit, setPersonToEdit] = useState();
  const [counter, setCounter] = useState(4);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.isEditing) {
      dispatch({
        type: "EDITED_INPUT",
        payload: { personToEdit: personToEdit, name: name },
      });
    } else {
      if (name) {
        setCounter(counter + 1);
        const newPerson = { id: counter, name: name };
        dispatch({ type: "ADD_NAME", payload: newPerson });
      } else {
        dispatch({ type: "EMPTY_INPUT" });
      }
    }
    setName("");
    inputRef.current.focus();
  };

  const handleEdit = (pId) => {
    setPersonToEdit(pId);
    dispatch({ type: "EDIT_ITEM" });
    inputRef.current.focus();
    setName("");
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <section className="double-wrapper">
      <section className="wrapper">
        {state.isModalOpen && (
          <Modal closeModal={closeModal} content={state.modalContent} />
        )}
        <form onSubmit={(e) => handleSubmit(e)} className="form-group">
          <h2>Name Form</h2>
          <input
            type="text"
            className="form-input"
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
            value={name}
          />

          <button type="submit" className="form-btn">
            {state.isEditing ? "Edit" : "Add"}
          </button>
        </form>
      </section>
      <ul>
        {state.people.map((person) => {
          return (
            <li key={person.id} className="list-entry">
              <p>
                {person.name} - {person.id}
              </p>
              <p className="edit-btn" onClick={() => handleEdit(person.id)}>
                edit
              </p>
              <p
                className="close-btn"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_ITEM",
                    payload: { person: person.id, name: person.name },
                  })
                }
              >
                remove
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default App;
