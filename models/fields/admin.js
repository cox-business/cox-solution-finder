exports.headers = function (type) {
  if (type == 'settings') { return 'Settings'; } else
  if (type == 'content') { return 'Content'; } else
  if (type == 'media-buffet') { return 'Media Buffet'; } else
  if (type == 'media-section') { return 'Media Section'; } else
  if (type == 'media-fact') { return 'Media Fact'; } else
  if (type == 'media-value') { return 'Media Value'; } else
  if (type == 'resources') { return 'Resources'; } else
  { return 'HEADER NOT FOUND'; }
};
