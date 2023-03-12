import { EntityRepository } from 'typeorm';
import { Acronyms } from 'src/domain/acronyms';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

export interface CreateAcronymsPayload {
  acronym: string;
  definition: string;
}

@EntityRepository( Acronyms )
export class AcronymsRepository extends BaseRepository<Acronyms>{

  public async findAndCountAcronyms( queryparams: any ): Promise<[ Acronyms[], number]>{

    const { from = 0, limit = 10, search = '' } = queryparams;

    return this.createQueryBuilder( 'acronym' )
      .where( 'acronym.acronym ILIKE :search', { search: `%${ search || '' }%` } )
      .orderBy( 'acronym.acronym' )
      .skip( from )
      .take( limit )
      .cache( true )
      .getManyAndCount();

  }

  public async getAcronym( acronym: string ): Promise<Acronyms>{

    return this.findOne( { acronym } );

  }

  public async getRandomCount( count: number = 10 ): Promise<Acronyms[]>{

    console.log( count );

    return  this.createQueryBuilder()
      .orderBy( 'RANDOM()' )
      .take( count )
      .getMany();

  }

  public async createAcronyms( createAcronymsPayload: CreateAcronymsPayload ): Promise<Acronyms>{

    return this.save(
      this.create( {
        acronym:    createAcronymsPayload.acronym,
        definition: createAcronymsPayload.definition
      } )
    );

  }

  public async updateAcronym( existingAcronym:Acronyms ): Promise<Acronyms>{

    return this.save( existingAcronym );

  }

  public async deleteAcronym( existingAcronym: Acronyms ){

    return this.delete( existingAcronym.id );

  }

}
