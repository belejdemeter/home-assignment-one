import {InvalidInputException} from "../exceptions";
import {questionRepository} from "../repository/question_repository";
import {ICommand} from "./index";
import validator from 'validator';

/**
 * The list of answers should be of chunks with confidence above (and including) 70%
 */
export class AskQuestionQuery implements ICommand<any> {
    constructor(private readonly question: string) {}

    async execute() {
        this.validate();

        const chunkIds = await questionRepository.getChunks(this.question)
            .then(chunks => chunks
                .filter(e => e.isConfident())
                .map(e => e.chunkId)
            );

        return questionRepository.getAnswerContent(chunkIds);
    }

    validate(): void {
        if (!validator.isLength(this.question, { min: 5 })) {
            throw new InvalidInputException({question: 'Question is too short'})
        }
    }
}