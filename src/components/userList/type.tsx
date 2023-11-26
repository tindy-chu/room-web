import { z } from 'zod';

export const zUser = z.object({
  id: z.string(),
  iam_id: z.string(),
  email: z.string().email(),
  alias: z.string().nullable(),
  status: z.enum(['online', 'offline', 'busy']),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

export const zUserList = z.array(zUser);
export type TZUserList = z.infer<typeof zUserList>;

export const zUserListResponse = z.object({
  data: z.array(zUser),
});
export type TZUserListResponse = z.infer<typeof zUserListResponse>;
