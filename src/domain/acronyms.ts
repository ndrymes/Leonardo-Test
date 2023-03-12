import { Column,
  Entity,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Acronyms{

  @PrimaryColumn()
    id: string;

  @Column()
  @Index( { unique: true } )
    acronym: string;

  @Column()
    definition: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

  @BeforeInsert()
  generateUUID(): void{

    this.id = `eu-${ uuidv4() }`;

  }

}
