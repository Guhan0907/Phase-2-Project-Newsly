import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import logger from "redux-logger"; 
import searchReducer from "./reducer/searchReducer";

const middlewareList = [thunk , logger]; 
const enhancer = compose(applyMiddleware(...middlewareList));

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["search"],
};

// combined reducer
export const rootReducer = combineReducers({
  search: searchReducer,
});

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
export const store = createStore(persistedReducer, enhancer);

// create persistor
export const persistor = persistStore(store);

