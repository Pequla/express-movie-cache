import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MovieActor } from "./MovieActor";

@Index("uq_actor_name", ["name"], { unique: true })
@Entity("actor", { schema: "movie_cache" })
export class Actor {
  @PrimaryGeneratedColumn({ type: "int", name: "actor_id", unsigned: true })
  actorId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => MovieActor, (movieActor) => movieActor.actor)
  movieActors: MovieActor[];
}
