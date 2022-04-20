// get courses

export const getCourses = async () => {
    const url = 'http://localhost:5001/courses'
    return fetch(url)
        .then(response => response.json())
        .catch((err) => {
            console.log(err);
        });
};

export const getCourse = async (id) => {
    const url = 'http://localhost:5001/courses/' + id
    return fetch(url)
        .then(response => response.json())
        .catch((err) => {
            console.log(err);
        });
};