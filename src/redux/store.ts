import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk, type ThunkDispatch } from "redux-thunk";
import logger from "redux-logger";
import searchReducer from "./reducer/searchReducer";
import articlesReducer from "./reducer/articleReducer";
import type { ArticlesAction } from "./action/articlesAction";
// import type { RootState } from "./type";

const middlewareList = [thunk, logger];
const enhancer = compose(applyMiddleware(...middlewareList));

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["articles"],
};

// combined reducer
export const rootReducer = combineReducers({
  search: searchReducer,
  articles: articlesReducer,
});

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// create store
export const store = createStore(persistedReducer, enhancer);

// create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, unknown, ArticlesAction>;
