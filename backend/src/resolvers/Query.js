const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
	// forwardto('db') for items is the same as implementing as the items() resolver
	items: forwardTo('db'),
	item: forwardTo('db'),
	itemsConnection: forwardTo('db'),
	// /**
	//  * Get items
	//  * @param parent -
	//  * @param args - arguments of items
	//  * @param ctx - context of request
	//  * @param info - additional info
	//  */
	// async items(parent, args, ctx, info) {
	//     return await ctx.db.query.items();
	// }

	/**
	 * Get the currently logged in user
	 * @param parent
	 * @param args - arguments of signup
	 * @param ctx - context of request
	 * @param info - additional info, actual query coming from client side
	 * @returns {Promise<void>}
	 */
	currentUser(parent, args, ctx, info) {
		// check if there is a current userId
		isLoggedIn(ctx);

		return ctx.db.query.user({
			where: {
				id: ctx.request.userId
			}
		}, info);
	},

	/**
	 * Get a list of users
	 * @param parent
	 * @param args - arguments of signup
	 * @param ctx - context of request
	 * @param info - additional info, actual query coming from client side
	 * @returns {Promise<void>}
	 */
	async users(parent, args, ctx, info) {
		// check if logged in
		isLoggedIn(ctx);
		// check if user has permissions to query
		const PERMISSIONS = ['ADMIN', 'PERMISSIONUPDATE'];
		hasPermission(ctx.request.user, PERMISSIONS);
		// query users
		return await ctx.db.users({}, info);
	}
};

/**
 * Check if a user is logged in
 * @param ctx - context of request
 * @returns nothing if logged in,
 */
function isLoggedIn(ctx) {
	if (!ctx.request.userId) {
		throw new Error('You must log in first');
	}
}

module.exports = Query;
