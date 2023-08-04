import { Client } from '@notionhq/client';

export function useSurveys() {
  const DATABASE_ID = '0e4fc90a39d6408d9434da8f71049f29';
  const notion = new Client({
    auth: 'secret_8Tsujpwy8uMb4clZQmzpeIJmuAi3QStppfUpyrCNDw4',
  });

  async function getDatabase() {
    const response = await notion.databases.retrieve({ database_id: DATABASE_ID });
    console.log(response.properties);
  }
  return { getDatabase };
}
