export type QuestionWhen = {
    type: 'when';
    question: string;
    correctAnswer: string | Date | ((answer: Date) => boolean);
}

export type QuestionWhat = {
    type: 'what';
    question: string;
    correctAnswer: string | ((answer: string) => boolean);
}

type ImageOption = {
    type: 'image';
    src: string;
    label?: string;
    aspectRatio?: string;
}

type URLOption = {
    type: 'url';
    url: string;
    label?: string;
}

type AudioOption = {
    type: 'audio';
    src: string;
    label?: string;
}

type VideoOption = {
    type: 'video';
    src: string;
    label?: string;
    aspectRatio?: string;
}

type TextOption = {
    type: 'text';
    text: string;
    label?: string;
}

export type Option = ImageOption | URLOption | AudioOption | VideoOption | TextOption | string;

export type QuestionChoice<T extends Record<string, Option> = Record<string, Option>> = {
    type: 'choice';
    question: string;
    options: T;
    correctAnswer: keyof T;
}

export type QuestionMultipleChoice<T extends Record<string, Option> = Record<string, Option>> = {
    type: 'multiple-choice';
    question: string;
    options: T;
    correctAnswer: (keyof T)[];
}

export type Question<T extends Record<string, Option> = Record<string, Option>> = QuestionWhen | QuestionWhat | QuestionChoice<T> | QuestionMultipleChoice<T>;
