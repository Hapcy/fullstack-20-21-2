import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";
import { User as ApplicationUser } from "./entities/user";

declare global {
  namespace Express {

    interface User extends ApplicationUser {}

    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      issueRepository?: EntityRepository<Issue>;
      userRepository?: EntityRepository<User>;
    }
  }
}
