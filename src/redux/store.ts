import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk, type ThunkDispatch } from "redux-thunk";
import logger from "redux-logger";
import articlesReducer from "./reducer/articleReducer";
import type { ArticlesAction } from "./action/articlesAction";
import { favouritesReducer } from "./reducer/favouritesReducer";
import historyReducer from "./reducer/historyReducer";
import userReducer from "./reducer/userReducer";
import { categoryReducer } from "./reducer/categoryReducer";
import type { FavouritesAction } from "./action/favouritesAction";
import type { HistoryAction } from "./action/historyActions";
import type { UserAction } from "./action/userAction";
import type { CategoryAction } from "./action/categoryAction";

export type AppActions =
  | ArticlesAction
  | FavouritesAction
  | HistoryAction
  | UserAction
  | CategoryAction;

const middlewareList = [thunk, logger];
const enhancer = compose(applyMiddleware(...middlewareList));

export const rootReducer = combineReducers({
  articles: articlesReducer,
  favourites: favouritesReducer,
  history: historyReducer,
  user: userReducer,
  ui: categoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "favourites", "history"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
