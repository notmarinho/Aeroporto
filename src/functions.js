import _ from 'lodash';

export const findObj = (data, value, field, returnField) => {
    if (data.length == 0) {
        console.log('RETORNOU NADA ⚠️');
        return field
    } else {
        const item = _.find(data, { [field]: value });
        if (item && returnField) {
            return item[returnField]
        } else if (item) { 
            return item
        } else {
            //Item nao encontrado
            return field
        }
    }
}