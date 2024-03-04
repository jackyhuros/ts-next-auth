import { z } from "zod";

const envVariables = z.object({
  /**
   * Add env vars into this list
   */
  NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY: z.string(),
  NEXT_PUBLIC_SEQUENCE_PROJECT_NAME: z.string(),
  ENVIRONMENT: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
