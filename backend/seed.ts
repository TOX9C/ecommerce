
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting seed...");

    // Clear existing products if needed (Optional: comment out if you want to keep them)
    // await prisma.orderItem.deleteMany({});
    // await prisma.cartItem.deleteMany({});
    // await prisma.productImage.deleteMany({});
    // await prisma.product.deleteMany({});

    const products = [
        {
            name: "MacBook Pro 14",
            category: "Laptop",
            description: "Supercharged by M3 Pro and M3 Max.",
            price: 1999,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290"],
        },
        {
            name: "iPhone 15 Pro",
            category: "Phone",
            description: "Titanium. So strong. So light. So Pro.",
            price: 999,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846363028"],
        },
        {
            name: "iPad Air",
            category: "Tablet",
            description: "Light. Bright. Full of might.",
            price: 599,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202211-space-gray-wifi?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1670875960621"],
        },
        {
            name: "AirPods Pro (2nd Gen)",
            category: "Audio",
            description: "Adaptive Audio. Now playing.",
            price: 249,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985"],
        },
        {
            name: "Apple Watch Ultra 2",
            category: "Watch",
            description: "Next level adventure.",
            price: 799,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-alp-loop-blue-select-202309-ocean?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1693245037168"],
        },
        {
            name: "Studio Display",
            category: "Monitor",
            description: "A sight to be bold.",
            price: 1599,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/studio-display-standard-glass-stand-202203?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1645139958744"],
        },
        {
            name: "Magic Keyboard",
            category: "Accessories",
            description: "Typing experience. Like no other.",
            price: 299,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK2A3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1628010471000"],
        },
        {
            name: "HomePod mini",
            category: "Home",
            description: "Room-filling sound.",
            price: 99,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-mini-select-spacegray-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632925511000"],
        },
        {
            name: "Mac mini",
            category: "Desktop",
            description: "More muscle. More hustle.",
            price: 599,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-202301-gallery-3?wid=2000&hei=1536&fmt=jpeg&qlt=90&.v=1670630799440"],
        },
        {
            name: "Apple TV 4K",
            category: "TV",
            description: "The Apple experience. Cinematic in every sense.",
            price: 129,
            imgUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202210?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664896361164"],
        },
    ];

    for (const product of products) {
        // Create Product
        const createdProduct = await prisma.product.create({
            data: {
                name: product.name,
                category: product.category,
                description: product.description,
                price: product.price,
                imgUrl: product.imgUrl, // Using string array as per schema
            },
        });

        // Also create ProductImage for frontend compatibility if needed
        if (product.imgUrl.length > 0) {
            await prisma.productImage.create({
                data: {
                    url: product.imgUrl[0],
                    productId: createdProduct.id,
                },
            });
        }
    }

    console.log(`Seeded ${products.length} products.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
