// get Customer

export const postCustomer = async (data) => {
    const url = 'http://localhost:5001/customer'
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .catch((err) => {
            console.log(err);
        });
};

export const putCustomer = async (data) => {
    const url = 'http://localhost:5001/customer'
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .catch((err) => {
            console.log(err);
        });
};