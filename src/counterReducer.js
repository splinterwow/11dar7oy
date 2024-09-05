const initialState = {
  counter: 0,
  entries: [],
};


export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, entries: [...state.entries, action.payload] };
    case "REMOVE_ENTRY":
      return { ...state, entries: state.entries.filter((_, index) => index !== action.payload) };
    case "EDIT_ENTRY":
      const updatedEntries = [...state.entries];
      updatedEntries[action.payload.index] = {
        name: action.payload.name,
        age: action.payload.age,
      };
      return { ...state, entries: updatedEntries };
    default:
      return state;
  }
}
