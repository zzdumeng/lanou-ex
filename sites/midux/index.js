/**
 * require the pug and stylus files
 * except : common.styl, footer.styl, header.styl
 *  and footer.pug, header.pug
 */
function requireAll (r) { r.keys().forEach(r); }
// ((?<!(header|footer))\.pug)|((?<!(header|footer))\.styl)
requireAll(require.context('./src', true, 
/((?<!(header|footer))\.pug)|((?<!(header|footer))\.styl)/
));
// requireAll(require.context('./src', true, /(\.pug$)/));

var x =3;