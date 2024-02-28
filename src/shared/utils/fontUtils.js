export const getFontFamily = font => {
  switch (font) {
    case 'text':
      return 'System';
    default:
      return 'System';
  }
};

export const getFontWeight = font => {
  switch (font) {
    case 'medium':
      return '500';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    case 'ultrabold':
      return '800';
  }
};
