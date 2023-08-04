import { Client } from '@notionhq/client';

const config = useRuntimeConfig();

const DATABASE_ID = '0e4fc90a39d6408d9434da8f71049f29';

const notion = new Client({
  auth: config.NOTION_TOKEN,
});

export async function getDatabase() {
  const response = await notion.databases.retrieve({ database_id: DATABASE_ID });
  console.log(response);
}
