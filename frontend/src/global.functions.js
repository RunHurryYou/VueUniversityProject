/**
 * Обрабатывает ошибку.
 * @public
 * @function
 * @name formatError
 * @param {String} err - Данные об ошибке
 * @returns {String} Описание ошибки
 */
function formatError(err) {
    if (err.response) {
        if (!err.response.data) return '500 API Server Error';
        if (err.response.data.errors) {
            return err.response.data.errors.map(o => o.detail).join('<br>')
        }
        if (err.response.statusText) {
            return `${err.response.status} ${err.response.statusText}: ${err.response.data}`
        }
    }
    if (err.message){
        return err.message
    }
    return "" + err;
}

export var globalFunctions = {
    formatError: formatError
};