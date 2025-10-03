import { SQLiteProvider } from "expo-sqlite";

export default function App() {
  return (<>
    <SQLiteProvider
      databaseName="myDatabase2.db"
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY NOT NULL,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL
            email TEXT NOT NULL UNIQUE
            phone TEXT NOT NULL 
          );
          PRAGMA journal_mode=WAL;
        `);
      }}
    >
      {/* Seu conteúdo aqui */}
    </SQLiteProvider>
</> );
    }