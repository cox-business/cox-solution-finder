var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Map Model
 * =============
 */

var Map = new keystone.List('Map', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	track: true
});


Map.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', note: "This section will not show up unless published is chosen", index: true },
	map: {
		type: Types.S3File,
		label: 'Map Image',
		note: "Upload a 3400px by 1300px image to be the map overlay image. Image should be the map, with text and overlay, with a blurred white background.",
		s3path: 'uploads/images/map_overlays'
	},
	products: { type: Types.Relationship, label: "Related Products", note: "Choose 3 Products to show up next to the Map Overlay.", ref: 'Product', many: true, initial: false },
});

Map.register();
