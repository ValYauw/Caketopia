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
                roles: "vendor",
            },
            {
                name: "Quentin Wilshaw",
                email: "qwilshaw1@fotki.com",
                password: "admin",
                roles: "vendor",
            },
            {
                name: "Benjamen Dellar",
                email: "bdellar2@whitehouse.gov",
                password: "admin",
                roles: "vendor",
            },
            {
                name: "Kelley Gouldbourn",
                email: "kgouldbourn3@economist.com",
                password: "admin",
                roles: "vendor",
            },
            {
                name: "Clem Gayne",
                email: "cgayne4@google.nl",
                password: "admin",
                roles: "vendor",
            },
            {
                name: "Farris Hryniewicki",
                email: "fhryniewicki5@youtube.com",
                password: "admin",
                roles: "user",
            },
            {
                name: "Kizzie Gregoli",
                email: "kgregoli6@yahoo.com",
                password: "admin",
                roles: "user",
            },
            {
                name: "Winne Blades",
                email: "wblades7@typepad.com",
                password: "admin",
                roles: "user",
            },
            {
                name: "Haley Walby",
                email: "hwalby8@is.gd",
                password: "admin",
                roles: "user",
            },
            {
                name: "Valentina Wicher",
                email: "vwicher9@ezinearticles.com",
                password: "admin",
                roles: "user",
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

        return queryInterface.bulkDelete("Users", data, {});
    },
};
