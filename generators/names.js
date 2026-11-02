const toWords = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[\s_\-/]+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const toNames = (value) => {
  const words = toWords(value);
  const pascal = words.map(capitalize).join('');

  return {
    kebab: words.join('-'),
    pascal,
    camel: pascal.charAt(0).toLowerCase() + pascal.slice(1),
    constant: words.join('_').toUpperCase(),
    title: capitalize(words.join(' ')),
    words: words.join(' '),
  };
};

export const KEBAB_CASE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
