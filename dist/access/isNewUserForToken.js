"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNewUserForToken = async ({ req, id, data }) => {
    /**
     * In create new user for valid token return true
     */
    if (req.body?.token) {
        if (req.user)
            return Boolean(false);
        const response = await req.payload.find({
            collection: 'tokennewusers',
            where: {
                token: { equals: req.body.token },
                used: { equals: false || undefined },
            },
        });
        if (response.docs.length > 0)
            return Boolean(true);
    }
    else {
        /**
         * Case user editor return false
         */
        if (req.user)
            if (req.user?.roles.includes('admin'))
                return Boolean(true);
    }
    /**
     * Another return false
     */
    return Boolean(false);
};
exports.default = isNewUserForToken;
