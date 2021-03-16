import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";

declare global {
  namespace Express {
    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      issueRepository?: EntityRepository<Issue>;
    }
  }
}
