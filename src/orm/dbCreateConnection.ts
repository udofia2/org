import { DataSource } from 'typeorm';

import config from './config/ormconfig';

export const dataSource = new DataSource(config);

export const dbCreateConnection = async (): Promise<DataSource | null> => {
  try {
    await dataSource.initialize(); 
    console.log(
      `Database connection success. Connection name: '${dataSource.options.database}' Database: '${dataSource.options.database}'`,
    );
  } catch (err) {
    if (err.name === 'AlreadyHasActiveConnectionError') {
      const activeConnection = new DataSource(config); 
      return activeConnection;
    }
    console.log(err);
  }
  return null;
};
