import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Director } from "./Director";
import { MovieActor } from "./MovieActor";
import { MovieGenre } from "./MovieGenre";

@Index("uq_movie_short_url", ["shortUrl"], { unique: true })
@Index("fk_movie_director_idx", ["directorId"], {})
@Entity("movie", { schema: "movie_cache" })
export class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column("varchar", { name: "internal_id", length: 255 })
  internalId: string;

  @Column("varchar", { name: "corporate_id", length: 255 })
  corporateId: string;

  @Column("int", { name: "director_id", unsigned: true })
  directorId: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("varchar", { name: "original_title", length: 255 })
  originalTitle: string;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("varchar", { name: "short_description", length: 255 })
  shortDescription: string;

  @Column("varchar", { name: "poster", length: 255 })
  poster: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("varchar", { name: "short_url", unique: true, length: 255 })
  shortUrl: string;

  @Column("int", { name: "run_time" })
  runTime: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Director, (director) => director.movies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "director_id", referencedColumnName: "directorId" }])
  director: Director;

  @OneToMany(() => MovieActor, (movieActor) => movieActor.movie)
  movieActors: MovieActor[];

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.movie)
  movieGenres: MovieGenre[];
}
