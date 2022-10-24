const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkersData() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
        const talkers = JSON.parse(data);
        return talkers;
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
    }
}

async function writheNewTalkerData(newTalker) {
  try {
    const oldTalkers = await readTalkersData();
    const allTalkers = JSON.stringify([...oldTalkers, newTalker]);

    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), allTalkers);
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

module.exports = {
    readTalkersData,
    writheNewTalkerData,
};