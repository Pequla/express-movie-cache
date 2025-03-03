import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MovieGenre } from "./MovieGenre";

@Index("uq_genre_name", ["name"], { unique: true })
@Entity("genre", { schema: "movie_cache" })
export class Genre {
  @PrimaryGeneratedColumn({ type: "int", name: "genre_id", unsigned: true })
  genreId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.genre)
  movieGenres: MovieGenre[];
}
