const	path	=	require("path");
module.exports	=	{
		entry:	["whatwg-fetch","./js/main.jsx"],
		output:	{
        filename:	"out.js",
				path:	path.resolve("js")

		},
				devServer:	{
				inline:	true,
				contentBase:	'./',
				port:	3001
		},
		watch:	true,
		module:	{
				loaders:	[{
								test:	/\.jsx$/,		exclude:	/node_modules/,
								loader:	'babel-loader',
								query:	{	presets:	[	'es2015',	'stage-2',	'react']	}
				}]
		}
}
