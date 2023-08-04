import { Client } from '@notionhq/client';

const config = useRuntimeConfig();

const DATABASE_ID = '0e4fc90a39d6408d9434da8f71049f29';

const notion = new Client({
  auth: config.NOTION_API_KEY,
});

function notionPropertiesById(properties: any) {
  return Object.values(properties).reduce((obj, property) => {
    const { id, ...rest } = property as any;
    return { ...(obj as any), [id]: rest };
  }, {});
}

async function getDatabase() {
  const notionPages = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ property: config.NOTION_CREATED_AT, direction: 'descending' }],
  });

  return notionPages.results.map(fromNotionObject);
}

function fromNotionObject(notionPage: any) {
  const propertiesById = notionPropertiesById(notionPage.properties) as any;
  //   return propertiesById;

  return {
    id: notionPage.id,
    created_at: propertiesById[config.NOTION_CREATED_AT].created_time,
    name: propertiesById[config.NOTION_NAME].rich_text[0].plain_text,
    phone: propertiesById[config.NOTION_PHONE].phone_number,
    mesero: propertiesById[config.NOTION_MESERO].title[0].plain_text,
    firstQuestion: propertiesById[config.NOTION_FIRSTQUESTION].rich_text[0].plain_text,
    secondQuestion: propertiesById[config.NOTION_SECONDQUESTION].rich_text[0].plain_text,
    thirdQuestion: propertiesById[config.NOTION_THIRDQUESTION].rich_text[0].plain_text,
    fourthQuestion: propertiesById[config.NOTION_FOURTHQUESTION].rich_text[0].plain_text,
    fifthQuestion: propertiesById[config.NOTION_FIFTHQUESTION].rich_text[0].plain_text,
    comment: propertiesById[config.NOTION_COMMENT].rich_text[0].text.content,
    complete: propertiesById[config.NOTION_COMPLETE].checkbox,
  };
}

export default defineEventHandler(async (event) => {
  return await getDatabase();
});
