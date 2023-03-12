/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { AcronymsRepository, CreateAcronymsPayload } from 'src/repositories/acronyms';
import { StandardError } from 'src/domain/standard-error';
import { ErrorCodes } from 'src/domain/errors';


export interface Payload {
  vehicleId: number;
  timestamp: Date;
}
interface AcronymsServiceOptions {
  acronymsRepository: AcronymsRepository;
}

export class AcronymsService{

  constructor( private readonly options: AcronymsServiceOptions ){ }

  public async findAndCountAcronyms( queryparams: any ){

    return this.options.acronymsRepository.findAndCountAcronyms( queryparams );

  }

  public async get( acronym:string ){

    return this.options.acronymsRepository.getAcronym( acronym );

  }

  public async getRandomCount( count: string ){

    const parsedCount = parseInt( count ) || 10;

    return this.options.acronymsRepository.getRandomCount( parsedCount );

  }

  public async create( createAcronymsPayload: CreateAcronymsPayload ){

    return this.options.acronymsRepository.createAcronyms( createAcronymsPayload );

  }

  public async update( acronym: string, definition: string ){

    const existingAcronym = await this.options.acronymsRepository.getAcronym( acronym );

    if( !existingAcronym ){

      throw new StandardError( ErrorCodes.ACRONYM_NOT_FOUND, 'Acronym does not exist' );

    }

    existingAcronym.definition = definition;

    return this.options.acronymsRepository.updateAcronym( existingAcronym );

  }

  public async delete( acronym: string ){

    const existingAcronym = await this.options.acronymsRepository.getAcronym( acronym );

    if( !existingAcronym ){

      throw new StandardError( ErrorCodes.ACRONYM_NOT_FOUND, 'Acronym does not exist' );

    }

    return this.options.acronymsRepository.deleteAcronym( existingAcronym );

  }

}
