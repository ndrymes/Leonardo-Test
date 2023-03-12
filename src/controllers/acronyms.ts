/* eslint-disable id-blacklist */
import { Request, Response, Router, NextFunction } from 'express';

import { AcronymsService } from 'src/services/acronyms';
import { hasNextPage } from 'src/utils/hasmore'
import { handleTokenAuthorization } from 'src/middlewares/handle-Token-authorization';

interface AcronymsControllerOptions {
  acronymsService: AcronymsService;
}

export class AcronymsController{

  private router: Router;
  // eslint-disable-next-line no-unused-vars
  constructor( private readonly options: AcronymsControllerOptions ){

    this.router = Router();
    this.router.get('/acronyms', this.find.bind( this ) );
    this.router.get('/acronym/:acronym' , this.get.bind( this ) );
    this.router.get('/random/:count?' , this.getRandomCount.bind(this));
    this.router.post('/acronym', this.create.bind(this));
    this.router.put('/acronym/:acronym', handleTokenAuthorization(), this.update.bind(this));
    this.router.delete('/acronym/:acronym', handleTokenAuthorization(), this.delete.bind(this));

  }

  getRouter(): Router{

    return this.router;

  }

  public async find(req: Request, res: Response, next: NextFunction ): Promise<Response | void>{

    try{

      const queryparams = req.query;
      const [ acronyms, count] = await this.options.acronymsService.findAndCountAcronyms(queryparams);

      res.setHeader('X-Has-Next-Page', hasNextPage(queryparams, count).toString());
      return res.status( 200 ).json( acronyms );

    } catch( error ){

      return next( error );

    }

  }

  public async get( req: Request, res: Response, next: NextFunction ): Promise<Response | void>{

    try{

      const { acronym } = req.params;

      const acronymData = await this.options.acronymsService.get( acronym );
      if (!acronymData) return res.status(404).json({ error: 'Acronym not found' });
      
      return res.status(200).json( acronymData );

    } catch( error ){

      return next( error );

    }

  }

  public async getRandomCount(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    try {

      const { count  } = req.params;
      
      const acronymData = await this.options.acronymsService.getRandomCount(count);

      return res.status(200).json( acronymData );

    } catch (error) {

      return next(error);

    }

}

  public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    try {

      const { acronym, definition } = req.body;

      const acronymData = await this.options.acronymsService.create({ acronym, definition });

      return res.status(200).json(acronymData);

    } catch (error) {

      return next(error);

    }

  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    try {

      const { acronym } = req.params;
      const { definition } = req.body;

      const acronymData = await this.options.acronymsService.update( acronym, definition );

      return res.status(200).json(acronymData);

    } catch (error) {

      return next(error);

    }

  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    try {

      const { acronym } = req.params;
      
      const acronymData = await this.options.acronymsService.delete(acronym);

      return res.status(200).json(acronymData);

    } catch (error) {

      return next(error);

    }

  }

}

