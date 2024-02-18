


export const fileReaderXlsx = (file) => {
    return new Promise<ProgressEvent<FileReader>>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e: any) => {
            resolve(e)
        };
        reader.onerror = (err: any) => {
            reject(err)
        }
    })
}