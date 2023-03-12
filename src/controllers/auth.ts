import { NextFunction, Request, Response, Router } from 'express';
import { AuthService } from 'src/services/auth';
import { validateBody } from 'src/libs/validator';

// Schemas

import registerSchema from 'src/schemas/register.schema.json';
import loginSchema from 'src/schemas/login.schema.json';

interface AuthControllerOptions {
    authService: AuthService;
}

export class AuthController{

  private router: Router;

  // eslint-disable-next-line no-unused-vars
  constructor( private readonly options: AuthControllerOptions ){

    this.router = Router();
    this.router.post( '/register', this.register.bind( this ) );
    this.router.post( '/login', this.login.bind( this ) );

  }

  getRouter(): Router{

    return this.router;

  }

  public async register( req: Request, res: Response, next: NextFunction ): Promise<Response | void>{

    try{

      validateBody( req.body, registerSchema );

      const { email, password, username } = req.body;

      const registerResponse = await this.options.authService.register( {
        email,
        password,
        username
      } );

      return res.status( 201 ).json( registerResponse );

    } catch( error ){

      return next( error );

    }

  }


  public async login( req: Request, res: Response, next: NextFunction ): Promise<Response | void>{

    try{

      validateBody( req.body, loginSchema );

      const loginResponse = await this.options.authService.login( {
        email:    req.body.email,
        password: req.body.password
      } );

      return res.status( 202 ).json( loginResponse );

    } catch( error ){

      return next( error );

    }

  }

}
