"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        const data = [
            {
                name: "Leandra McCarly",
                email: "lmccarly0@reverbnation.com",
                password: "admin",
                roles: "Vendor",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Quentin Wilshaw",
                email: "qwilshaw1@fotki.com",
                password: "admin",
                roles: "Vendor",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Benjamen Dellar",
                email: "bdellar2@whitehouse.gov",
                password: "admin",
                roles: "Vendor",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Kelley Gouldbourn",
                email: "kgouldbourn3@economist.com",
                password: "admin",
                roles: "Vendor",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Clem Gayne",
                email: "cgayne4@google.nl",
                password: "admin",
                roles: "Vendor",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Farris Hryniewicki",
                email: "fhryniewicki5@youtube.com",
                password: "admin",
                roles: "Customer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Kizzie Gregoli",
                email: "kgregoli6@yahoo.com",
                password: "admin",
                roles: "Customer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Winne Blades",
                email: "wblades7@typepad.com",
                password: "admin",
                roles: "Customer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Haley Walby",
                email: "hwalby8@is.gd",
                password: "admin",
                roles: "Customer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Valentina Wicher",
                email: "vwicher9@ezinearticles.com",
                password: "admin",
                roles: "Customer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        return queryInterface.bulkInsert("Users", data, {});
    },

    down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        return queryInterface.bulkDelete("Users", null, {});
    },
};
