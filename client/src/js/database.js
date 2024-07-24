import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // Export a function to add content to the database
export const putDb = async (content) => {
  console.log('Adding content to the database');

  // Create connection to the DB and version 
  const jateDb = await openDB('jate', 1);

  // Create a transaction and specify database/privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open the object store
  const store = tx.objectStore('jate');

  // Use the .add() method on the store to pass in the content
  const request = store.add({ content: content });

  // Confirmation of request
  const result = await request;
  console.log('Data saved to the database', result);
};

// Export a function to get data from the database
export const getDb = async () => {
  console.log('Getting data from the database.');

  // Create a connection to the database
  const jateDb = await openDB('jate', 1);

  // Create a transaction and specify database/privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open the object store
  const store = tx.objectStore('jate');

  // Use .getAll() method to get data from the database
  const request = store.getAll();

  // Confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result;
;}

// Start the database
initdb();
