import * as fs from 'fs';
import * as path from 'path';
import prompts from 'prompts';
import '../envConfig.ts';

const koFilePath = path.resolve(__dirname, '../messages/ko.json');
const enFilePath = path.resolve(__dirname, '../messages/en.json');

/** Helper function to extract translations from parsed JSON data  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractTranslations = (rows: any) => {
  const translations: { [key: string]: { ko: string; en: string } } = {};

  if (!rows || !Array.isArray(rows)) {
    return translations;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows.forEach((row: any, index: number) => {
    if (row.type === 'tableRow' && Array.isArray(row.content)) {
      const cells = row.content;

      /** skip table head */
      if (index === 0) return;

      const koText = cells[0]?.content?.[0]?.content?.[0]?.text || '';
      const enText = cells[1]?.content?.[0]?.content?.[0]?.text || '';

      if (koText && enText) {
        translations[koText] = { ko: koText, en: enText };
      }
    }
  });

  return translations;
};

/** Ensure the directories exist */
const ensureDirectory = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveToFile = (filePath: string, data: any) => {
  ensureDirectory(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

/** Fetch translation data */
const processTranslations = async (email: string, token: string) => {
  const API_URL = process.env.TRANSLATION_API_URL ?? '';

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${email}:${token}`).toString(
          'base64'
        )}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const jsonData = await response.json();
    const parsedData = JSON.parse(
      jsonData.body.atlas_doc_format.value
    ).content.at(0).content;

    const translations = extractTranslations(parsedData);

    const koTranslations: { [key: string]: string } = {};
    const enTranslations: { [key: string]: string } = {};

    Object.entries(translations).forEach(([key, value]) => {
      koTranslations[key] = value.ko;
      enTranslations[key] = value.en;
    });

    saveToFile(koFilePath, koTranslations);
    saveToFile(enFilePath, enTranslations);

    console.log('Translations saved successfully!');
  } catch (error) {
    console.error('Error processing translations:', error);
  }
};

const getCredentials = async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'email',
      message: 'Enter your email:',
    },
    {
      type: 'password',
      name: 'token',
      message: 'Enter your token:',
    },
  ]);

  if (!response.email || !response.token) {
    console.error('Email and API token are required!');
    process.exit(1);
  }

  return response;
};

(async () => {
  const { email, token } = await getCredentials();
  await processTranslations(email, token);
})();
