function throttle(func, timeFrame) {
  let lastTime = 0;
  return function (...args) {
    let now = new Date();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}

function getRowsCount(items, cols) {
  const getItemsMaxHeight = items.map((val) => {
    const item = val[cols];

    return (item && item.y) + (item && item.h) || 0;
  });

  return Math.max(...getItemsMaxHeight, 1);
}

const getColumn = (containerWidth, columns) => {
  const sortColumns = columns.slice().sort((a, b) => a[0] - b[0]);

  const breakpoint = sortColumns.find((value) => {
    const [width] = value;
    return containerWidth <= width;
  });

  if (breakpoint) {
    return breakpoint[1];
  } else {
    return sortColumns[sortColumns.length - 1][1];
  }
};

const makeMatrix = (rows, cols) => Array.from(Array(rows), () => new Array(cols)); // make 2d array

function makeMatrixFromItems(items, _row, _col) {
  let matrix = makeMatrix(_row, _col);

  for (var i = 0; i < items.length; i++) {
    const value = items[i][_col];
    if (value) {
      const { x, y, h } = value;
      const id = items[i].id;
      const w = Math.min(_col, value.w);

      for (var j = y; j < y + h; j++) {
        const row = matrix[j];
        for (var k = x; k < x + w; k++) {
          row[k] = { ...value, id };
        }
      }
    }
  }
  return matrix;
}

function findCloseBlocks(items, matrix, curObject) {
  const { h, x, y } = curObject;

  const w = Math.min(matrix[0].length, curObject.w);
  const tempR = matrix.slice(y, y + h);

  let result = [];
  for (var i = 0; i < tempR.length; i++) {
    let tempA = tempR[i].slice(x, x + w);
    result = [...result, ...tempA.map((val) => val.id && val.id !== curObject.id && val.id).filter(Boolean)];
  }

  return [...new Set(result)];
}

function makeMatrixFromItemsIgnore(items, ignoreList, _row, _col) {
  let matrix = makeMatrix(_row, _col);
  for (var i = 0; i < items.length; i++) {
    const value = items[i][_col];
    const id = items[i].id;
    const { x, y, h } = value;
    const w = Math.min(_col, value.w);

    if (ignoreList.indexOf(id) === -1) {
      for (var j = y; j < y + h; j++) {
        const row = matrix[j];
        if (row) {
          for (var k = x; k < x + w; k++) {
            row[k] = { ...value, id };
          }
        }
      }
    }
  }
  return matrix;
}

function findItemsById(closeBlocks, items) {
  return items.filter((value) => closeBlocks.indexOf(value.id) !== -1);
}

function getItemById(id, items) {
  return items.find((value) => value.id === id);
}

function findFreeSpaceForItem(matrix, item) {
  const cols = matrix[0].length;
  const w = Math.min(cols, item.w);
  let xNtime = cols - w;
  let getMatrixRows = matrix.length;

  for (var i = 0; i < getMatrixRows; i++) {
    const row = matrix[i];
    for (var j = 0; j < xNtime + 1; j++) {
      const sliceA = row.slice(j, j + w);
      const empty = sliceA.every((val) => val === undefined);
      if (empty) {
        const isEmpty = matrix.slice(i, i + item.h).every((a) => a.slice(j, j + w).every((n) => n === undefined));

        if (isEmpty) {
          return { y: i, x: j };
        }
      }
    }
  }

  return {
    y: getMatrixRows,
    x: 0,
  };
}

const getItem = (item, col) => {
  return { ...item[col], id: item.id };
};

const updateItem = (elements, active, position, col) => {
  return elements.map((value) => {
    if (value.id === active.id) {
      return { ...value, [col]: { ...value[col], ...position } };
    }
    return value;
  });
};

function moveItemsAroundItem(active, items, cols, original) {
  // Get current item from the breakpoint
  const activeItem = getItem(active, cols);
  const ids = items.map((value) => value.id).filter((value) => value !== activeItem.id);

  const els = items.filter((value) => value.id !== activeItem.id);

  // Update items
  let newItems = updateItem(items, active, activeItem, cols);

  let matrix = makeMatrixFromItemsIgnore(newItems, ids, getRowsCount(newItems, cols), cols);
  let tempItems = newItems;

  // Exclude resolved elements ids in array
  let exclude = [];

  els.forEach((item) => {
    // Find position for element
    let position = findFreeSpaceForItem(matrix, item[cols]);
    // Exclude item
    exclude.push(item.id);

    tempItems = updateItem(tempItems, item, position, cols);

    // Recreate ids of elements
    let getIgnoreItems = ids.filter((value) => exclude.indexOf(value) === -1);

    // Update matrix for next iteration
    matrix = makeMatrixFromItemsIgnore(tempItems, getIgnoreItems, getRowsCount(tempItems, cols), cols);
  });

  // Return result
  return tempItems;
}

function moveItem(active, items, cols, original) {
  // Get current item from the breakpoint
  const item = getItem(active, cols);

  // Create matrix from the items expect the active
  let matrix = makeMatrixFromItemsIgnore(items, [item.id], getRowsCount(items, cols), cols);
  // Getting the ids of items under active Array<String>
  const closeBlocks = findCloseBlocks(items, matrix, item);
  // Getting the objects of items under active Array<Object>
  let closeObj = findItemsById(closeBlocks, items);
  // Getting whenever of these items is fixed
  const fixed = closeObj.find((value) => value[cols].fixed);

  // If found fixed, reset the active to its original position
  if (fixed) return items;

  // Update items
  items = updateItem(items, active, item, cols);

  // Create matrix of items expect close elements
  matrix = makeMatrixFromItemsIgnore(items, closeBlocks, getRowsCount(items, cols), cols);

  // Create temp vars
  let tempItems = items;
  let tempCloseBlocks = closeBlocks;

  // Exclude resolved elements ids in array
  let exclude = [];

  // Iterate over close elements under active item
  closeObj.forEach((item) => {
    // Find position for element
    let position = findFreeSpaceForItem(matrix, item[cols]);
    // Exclude item
    exclude.push(item.id);

    // Assign the position to the element in the column
    tempItems = updateItem(tempItems, item, position, cols);

    // Recreate ids of elements
    let getIgnoreItems = tempCloseBlocks.filter((value) => exclude.indexOf(value) === -1);

    // Update matrix for next iteration
    matrix = makeMatrixFromItemsIgnore(tempItems, getIgnoreItems, getRowsCount(tempItems, cols), cols);
  });

  // Return result
  return tempItems;
}

function getUndefinedItems(items, col, breakpoints) {
  return items
    .map((value) => {
      if (!value[col]) {
        return value.id;
      }
    })
    .filter(Boolean);
}

function getClosestColumn(items, item, col, breakpoints) {
  return breakpoints
    .map(([_, column]) => item[column] && column)
    .filter(Boolean)
    .reduce(function (acc, value) {
      const isLower = Math.abs(value - col) < Math.abs(acc - col);

      return isLower ? value : acc;
    });
}

function specifyUndefinedColumns(items, col, breakpoints) {
  let matrix = makeMatrixFromItems(items, getRowsCount(items, col), col);

  const getUndefinedElements = getUndefinedItems(items, col);

  let newItems = [...items];

  getUndefinedElements.forEach((elementId) => {
    const getElement = items.find((item) => item.id === elementId);

    const closestColumn = getClosestColumn(items, getElement, col, breakpoints);

    const position = findFreeSpaceForItem(matrix, getElement[closestColumn]);

    const newItem = {
      ...getElement,
      [col]: {
        ...getElement[closestColumn],
        ...position,
      },
    };

    newItems = newItems.map((value) => (value.id === elementId ? newItem : value));

    matrix = makeMatrixFromItems(newItems, getRowsCount(newItems, col), col);
  });
  return newItems;
}

export { getColumn as a, getItemById as b, moveItem as c, findFreeSpaceForItem as f, getRowsCount as g, moveItemsAroundItem as m, specifyUndefinedColumns as s, throttle as t };
