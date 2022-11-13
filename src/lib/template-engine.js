function templateEngine(block) {
  if (block === undefined || block === null || block === false) {
    return document.createTextNode('');
  }

  if (typeof block === 'string' || typeof block === 'number' || typeof block === true) {
    return document.createTextNode(block);
  }

  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();

    block.forEach((elem) => {
      fragment.appendChild(templateEngine(elem));
    });

    return fragment;
  }

  const result = document.createElement(block.tag);

  if (block.cls) {
    result.classList.add(...[].concat(block.cls));
  }

  if (block.id) {
    result.id = block.id;
  }

  if (block.attrs) {
    const attrsName = Object.keys(block.attrs);

    attrsName.forEach((name) => {
      result.setAttribute(name, block.attrs[name]);
    });
  }

  if (block.list) {
    block.list.forEach((elem) => {
      const listItem = document.createElement('li');
      listItem.textContent = elem;
      result.appendChild(listItem);
      console.log(listItem);
    });
  }

  if (block.text) {
    result.textContent = block.text;
  }

  result.appendChild(templateEngine(block.content));

  return result;
}
