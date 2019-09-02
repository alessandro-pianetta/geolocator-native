import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
// Redux
import contactsReducer from './redux/Contacts/reducer';
import formReducer from './redux/Form/reducer';
import historyReducer from './redux/History/reducer';
import locationReducer from './redux/Location/reducer';
import userReducer from './redux/User/reducer';

const store = createStore(
	combineReducers({
		location: locationReducer,
		history: historyReducer,
		contacts: contactsReducer,
		form: formReducer,
		user: userReducer,
	}),
	{},
	applyMiddleware(ReduxThunk),
);

export default store;
