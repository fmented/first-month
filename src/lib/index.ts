function test(str: string) {
    const lowerCaseA = 'a'.charCodeAt(0)

    return str.toLowerCase()
        .split('')
        .map((char) => char.charCodeAt(0) - lowerCaseA + 1)

}