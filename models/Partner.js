var keystone = require('keystone'),
	Types = keystone.Field.Types,
	Fields = require('./fields/fields'),
	Admin = require('./fields/admin'),
	Variables = require('./fields/variables');

/**
 * Partners Model
 * ==========
 */

var Partner = new keystone.List('Partner', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	track: true
});

Partner.add(
	{
		title: {
			type: String,
			required: true,
			m_cms: { 
				validations: {
					required: true,
					rangelength: [1,25]
				},
				showroom: true, 
				companion: true
			}
		},
		state: Fields.state(),
		custom_ordered_services: {
			type: Types.Relationship,
			label: "Services",
			ref: 'Service',
			required: true,
			many: true,
			initial: false,
			note: "Select services and their order by dragging and dropping them. Choose 3 only for the Showroom. All 4 will show on Companion.",
			m_cms: { limit: 3, showroom: true, companion: true } 
		},
		heading: {
			type: String,  
			initial: false,
			required:true,
			label: "Partner Heading",
			m_cms: { 
				validations: {
					required: true,
					rangelength: [1,200]
				},
				showroom: true, 
				companion: true 
			}
		},
		content: {
			type: Types.Textarea, 
			height: 400, 
			required: true, 
			initial: false, 
			label: "Partner Content",
			m_cms: { 
				validations: {
					required: true,
					rangelength: [1,1000]
				},
				showroom: true, 
				companion: true
			} 
		},
		description: {
			type: String,
			required: true,
			initial: false,
			label: "Partner Description",
			note: "Text will appear on other pages linking this industry, and not the industry page itself.",
			m_cms: { 
				validations: {
					required: true,
					rangelength: [1,150]
				},
				showroom: true, 
				companion: true
			} 
		},
		svg_icon: Fields.svg_icon(),
		media_buffet: Fields.media_buffet(),
		resource_one: 	Fields.resource(),
		resource_two: 	Fields.resource(),
		resource_three: Fields.resource(),
		resource_four: 	Fields.resource(),
		editor: {
			type: Types.Relationship, 
			ref: 'User'
		},
		checkoutTime: {
			type: Types.Datetime,
			default: Date.now()
		}
	}
);

Partner.relationship({ ref: 'Service', refPath: ':service', path: ':industry' });

Partner.schema.methods.updateableFields = function() {
    return 'title, custom_ordered_services, heading, content, description, svg_icon, media_buffet.media_section_one.title, media_buffet.media_section_one.type, media_buffet.media_section_one.thumbnail, media_buffet.media_section_one.video.video, media_buffet.media_section_one.video.video_webm, media_buffet.media_section_one.video.poster, media_buffet.media_section_one.image, media_buffet.media_section_one.story.content, media_buffet.media_section_one.story.featured_image, media_buffet.values.title, media_buffet.values.content, media_buffet.facts.title, media_buffet.facts.featured_image, media_buffet.media_section_two.title, media_buffet.media_section_two.type, media_buffet.media_section_two.thumbnail, media_buffet.media_section_two.video.video, media_buffet.media_section_two.video.video_webm, media_buffet.media_section_two.video.poster, media_buffet.media_section_two.image, media_buffet.media_section_two.story.content, media_buffet.media_section_two.story.featured_image, resource_one.title, resource_one.svg_icon, resource_one.resource_type, resource_one.resource_link, resource_one.description, resource_two.title, resource_two.svg_icon, resource_two.resource_type, resource_two.resource_link, resource_two.description, resource_three.title, resource_three.svg_icon, resource_three.resource_type, resource_three.resource_link, resource_three.description, resource_four.title, resource_four.svg_icon, resource_four.resource_type, resource_four.resource_link, resource_four.description';
}

Partner.defaultColumns = 'title, state|20%, heading|20%, updatedAt';
Partner.register();