/* eslint-disable no-undef */
import { createApp } from 'src/app';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { AcronymsRepository } from 'src/repositories/acronyms';


describe( 'Acronym API', ()=>{

  let acronymRepository: AcronymsRepository;
  let app: Express.Application;

  beforeAll( async()=>{

    app = await createApp();
    await getConnection().runMigrations();

  } );

  afterAll( async()=>{

    await getConnection().close();

  } );

  describe( 'GET /acronym', ()=>{

    test( 'returns a list of acronyms', async()=>{

      const response = await request( app ).get( '/v1/acronyms' );

      expect( response.statusCode ).toBe( 200 );
      expect( response.body ).toEqual( expect.any( Array ) );

    } );

    test( 'returns a paginated list of acronyms', async()=>{

      const response = await request( app ).get( '/v1/acronyms?from=50&limit=10' );

      expect( response.statusCode ).toBe( 200 );
      expect( response.body ).toHaveLength( 10 );
      expect( response.headers ).toHaveProperty( 'x-total-count' );
      expect( response.headers ).toHaveProperty( 'link' );

    } );

    test( 'returns acronyms that match the search query', async()=>{

      const response = await request( app ).get( '/v1/acronyms?search=BRB' );

      expect( response.statusCode ).toBe( 200 );
      expect( response.body ).toContainEqual( { acronym: 'BRB', definition: 'Be right back' } );

    } );

  } );

  describe( 'GET /acronym/:acronym', ()=>{

    test( 'returns an acronym and definition', async()=>{

      const response = await request( app ).get( '/v1/acronym/BRB' );

      expect( response.statusCode ).toBe( 200 );
      expect( response.body ).toEqual( { acronym: 'BRB', definition: 'Be right back' } );

    } );

  } );

  describe( 'GET /random/:count?', ()=>{

    test( 'returns a random set of acronyms', async()=>{

      const response = await request( app ).get( '/v1/random/3' );

      expect( response.statusCode ).toBe( 200 );
      expect( response.body ).toHaveLength( 3 );
      expect( response.body ).not.toContainEqual( { acronym: 'BRB', definition: 'Be right back' } );

    } );

  } );

  describe( 'POST /acronym', ()=>{

    test( 'adds a new acronym to the database', async()=>{

      const response = await request( app )
        .post( '/v1/acronym' )
        .send( { acronym: 'LOL', definition: 'Laughing Out Loud' } );

      expect( response.statusCode ).toBe( 201 );
      expect( await acronymRepository.findOne( { acronym: 'LOL' } ) ).not.toBeNull();

    } );

  } );

  describe( 'PUT /acronym/:acronym', ()=>{

    test( 'updates an existing acronym', async()=>{

      const response = await request( app )
        .put( '/v1/acronym/BRB' )
        .set( 'Authorization', 'Bearer mytoken' )
        .send( { definition: 'Be left back' } );

      expect( response.statusCode ).toBe( 200 );
      expect( response.body ).toEqual( { acronym: 'BRB', definition: 'Be left back' } );
      expect( await acronymRepository.findOne( { acronym: 'BRB' } ) ).not.toBeNull();

    } );

  } );

  describe( 'DELETE /acronym/:acronym', ()=>{

    test( 'deletes an existing acronym', async()=>{

      const response = await request( app )
        .delete( '/v1/acronym/LOL' )
        .set( 'Authorization', 'Bearer mytoken' );

      expect( response.statusCode ).toBe( 204 );

    } );

  } );

} );
