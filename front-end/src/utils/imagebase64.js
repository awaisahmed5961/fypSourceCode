const imagebase64 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(resolve => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};
export default imagebase64;