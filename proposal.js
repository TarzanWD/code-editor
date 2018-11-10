{
	type: FOLDER,
	name: "node_modules".
	childrens: {
		"nested_node_modules": {
			type: FOLDER,
			chidlrens: {
				index.js: {
					type: FILE,
					content: "console.log('hi')"
				}
			}
		}
		"index.js": {
			type: FILE,
			content: "console.log('boy')"
		}
	],
}

/node_modules
	/nested_node_modules
		index.js -> hi
	index.js -> boy


/node_modules/nested_node_modules/index.js
