import {
  Column,
  Entity,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity( 'users' )
export class User{

  @PrimaryColumn()
    id: string;

  @Column()
  @Index( { unique: true } )
    email: string;

  @Column()
    username: string;

  @Column()
    password: string;

    @Column( {
      nullable: true
    } )
      last_logged_in_at: Date;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

  @BeforeInsert()
  generateUUID(): void{

    this.id = `eu-${ uuidv4() }`;

  }

}
