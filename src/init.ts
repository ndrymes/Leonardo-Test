import 'reflect-metadata'; // for TypeORM
import { getConnection } from 'typeorm';
import { connect } from 'src/db-connect';
import { HealthcheckController } from 'src/controllers/healthcheck';
import { HealthcheckService } from 'src/services/healthcheck';

/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers, queue runners and crons
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function init(): Promise<Record<string, any>>{

  // repositories
  await connect();

  // services
  const healthcheckService = new HealthcheckService( getConnection() );

  // controllers
  const healthcheckController = new HealthcheckController( healthcheckService );

  return {
    healthcheckController,
  };

}
