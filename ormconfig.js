module.exports = {
    "type": process.env.ORM_CONNECTION,
    "host": process.env.ORM_HOST,
    "port": process.env.ORM_PORT,
    "username": process.env.ORM_USERNAME,
    "password": process.env.ORM_PASSWORD,
    "database": process.env.ORM_DATABASE,
    "synchronize": true,
    "logging": false,
    "entities": [
        process.env.BUILD_DIR + "/entity/**/*.{ts,js}"
    ],
    "migrations": [
        process.env.BUILD_DIR + "/migration/**/*.{ts,js}"
    ],
    "subscribers": [
        process.env.BUILD_DIR + "/subscriber/**/*.{ts,js}"
    ],
    "cli": {
        "entitiesDir": process.env.BUILD_DIR + "/entity",
        "migrationsDir": process.env.BUILD_DIR + "/migration",
        "subscribersDir": process.env.BUILD_DIR +"/subscriber"
    }
}