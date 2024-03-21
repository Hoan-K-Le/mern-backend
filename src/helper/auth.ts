import bcrypt from "bcrypt";
const hashPassword = async (password: string) => {
  return new Promise((resolve: any, rejected: any) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        rejected(error);
      } else {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            rejected(error);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
};

const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export { comparePassword, hashPassword };
