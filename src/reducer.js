export const reducer = (state, action) => {
  if (action.type === "ADD_NAME") {
    return {
      people: [...state.people, action.payload],
      isModalOpen: true,
      modalContent: "Name added successfully",
    };
  }
  if (action.type === "EMPTY_INPUT") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Input can not be empty",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const newPeopleList = state.people.filter(
      (person) => person.id !== action.payload.person
    );
    return {
      ...state,
      people: newPeopleList,
      isModalOpen: true,
      modalContent: `${action.payload.name} Removed Successfully`,
    };
  }

  if (action.type === "EDIT_ITEM") {
    return {
      ...state,
      isEditing: true,
      isModalOpen: true,
      modalContent: "Editing",
    };
  }

  if (action.type === "EDITED_INPUT") {
    const findPerson = state.people.findIndex(
      (person) => person.id === action.payload.personToEdit
    );
    const newPeopleList = [...state.people];
    newPeopleList[findPerson] = {
      id: action.payload.personToEdit,
      name: action.payload.name,
    };
    return {
      ...state,
      people: newPeopleList,
      isModalOpen: true,
      modalContent: "Edited Successfully",
      isEditing: false,
    };
  }

  throw new Error("Action type not recognized");
};
