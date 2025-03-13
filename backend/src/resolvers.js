const fs = require('fs');
const path = require('path');

const resolvers = {
    listDirectory: ({ path: dirPath, limit, offset }) => {
        try {
            const files = fs.readdirSync(dirPath);
            const paginatedFiles = files.slice(offset || 0, (offset || 0) + (limit || files.length));
            return paginatedFiles.map((file) => {
                const fullPath = path.join(dirPath, file);
                const stats = fs.statSync(fullPath);
                return {
                    name: file,
                    path: fullPath,
                    size: stats.size,
                    extension: path.extname(file),
                    created: stats.birthtime.toISOString(),
                    permissions: stats.mode.toString(8),
                    isDirectory: stats.isDirectory(),
                };
            });
        } catch (error) {
            throw new Error(`Error reading directory: ${error.message}`);
        }
    },
};

module.exports = resolvers;