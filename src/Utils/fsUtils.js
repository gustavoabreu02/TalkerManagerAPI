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

async function updateTalkerData(id, updatedTalkerData) {
    const oldTalkers = await readTalkersData();
    const updatedTalker = { id, ...updatedTalkerData };
    const updatedTalkers = oldTalkers.reduce((talkersList, currentTalker) => {
        if (currentTalker.id === updatedTalker.id) {
            return [...talkersList, updatedTalker];
        }
        return [...talkersList, currentTalker];
    }, []);

    const updatedData = JSON.stringify(updatedTalkers);

    try {
      await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), updatedData);
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
    }
}

async function deleteTalkerData(id) {
    const oldTalkers = await readTalkersData();
    const updatedTalkers = oldTalkers.filter((currentTalker) => currentTalker.id !== id);
    const updatedData = JSON.stringify(updatedTalkers);
    try {
        await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), updatedData); 
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
    }
}

module.exports = {
    readTalkersData,
    writheNewTalkerData,
    updateTalkerData,
    deleteTalkerData,
};