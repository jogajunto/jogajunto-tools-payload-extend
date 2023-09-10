import { Access } from 'payload/config';

const isNewUserForToken: Access<any, any> = async ({ req, id, data }) => {
  /**
   * Case user editor return false
   */
  if (req.user)
    if (req.user?.roles.includes('editor') || req.user?.roles.includes('admin'))
      return Boolean(false);
  /**
   * In create new user for valid token return true
   */
  const response = await req.payload.find({
    collection: 'tokennewusers',
    where: {
      token: { equals: req.body.token },
      used: { equals: false || undefined },
    },
  });
  if (response.docs.length > 0) return Boolean(true);
  /**
   * Another return false
   */
  return Boolean(false);
};

export default isNewUserForToken;
