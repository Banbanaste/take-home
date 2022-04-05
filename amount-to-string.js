// hash tables for various key value mappings (cheating? maybe hehe)
const digitMap = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
}

const doubleDigitMapTeens = {
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen"
}

const doubleDigitMap = {
    0: "",
    2: "twenty",
    3: "thirty",
    4: "fourty",
    5: "fifty",
    6: "sixty",
    7: "seventy",
    8: "eighty",
    9: "ninety"
}

const trioIndexMap = {
    1: "thousand",
    2: "million",
    3: "billion",
    4: "trillion"
}

/**
 * 
 * @param {intOrString} input 
 * @param {Object} special doubleDigitMapTeens
 * @param {Object} standard doubleDigitMap
 * @param {Object} digit digitMap
 * @returns string representation of number between 10 and 99 inclusive
 */
const parseDoubleDigitInput = (input, special, standard, digit) => {
    // convert number to string spcific to two digit integers
    // numbers between 10 and 99 inclusive
    input = parseInt(input)
    if (input < 10) {
        return digit[input]
    } else if (input in special) {
        return special[input]
    } else {
        return `${standard[Math.floor(input / 10)]}${digit[input % 10] ? `-${digit[input % 10]}` : ""}`
    }
}

/**
 * 
 * @param {string} amount string dollar amount
 * @returns string representation of dollar amount
 */
const amountToStringRepresentation = amount => {
    // split amount into array of integer and decimal
    // reverse order of integer, split into array of "hundreds" (sets of 3 integers or trio)
    const amountArray = amount.substring(1).split(".")
    const trioArray = amountArray[0].split("").reverse().join("").match(/.{1,3}/g)

    // init constructor array; this can be a string **AOI
    // loop through trios
    const trioStringRepArray = []
    for (let trio in trioArray) {
        // correct the order or trio
        // convert string to int
        // if 0 don't add to string representation
        const inOrder = trioArray[trio].split("").reverse().join("")
        const int = parseInt(inOrder)
        if (!int) {
            continue;
        }

        // trio arrray indecies represent thsoands scale
        // example; index 1 = 1-999 thousand = thousand(s) or index 2 = 1000-9999 thousand = million(s) and so on
        trio in trioIndexMap && trioStringRepArray.unshift(trioIndexMap[trio])

        // each trio can be any number from 999 (nine hundred ninety-nine) to 1 (one) (0 handled above)
        // convert number to string
        if (int > 99) {
            trioStringRepArray.unshift(parseDoubleDigitInput(`${inOrder[1]}${inOrder[2]}`, doubleDigitMapTeens, doubleDigitMap, digitMap))
            trioStringRepArray.unshift("hundred")
            trioStringRepArray.unshift(`${digitMap[inOrder[0]]}`)
        } else if (int > 9 && int < 100) {
            trioStringRepArray.unshift(parseDoubleDigitInput(int, doubleDigitMapTeens, doubleDigitMap, digitMap))
        } else {
            trioStringRepArray.unshift(`${digitMap[int]}`)
        }
    }

    // cleanup
    // handle decimal amount if exsists
    // add dollars to end of string representation
    // capitalize
    amountArray[1] && trioStringRepArray.push(`and ${amountArray[1]}/100`)
    trioStringRepArray.push("dollars")
    trioStringRepArray[0] = trioStringRepArray[0][0].toUpperCase() + trioStringRepArray[0].slice(1)

    // return string from array (count think about construnting string in the frist place.) **AOI
    return trioStringRepArray.join(" ")
}

console.log(amountToStringRepresentation("$3450102.04"))