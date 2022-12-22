// Functions


function setAttributeTo14(attribute) {
  const valueElement = document.getElementById(`attribute${attribute}Value`);
  const modifierElement = document.getElementById(`attribute${attribute}Modifier`);
  valueElement.innerHTML = 14;
  modifierElement.innerHTML = '+1';
}

function roll3d6() {
  let total = Math.floor(Math.random() * 6) + 1
    + Math.floor(Math.random() * 6) + 1
    + Math.floor(Math.random() * 6) + 1
  return total
}

function getModifier(attribute) {
  if (attribute === 3) return -2;
  else if (attribute >= 4 && attribute <= 7) return -1;
  else if (attribute >= 8 && attribute <= 13) return 0;
  else if (attribute >= 14 && attribute <= 17) return 1;
  else return 2;
}

function handleAttributeRoll() {
  document.getElementById('rolledAttributesTable').classList.add('active');
  document.getElementById('assignedAttributesTable').classList.remove('active');

  // Roll 3d6 for each attribute
  const attributes = [
    roll3d6(), // Strength
    roll3d6(), // Dexterity
    roll3d6(), // Constitution
    roll3d6(), // Intelligence
    roll3d6(), // Wisdom
    roll3d6(), // Charisma
  ];

  /* Set elements with rolled attributes values */
  document.getElementById('rolledStrengthValue').innerHTML = attributes[0];
  document.getElementById('rolledDexterityValue').innerHTML = attributes[1];
  document.getElementById('rolledConstitutionValue').innerHTML = attributes[2];
  document.getElementById('rolledIntelligenceValue').innerHTML = attributes[3];
  document.getElementById('rolledWisdomValue').innerHTML = attributes[4];
  document.getElementById('rolledCharismaValue').innerHTML = attributes[5];

  /* Set elements with rolled attributes modifiers */
  document.getElementById('rolledStrengthModifier').innerHTML = getModifier(attributes[0]);
  document.getElementById('rolledDexterityModifier').innerHTML = getModifier(attributes[1]);
  document.getElementById('rolledConstitutionModifier').innerHTML = getModifier(attributes[2]);
  document.getElementById('rolledIntelligenceModifier').innerHTML = getModifier(attributes[3]);
  document.getElementById('rolledWisdomModifier').innerHTML = getModifier(attributes[4]);
  document.getElementById('rolledCharismaModifier').innerHTML = getModifier(attributes[5]);
}

function handleAttributeAssign() {
  document.getElementById('rolledAttributesTable').classList.remove('active');
  document.getElementById('assignedAttributesTable').classList.add('active');
}

// Export functions to html using window object

window.handleAttributeRoll = handleAttributeRoll;
window.handleAttributeAssign = handleAttributeAssign;

