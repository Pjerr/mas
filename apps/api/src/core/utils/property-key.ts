import slugify from 'slugify';

export const generateProperyKey = (displayName: string) => {
  return slugify(displayName, {
    lower: true,
    trim: true,
    strict: true,
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
  });
};
