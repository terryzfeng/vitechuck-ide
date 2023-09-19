//-------------------------------------------------
// title: FileLoader
// desc:  Fetching and loading files into IDE
//
// author: terry feng
// date:   September 2023
//-------------------------------------------------

export interface File {
    name: string;
    data: string | Uint8Array;
}

/**
 * Load a text file, can be a .ck file or a generic text file
 * @param url
 */
export async function fetchTextFile(url: string): Promise<File> {
    const fileName = url.split("/").pop();
    let response = await fetch(url);
    let text = await response.text();
    return { name: fileName!, data: text };
}

/**
 * Load a binary file, good for loading wav files
 */
export async function fetchFile(url: string): Promise<File> {
    // const fileName = url.split('/').pop();
    // let response = await fetch(url)
    // let blob = await response.blob();
    // let data = new Uint8Array(await blob.arrayBuffer());
    // return { name: fileName!, data: data};
    let file: File;
    await fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
            file = {
                name: url.split("/").pop()!, // file name
                data: new Uint8Array(buffer), // file data
            };
        });
    return file!;
}
