// get payment

export const getPayments = async () => {
    const url = 'http://localhost:5001/payments'
    return fetch(url)
        .then(response => response.json())
        .catch((err) => {
            console.log(err);
        });
};