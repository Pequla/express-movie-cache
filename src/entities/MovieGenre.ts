import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./Movie";
import { Genre } from "./Genre";

@Index("fk_movie_genre_genre_idx", ["genreId"], {})
@Index("fk_movie_genre_movie_idx", ["movieId"], {})
@Entity("movie_genre", { schema: "movie_cache" })
export class MovieGenre {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "movie_genre_id",
    unsigned: true,
  })
  movieGenreId: number;

  @Column("int", { name: "movie_id", unsigned: true })
  movieId: number;

  @Column("int", { name: "genre_id", unsigned: true })
  genreId: number;

  @ManyToOne(() => Genre, (genre) => genre.movieGenres, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "genre_id", referencedColumnName: "genreId" }])
  genre: Genre;

  @ManyToOne(() => Movie, (movie) => movie.movieGenres, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;
}
