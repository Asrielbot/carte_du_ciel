import papa from "papaparse";

export async function parseCSV(csvFile) {
  return new Promise((resolve, reject) => {
    papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
