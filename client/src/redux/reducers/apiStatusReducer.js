import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// Все запросы на сервер перед отправкой вызывают в начале экшн для этого редьюсера.
// Каждый запрос прибавляет 1 к св-ву хранилища apiCallsInProgress.
// По завершению запроса (успешно или ошибкой, неважно) - убавляет 1.
// Т.о. пока apiCallsInProgress > 0 (пока идет получение данных с сервера), можно крутить спиннер.

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
