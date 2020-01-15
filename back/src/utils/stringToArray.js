module.exports = function stringToArray(arrayAsString){
    return arrayAsString.split(",").map(tech => tech.trim()) //trim remove espaços
}