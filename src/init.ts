import 'reflect-metadata'; // for TypeORM
import { getConnection, getCustomRepository } from 'typeorm';
import { connect } from 'src/db-connect';
import { AcronymsRepository } from 'src/repositories/acronyms';
import { HealthcheckController } from 'src/controllers/healthcheck';
import { HealthcheckService } from 'src/services/healthcheck';
import { AcronymsService } from 'src/services/acronyms';
import { AcronymsController } from 'src/controllers/acronyms';

/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers, queue runners and crons
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function init(): Promise<Record<string, any>>{

  // repositories
  await connect();
  const acronymsRepository = getCustomRepository( AcronymsRepository );

  // services
  const healthcheckService = new HealthcheckService( getConnection() );
  const acronymsService = new AcronymsService({ acronymsRepository });

  // controllers
  const healthcheckController = new HealthcheckController( healthcheckService );
  const acronymsController = new AcronymsController({ acronymsService })

  return {
    healthcheckController,
    acronymsController
  };

}
