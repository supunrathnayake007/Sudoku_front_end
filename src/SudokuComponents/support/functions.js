function Empty2DArray() {
  let twoDArray = [];
  for (let i = 0; i < 9; i++) {
    let array = [];
    for (let j = 0; j < 9; j++) {
      array.push(0);
    }
    twoDArray.push(array);
  }
  return twoDArray;
}

export { Empty2DArray };
