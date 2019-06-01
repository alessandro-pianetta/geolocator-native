import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
// Redux
import contactsReducer from './redux/Contacts/reducer';
import historyReducer from './redux/History/reducer';
import locationReducer from './redux/Location/reducer';

const store = createStore(
	combineReducers({
		location: locationReducer,
		history: historyReducer,
		contacts: contactsReducer,
	}),
	{},
	applyMiddleware(ReduxThunk),
);

export default store;
