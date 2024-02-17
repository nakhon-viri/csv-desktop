


export const fileReader = () => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e: any) => {
            resolve(e)
        };
        reader.onerror = (err: any) => {
            reject(err)
        }
    })
}