import fs from 'node:fs'

export class GameService {
  public dictionary: string[]

  constructor() {
    this.dictionary = fs.readFileSync('./src/libs/words.txt', 'utf8').split('\n').map(word => word.trim())
  }

  findCombinations(letters: string, qtyLetter: number): string[] {
    const words: string[] = []

    this.generateWordsThree(qtyLetter, words, letters)

    return words
  }

  generateWordsThree(qtyLetter: number, words: string[], letters: string): void {
    const dictionary = this.dictionary

    for (const word of dictionary) {
      if (word.length === qtyLetter && this.validateWord(word, letters.toLowerCase())) {
        words.push(word)
      }
    }
  }

  validateWord(word: string, letters: string): boolean {
    const wordsCorrect = new Map<string, number>()

    for (const letter of letters) {
      wordsCorrect.set(letter, (wordsCorrect.get(letter) ?? 0) + 1)
    }

    for (const letter of word) {
      if (!wordsCorrect.has(letter) || wordsCorrect.get(letter)! === 0) {
        return false
      } else {
        wordsCorrect.set(letter, wordsCorrect.get(letter)! - 1)
      }
    }

    return true
  }
}
