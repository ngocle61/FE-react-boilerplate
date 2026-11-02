export const toInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const edges = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : parts;
  return edges.map((part) => part.charAt(0).toUpperCase()).join('');
};
