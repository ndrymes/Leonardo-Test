
const fs = require('fs');
import path from "path";
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../../data.txt');

const acronyms = fs.readFileSync(filePath, "utf8");

interface Acronym {
  abbreviation: string;
  meaning:string
}

function convertTextToArray(text: string) {
  // Remove the newline characters and any extra whitespace from the beginning and end of the text
  text = text.trim();

  // Remove the opening and closing brackets
  text = text.slice(1, -1);

  // Split the text into an array of strings, each representing an object
  const objectStrings = text.split(',\n')
  console.log({ objectStrings });

  // Parse each object string as JSON and return the resulting array of objects
  return objectStrings.map(str => str.replace(/\n/g, ''));
}

const acronymsArray = convertTextToArray(acronyms)

// Build the SQL statements
function buildSqlStatement(arr: any[], tableName: string) {
  const parsedData = JSON.parse(`[${arr}]`);
  const values = parsedData.map((acronym:Acronym) => {
    const [abbreviation, meaning] = Object.entries(acronym)[0]
    return `INSERT INTO ${tableName}(id, acronym, definition) VALUES('${uuidv4()}', '${abbreviation.replace(/'/g, "''")}', '${meaning.replace(/'/g, "''")}');`;
  })
  return values.join('\n');

}

const SqlStatement = buildSqlStatement(acronymsArray, 'acronyms')

// Write the SQL file
fs.writeFileSync(path.join(__dirname, '../../srcipts/dump.sql'), SqlStatement);