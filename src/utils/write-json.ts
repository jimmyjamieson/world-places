import { writeFile } from "fs";

const writeToJson = async(data, path) => {
  await writeFile(
    path,
    JSON.stringify(data),
    'utf8',
    function(error) {
      if (error) {
        return { error: error.toString() };
      }
    },
  );

}

export default writeToJson