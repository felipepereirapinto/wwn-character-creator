

const main = () => {
  console.log('Initializing script.js');

  const roll = (query = 'd20') => {
    /* Regex for rolling rpg dice: any number optional, 'd', any number > 1 */
    regex = '^(\\d*)d(\\d+)$';
    const match = query.match(regex);
    
    if (match) {
      const count = match[1] || 1;
      const sides = match[2];

      let total = 0;
      for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * sides) + 1;
      }

      return total;
    }

    return null;
  }

  const rollAttributes = () => {
    const attributes = [
      roll('3d6'),
      roll('3d6'),
      roll('3d6'),
      roll('3d6'),
      roll('3d6'),
      roll('3d6'),
    ];
    
    return attributes;
  }

  const getAttributeModifiers = (attributes) => {
    let modifiers = [];

    for (attribute of attributes) {
      if (attribute === 3) modifiers.push(-2);
      else if (attribute >= 4 && attribute <= 7) modifiers.push(-1);
      else if (attribute >= 8 && attribute <= 13) modifiers.push(0);
      else if (attribute >= 14 && attribute <= 17) modifiers.push(1);
      else if (attribute === 18) modifiers.push(2);
      else modifiers.push(null);
    }

    return modifiers;
  }

  const setChosenAttribute = (attributes) => {
    data.attributes.chosen = attributes;
  }

  const setAttributeTo14 = (index) => {
    const attributes = data.attributes.chosen;
    attributes[index] = 14;
    setChosenAttribute(attributes);
    console.log('data', data);
  }

  const handleAttributeRoll = () => {
    const rolledAttributes = rollAttributes();
    const attributeModifiers = getAttributeModifiers(rolledAttributes);
    const rolls = data.attributes.rolls;

    data.attributes.rolled = rolledAttributes;
    data.attributes.modifiers = attributeModifiers;
    data.attributes.rolls++;
    
    data.attributes.chosen = rolledAttributes;
    setChosenAttribute(rolledAttributes);


    data.elements.attributeRollsCounter.innerHTML = rolls;
    data.elements.attributeRolled.innerHTML = rolledAttributes.join(', ');
    data.elements.attributeModifiers.innerHTML = attributeModifiers.join(', ');
  }

  const handleNameChange = (event) => {
    const name = event.target.value;
    data.info.name = name;
    data.elements.characterName.innerHTML = name;
  }

  // Initialize data
  const data = {
    attributes: {
      chosen: [],
      rolled: [],
      rolls: 0,
      modifiers: [],
      standard: [14, 12, 11, 10, 9, 7],
      setToFourteen: null,
    },
    info: {
      name: '',
      goals: '',
      background: '',
      class: '',
    },
    elements: {
      // Get html elements

      characterName: document.getElementById('characterName'),
      attributeRollButton: document.getElementById('attributeRollButton'),
      attributeRollsCounter: document.getElementById('attributeRollsCounter'),
      attributeRolled: document.getElementById('attributeRolled'),
      attributeModifiers: document.getElementById('attributeModifiers'),

    }
  }

  // Set event listeners
  data.elements.characterName.onchange = handleNameChange;
  data.elements.attributeRollButton.onclick = handleAttributeRoll;

  console.log('data', data)
}

main()