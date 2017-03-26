function requireAll(r) { r.keys().forEach(r); }
// Requiring whole sub files in this directory
// eslint-disable-next-line no-undef
requireAll(require.context('./', true, /\.js$/));
