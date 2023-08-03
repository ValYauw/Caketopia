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
                title: "Cake 1",
                description: "desc 1",
                imageUrl: "http://dummyimage.com/213x100.png/dddddd/000000",
                offeredPrice: 57495,
                VendorId: 1,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 2",
                description: "desc 2",
                imageUrl: "http://dummyimage.com/228x100.png/dddddd/000000",
                offeredPrice: 85026,
                VendorId: 1,
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 3",
                description: "desc 3",
                imageUrl: "http://dummyimage.com/113x100.png/ff4444/ffffff",
                offeredPrice: 73886,
                VendorId: 2,
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 4",
                description: "desc 4",
                imageUrl: "http://dummyimage.com/141x100.png/dddddd/000000",
                offeredPrice: 78059,
                VendorId: 2,
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 5",
                description: "desc 5",
                imageUrl: "http://dummyimage.com/137x100.png/5fa2dd/ffffff",
                offeredPrice: 72946,
                VendorId: 3,
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 6",
                description: "desc 6",
                imageUrl: "http://dummyimage.com/107x100.png/dddddd/000000",
                offeredPrice: 73693,
                VendorId: 3,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 7",
                description: "desc 7",
                imageUrl: "http://dummyimage.com/211x100.png/5fa2dd/ffffff",
                offeredPrice: 97900,
                VendorId: 4,
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 8",
                description: "desc 8",
                imageUrl: "http://dummyimage.com/145x100.png/cc0000/ffffff",
                offeredPrice: 79312,
                VendorId: 4,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 9",
                description: "desc 9",
                imageUrl: "http://dummyimage.com/186x100.png/5fa2dd/ffffff",
                offeredPrice: 88277,
                VendorId: 5,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Cake 10",
                description: "desc 10",
                imageUrl: "http://dummyimage.com/184x100.png/5fa2dd/ffffff",
                offeredPrice: 82924,
                VendorId: 5,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        return queryInterface.bulkInsert("Services", data, {});
    },

    down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete("Services", null, {});
    },
};
