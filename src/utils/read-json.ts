import { readFileSync } from "fs";

const readFromJson = async(path) => {
  const json = await readFileSync(path).toString();
  return JSON.parse(json);
}

export default readFromJson