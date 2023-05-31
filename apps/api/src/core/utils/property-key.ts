import slugify from 'slugify';

export const generatePropertyKey = (displayName: string) => {
  return slugify(displayName, {
    lower: true,
    trim: true,
    strict: true,
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
  });
};
