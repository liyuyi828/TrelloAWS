export function updateList(lists) {
  console.log("action payload: ", lists);
  return {
    type: UPDATE_LISTS,
    payload: lists
  }
}

export const UPDATE_LISTS = 'UPDATE_LISTS';