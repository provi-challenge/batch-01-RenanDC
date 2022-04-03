// get form financing

export const getFinancing = async (input_value) => {
    const url = 'http://localhost:5001/financing/' + input_value
    return fetch(url)
        .then(response => response.json())
        .catch((err) => {
            console.log(err);
        });
};
