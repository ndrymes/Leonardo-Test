import 'reflect-metadata'; // for TypeORM
import { getConnection, getCustomRepository } from 'typeorm';
import { connect } from 'src/db-connect';
import { AcronymsRepository } from 'src/repositories/acronyms';
import { HealthcheckController } from 'src/controllers/healthcheck';
import { UserRepository } from "src/repositories/user";
import { AuthService } from "src/services/auth";
import { HealthcheckService } from 'src/services/healthcheck';
import { AcronymsService } from 'src/services/acronyms';
import { AcronymsController } from 'src/controllers/acronyms';
import { AuthController } from "src/controllers/auth";

/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers, queue runners and crons
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function init(): Promise<Record<string, any>>{

  // repositories
  await connect();
  const acronymsRepository = getCustomRepository( AcronymsRepository );
  const userRepository = getCustomRepository(UserRepository)

  // services
  const healthcheckService = new HealthcheckService( getConnection() );
  const acronymsService = new AcronymsService({ acronymsRepository });
  const authService = new AuthService({ userRepository })

  // controllers
  const healthcheckController = new HealthcheckController( healthcheckService );
  const acronymsController = new AcronymsController({ acronymsService })
  const authController = new AuthController({ authService })

  return {
    healthcheckController,
    acronymsController,
    authController,
    acronymsRepository,
    userRepository
  };

}
