import type { CreateToDoInput, UpdateToDoInput} from "./todo.types.js";

export function validateCreateToDo(data: CreateToDoInput) {
    const cleanTitle = (data.title ? data.title : '').trim();

    if(cleanTitle === ''){
        throw new Error(`Input cannot be empty`);
    }

    return {
        title: cleanTitle
    };
}


export function validateUpdateToDo(data: UpdateToDoInput): UpdateToDoInput{
    const cleanData: UpdateToDoInput = {};

    if (data.title !== undefined) {
        const cleanTitle = data.title.trim();
        if (cleanTitle === '') {
            throw new Error('Input cannot be empty');
        }
        cleanData.title = cleanTitle;
    }

    if (data.is_completed !== undefined) {
        if (typeof data.is_completed !== 'boolean') {
            throw new Error('Invalid credentials');
        }
        cleanData.is_completed = data.is_completed;
    }

    if(Object.keys(cleanData).length === 0){
        throw new Error(`At least one field must be provided`)
    }

    return cleanData;

};
