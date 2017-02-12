const initialState = {
    posts: []
};
const Application = (state=initialState, action) =>  {
  switch (action.type){
    case 'ADD_POST':
      return state;
    default:
        return state
  }
}
export default Application;
