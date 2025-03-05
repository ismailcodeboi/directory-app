const fs = require('fs');
const path = require('path');

const resolvers = {
    listDirectory: ({ path: dirPath }) => {
        try {
            const files = fs.readdirSync(dirPath);
            return files.map((file) => {
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