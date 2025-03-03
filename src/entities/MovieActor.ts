import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./Movie";
import { Actor } from "./Actor";

@Index("fk_movie_actor_actor_idx", ["actorId"], {})
@Index("fk_movie_actor_movie_idx", ["movieId"], {})
@Entity("movie_actor", { schema: "movie_cache" })
export class MovieActor {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "movie_actor_id",
    unsigned: true,
  })
  movieActorId: number;

  @Column("int", { name: "movie_id", unsigned: true })
  movieId: number;

  @Column("int", { name: "actor_id", unsigned: true })
  actorId: number;

  @ManyToOne(() => Actor, (actor) => actor.movieActors, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "actor_id", referencedColumnName: "actorId" }])
  actor: Actor;

  @ManyToOne(() => Movie, (movie) => movie.movieActors, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;
}
