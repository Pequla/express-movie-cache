import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./Movie";

@Index("uq_director_name", ["name"], { unique: true })
@Entity("director", { schema: "movie_cache" })
export class Director {
  @PrimaryGeneratedColumn({ type: "int", name: "director_id", unsigned: true })
  directorId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}
