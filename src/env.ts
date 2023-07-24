import { z } from 'zod';

const serverConfig = z.object({
  PORT: z.number(),
  CLIENT_URL: z.string().url(),
  clientAuth0Config: z.object({
    secret: z.object({
      data: z.string(),
      encoding: z.enum(['base64', 'utf-8']),
    }),
    options: z.object({
      audience: z.string(),
      issuer: z.string(),
    }),
    publicKey: z.string(),
  }),
  serverApiAuth0Config: z.object({
    secret: z.object({
      data: z.string(),
      encoding: z.enum(['base64', 'utf-8']),
    }),
    options: z.object({
      audience: z.string(),
      issuer: z.string(),
    }),
  }),
});

const processEnv = {
  PORT: Number(process.env.PORT),
  CLIENT_URL: process.env.CLIENT_URL,
  clientAuth0Config: {
    secret: {
      data: process.env.CLIENT_AUTH0_CLIENT_SECRET,
      encoding: process.env.CLIENT_AUTH0_ENCODING,
    },
    options: {
      audience: process.env.CLIENT_AUTH0_CLIENT_ID,
      issuer: process.env.CLIENT_AUTH0_ISSUER,
    },
    publicKey: process.env.CLIENT_AUTH0_PUBLIC_KEY,
  },
  serverApiAuth0Config: {
    secret: {
      data: process.env.SERVER_API_AUTH0_CLIENT_SECRET,
      encoding: process.env.SERVER_API_AUTH0_ENCODING,
    },
    options: {
      audience: process.env.SERVER_API_AUTH0_CLIENT_ID,
      issuer: process.env.SERVER_API_AUTH0_ISSUER,
    },
  },
};

const env = serverConfig.parse(processEnv);

export { env };
