

class QuestionWithOptions {

    constructor(public readonly question: string, public readonly options: string[]) {
        
    }

    checkAnswer(answer: string): boolean {
        return this.options.includes(answer);
    }
}

