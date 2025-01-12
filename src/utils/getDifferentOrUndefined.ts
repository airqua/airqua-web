export const getDifferentOrUndefined = (oldValue: string, newValue: string | undefined) => {
    if(!newValue) return undefined;
    if(oldValue === newValue) return undefined;
    return newValue;
}