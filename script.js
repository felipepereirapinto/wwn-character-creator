////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////

// Attribute functions

function setAttributeTo14(attribute) {
    // Get elements with rolled attributes values and modifiers
    const valueElement = document.getElementById(`rolled${attribute}Value`)
    const modifierElement = document.getElementById(`rolled${attribute}Modifier`)

    // If attribute was already set to 14, reset it and uncheck the radio button
    if (valueElement.getAttribute('data-previous') !== '') {
        // Reset attribute to previous value and modifier
        valueElement.innerHTML = valueElement.getAttribute('data-previous')
        modifierElement.innerHTML = modifierElement.getAttribute('data-previous')
        // Clear data-previous attribute
        valueElement.setAttribute('data-previous', '')
        modifierElement.setAttribute('data-previous', '')
        // Uncheck radio button
        document.getElementById(`attribute${attribute}To14`).checked = false
        return
    }

    // Get attribute that were previously set to 14
    const previousElements = document.querySelectorAll('[data-previous]')
    previousElements.forEach(element => {
        const previousValue = element.getAttribute('data-previous')
        if (previousValue !== '') {
            element.setAttribute('data-previous', '')
            element.innerHTML = previousValue
        }
    })

    // Set previous value and modifier in data-previous attribute
    valueElement.setAttribute('data-previous', valueElement.innerHTML)
    modifierElement.setAttribute('data-previous', modifierElement.innerHTML)

    // Set new value and modifier
    valueElement.innerHTML = 14
    modifierElement.innerHTML = '+1'
}

function roll3d6() {
    let total = Math.floor(Math.random() * 6) + 1
        + Math.floor(Math.random() * 6) + 1
        + Math.floor(Math.random() * 6) + 1
    return total
}

function getModifier(attribute) {
    if (attribute === 3) return -2
    else if (attribute >= 4 && attribute <= 7) return -1
    else if (attribute >= 8 && attribute <= 13) return 0
    else if (attribute >= 14 && attribute <= 17) return 1
    else return 2
}

function handleAttributeRoll() {

    document.getElementById('rolledAttributesTable').classList.add('active')
    document.getElementById('assignedAttributesTable').classList.remove('active')

    // Roll 3d6 for each attribute
    const attributes = [
        roll3d6(), // Strength
        roll3d6(), // Dexterity
        roll3d6(), // Constitution
        roll3d6(), // Intelligence
        roll3d6(), // Wisdom
        roll3d6(), // Charisma
    ]

    /* Set elements with rolled attributes values */
    document.getElementById('rolledStrengthValue').innerHTML = attributes[0]
    document.getElementById('rolledDexterityValue').innerHTML = attributes[1]
    document.getElementById('rolledConstitutionValue').innerHTML = attributes[2]
    document.getElementById('rolledIntelligenceValue').innerHTML = attributes[3]
    document.getElementById('rolledWisdomValue').innerHTML = attributes[4]
    document.getElementById('rolledCharismaValue').innerHTML = attributes[5]

    /* Set elements with rolled attributes modifiers */
    document.getElementById('rolledStrengthModifier').innerHTML = getModifier(attributes[0])
    document.getElementById('rolledDexterityModifier').innerHTML = getModifier(attributes[1])
    document.getElementById('rolledConstitutionModifier').innerHTML = getModifier(attributes[2])
    document.getElementById('rolledIntelligenceModifier').innerHTML = getModifier(attributes[3])
    document.getElementById('rolledWisdomModifier').innerHTML = getModifier(attributes[4])
    document.getElementById('rolledCharismaModifier').innerHTML = getModifier(attributes[5])
}

function handleAttributeAssign() {
    // Change active table to assigned attributes
    document.getElementById('rolledAttributesTable').classList.remove('active')
    document.getElementById('assignedAttributesTable').classList.add('active')

    // Get all select elements
    const selectElements = document.querySelectorAll('#assignedAttributesTable select')
    console.log(selectElements)
}

function handleAttributeSelect(selectElement) {
    // Get element currently selected id, value and modifier
    const value = selectElement.value
    const modifier = getModifier(value)
    const currentId = selectElement.id
    console.log(currentId, value, modifier)

    // Get all select elements and look for repeated values
    const selectElements = document.querySelectorAll('#assignedAttributesTable select')
    // Remove the current select element from the list
    const selectElementsWithoutCurrent = Array.from(selectElements).filter(element => element.id !== currentId)
    // Check there is a repeated value
    const repeatedValue = selectElementsWithoutCurrent.find(element => element.value === value)
    if (repeatedValue) {
        // If there is a repeated value, set it to the default value
        repeatedValue.value = '-'
        // Get the modifier element of the repeated value
        const repeatedModifierElement = repeatedValue.parentElement.nextElementSibling
        // Set the modifier element to the default value
        repeatedModifierElement.innerHTML = '-'
    }

    // Set modifier for the current select element
    const modifierElement = selectElement.parentElement.nextElementSibling
    modifierElement.innerHTML = modifier
}

// Background functions

function handleBackgroundChoice(background) {

    const backgroundChoiceElements = document.querySelectorAll('.backgroundChoiceButton')

    // If the choice was Random, select a random background
    if (background === 'Random') {
        // Remove active class from all elements
        backgroundChoiceElements.forEach(element => element.classList.remove('active'))

        // Get random background from list
        const backgrounds = [
            'Artisan', 'Barbarian', 'Carter', 'Courtesan', 'Criminal', 'Hunter', 'Laborer', 'Merchant', 'Noble', 'Nomad', 'Peasant', 'Performer', 'Physician', 'Priest', 'Sailor', 'Scholar', 'Slave', 'Soldier', 'Thug', 'Wanderer'
        ]
        const randomIndex = Math.floor(Math.random() * backgrounds.length)
        background = backgrounds[randomIndex]

        // Add active class to the selected element
        document.getElementById(background).classList.add('active')

        return
    }

    // Set or unset active class for the selected element
    backgroundChoiceElements.forEach(element => {
        if (element.id === background) {
            element.classList.toggle('active')
            return
        }
        element.classList.remove('active')
    })
}



// Export functions to html using window object

window.handleAttributeRoll = handleAttributeRoll
window.handleAttributeAssign = handleAttributeAssign
window.setAttributeTo14 = setAttributeTo14
window.handleBackgroundChoice = handleBackgroundChoice

// Set event listeners

// Get modifier when a select element is changed
const selectElements = document.querySelectorAll('#assignedAttributesTable select')
selectElements.forEach(selectElement => {
    selectElement.addEventListener('change', () => handleAttributeSelect(selectElement))
})