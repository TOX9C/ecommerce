import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to generate placeholder images
const getPlaceholderImages = (category: string, productName: string) => {
    const colors = ['4A90E2', '50C878', 'FF6B6B', 'FFD93D', '9D84B7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return [
        `https://via.placeholder.com/600x600/${randomColor}/FFFFFF?text=${encodeURIComponent(productName)}`,
        `https://via.placeholder.com/600x600/${randomColor}/FFFFFF?text=${encodeURIComponent(productName + ' Side')}`,
        `https://via.placeholder.com/600x600/${randomColor}/FFFFFF?text=${encodeURIComponent(productName + ' Back')}`
    ];
};

async function main() {
    console.log("Starting seed...");

    // Clear existing data
    console.log("Clearing existing data...");
    await prisma.orderItem.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});

    const products = [
        // Laptops (15 items)
        {
            name: "MacBook Pro 14\" M3 Pro",
            category: "Laptops",
            description: "Supercharged by M3 Pro chip. Stunning Liquid Retina XDR display, up to 22 hours of battery life.",
            price: 1999,
            imgUrl: getPlaceholderImages("Laptops", "MacBook Pro 14"),
        },
        {
            name: "MacBook Air 13\" M2",
            category: "Laptops",
            description: "Remarkably thin and light. M2 chip, all-day battery life.",
            price: 1199,
            imgUrl: getPlaceholderImages("Laptops", "MacBook Air 13"),
        },
        {
            name: "Dell XPS 15",
            category: "Laptops",
            description: "15.6-inch InfinityEdge display, Intel i7, 16GB RAM, 512GB SSD.",
            price: 1499,
            imgUrl: getPlaceholderImages("Laptops", "Dell XPS 15"),
        },
        {
            name: "Dell XPS 13",
            category: "Laptops",
            description: "Ultra-portable 13-inch laptop with stunning display.",
            price: 1299,
            imgUrl: getPlaceholderImages("Laptops", "Dell XPS 13"),
        },
        {
            name: "Lenovo ThinkPad X1 Carbon",
            category: "Laptops",
            description: "Business laptop with military-grade durability, 14-inch display.",
            price: 1399,
            imgUrl: getPlaceholderImages("Laptops", "ThinkPad X1"),
        },
        {
            name: "HP Spectre x360",
            category: "Laptops",
            description: "Premium 2-in-1 convertible laptop with stunning design.",
            price: 1449,
            imgUrl: getPlaceholderImages("Laptops", "HP Spectre x360"),
        },
        {
            name: "ASUS ROG Zephyrus G14",
            category: "Laptops",
            description: "Gaming laptop with AMD Ryzen 9, RTX 4060, portable design.",
            price: 1599,
            imgUrl: getPlaceholderImages("Laptops", "ROG Zephyrus"),
        },
        {
            name: "MSI GE76 Raider",
            category: "Laptops",
            description: "High-performance gaming laptop with RTX 4070.",
            price: 2199,
            imgUrl: getPlaceholderImages("Laptops", "MSI GE76"),
        },
        {
            name: "Razer Blade 15",
            category: "Laptops",
            description: "Premium gaming laptop, sleek aluminum design.",
            price: 2399,
            imgUrl: getPlaceholderImages("Laptops", "Razer Blade 15"),
        },
        {
            name: "Microsoft Surface Laptop 5",
            category: "Laptops",
            description: "Elegant design, touchscreen, perfect for productivity.",
            price: 999,
            imgUrl: getPlaceholderImages("Laptops", "Surface Laptop 5"),
        },
        {
            name: "Acer Swift 3",
            category: "Laptops",
            description: "Affordable ultrabook with great performance.",
            price: 649,
            imgUrl: getPlaceholderImages("Laptops", "Acer Swift 3"),
        },
        {
            name: "LG Gram 17",
            category: "Laptops",
            description: "Ultra-lightweight 17-inch laptop, less than 3lbs.",
            price: 1699,
            imgUrl: getPlaceholderImages("Laptops", "LG Gram 17"),
        },
        {
            name: "Alienware m15 R7",
            category: "Laptops",
            description: "Powerful gaming laptop with advanced cooling.",
            price: 1899,
            imgUrl: getPlaceholderImages("Laptops", "Alienware m15"),
        },
        {
            name: "ASUS ZenBook 14",
            category: "Laptops",
            description: "Compact and powerful with OLED display.",
            price: 899,
            imgUrl: getPlaceholderImages("Laptops", "ZenBook 14"),
        },
        {
            name: "HP Pavilion 15",
            category: "Laptops",
            description: "Reliable everyday laptop for work and entertainment.",
            price: 699,
            imgUrl: getPlaceholderImages("Laptops", "HP Pavilion 15"),
        },

        // Phones (12 items)
        {
            name: "iPhone 15 Pro Max",
            category: "Phones",
            description: "Titanium design, A17 Pro chip, advanced camera system.",
            price: 1199,
            imgUrl: getPlaceholderImages("Phones", "iPhone 15 Pro Max"),
        },
        {
            name: "iPhone 15",
            category: "Phones",
            description: "Dynamic Island, 48MP camera, all-day battery.",
            price: 799,
            imgUrl: getPlaceholderImages("Phones", "iPhone 15"),
        },
        {
            name: "Samsung Galaxy S24 Ultra",
            category: "Phones",
            description: "Galaxy AI, 200MP camera, S Pen included.",
            price: 1199,
            imgUrl: getPlaceholderImages("Phones", "Galaxy S24 Ultra"),
        },
        {
            name: "Samsung Galaxy S24",
            category: "Phones",
            description: "Premium flagship with AI features.",
            price: 799,
            imgUrl: getPlaceholderImages("Phones", "Galaxy S24"),
        },
        {
            name: "Google Pixel 8 Pro",
            category: "Phones",
            description: "Best of Google AI, amazing camera.",
            price: 999,
            imgUrl: getPlaceholderImages("Phones", "Pixel 8 Pro"),
        },
        {
            name: "Google Pixel 8",
            category: "Phones",
            description: "Pure Android experience with great camera.",
            price: 699,
            imgUrl: getPlaceholderImages("Phones", "Pixel 8"),
        },
        {
            name: "OnePlus 12",
            category: "Phones",
            description: "Fast charging, Snapdragon 8 Gen 3, great value.",
            price: 799,
            imgUrl: getPlaceholderImages("Phones", "OnePlus 12"),
        },
        {
            name: "Xiaomi 14 Pro",
            category: "Phones",
            description: "Flagship specs at competitive price.",
            price: 899,
            imgUrl: getPlaceholderImages("Phones", "Xiaomi 14 Pro"),
        },
        {
            name: "Sony Xperia 1 V",
            category: "Phones",
            description: "Pro camera features, 4K OLED display.",
            price: 1399,
            imgUrl: getPlaceholderImages("Phones", "Xperia 1 V"),
        },
        {
            name: "Motorola Edge 40 Pro",
            category: "Phones",
            description: "Curved display, fast performance.",
            price: 599,
            imgUrl: getPlaceholderImages("Phones", "Motorola Edge"),
        },
        {
            name: "Nothing Phone (2)",
            category: "Phones",
            description: "Unique Glyph interface, clean Android.",
            price: 699,
            imgUrl: getPlaceholderImages("Phones", "Nothing Phone 2"),
        },
        {
            name: "ASUS ROG Phone 7",
            category: "Phones",
            description: "Gaming phone with advanced cooling.",
            price: 999,
            imgUrl: getPlaceholderImages("Phones", "ROG Phone 7"),
        },

        // Shoes (15 items)
        {
            name: "Nike Air Max 270",
            category: "Shoes",
            description: "Big comfort and visible Air. Lifestyle sneaker.",
            price: 150,
            imgUrl: getPlaceholderImages("Shoes", "Air Max 270"),
        },
        {
            name: "Nike Air Force 1",
            category: "Shoes",
            description: "Classic basketball sneaker, iconic style.",
            price: 110,
            imgUrl: getPlaceholderImages("Shoes", "Air Force 1"),
        },
        {
            name: "Nike Dunk Low",
            category: "Shoes",
            description: "Retro basketball style for everyday wear.",
            price: 120,
            imgUrl: getPlaceholderImages("Shoes", "Nike Dunk Low"),
        },
        {
            name: "Adidas Ultraboost 23",
            category: "Shoes",
            description: "Premium running shoe with Boost cushioning.",
            price: 190,
            imgUrl: getPlaceholderImages("Shoes", "Ultraboost 23"),
        },
        {
            name: "Adidas Samba",
            category: "Shoes",
            description: "Classic soccer-inspired lifestyle sneaker.",
            price: 100,
            imgUrl: getPlaceholderImages("Shoes", "Adidas Samba"),
        },
        {
            name: "New Balance 550",
            category: "Shoes",
            description: "Retro basketball silhouette, versatile style.",
            price: 130,
            imgUrl: getPlaceholderImages("Shoes", "NB 550"),
        },
        {
            name: "New Balance 990v6",
            category: "Shoes",
            description: "Made in USA, premium comfort and quality.",
            price: 185,
            imgUrl: getPlaceholderImages("Shoes", "NB 990v6"),
        },
        {
            name: "Converse Chuck Taylor All Star",
            category: "Shoes",
            description: "Timeless canvas sneaker, iconic design.",
            price: 65,
            imgUrl: getPlaceholderImages("Shoes", "Chuck Taylor"),
        },
        {
            name: "Vans Old Skool",
            category: "Shoes",
            description: "Classic skate shoe with side stripe.",
            price: 70,
            imgUrl: getPlaceholderImages("Shoes", "Vans Old Skool"),
        },
        {
            name: "Jordan 1 Retro High",
            category: "Shoes",
            description: "Legendary basketball sneaker, premium leather.",
            price: 170,
            imgUrl: getPlaceholderImages("Shoes", "Jordan 1"),
        },
        {
            name: "ASICS Gel-Kayano 30",
            category: "Shoes",
            description: "Stability running shoe for long distances.",
            price: 160,
            imgUrl: getPlaceholderImages("Shoes", "Gel-Kayano 30"),
        },
        {
            name: "On Cloud 5",
            category: "Shoes",
            description: "Swiss-engineered running shoe, CloudTec cushioning.",
            price: 140,
            imgUrl: getPlaceholderImages("Shoes", "On Cloud 5"),
        },
        {
            name: "Hoka Clifton 9",
            category: "Shoes",
            description: "Maximum cushioning for runners.",
            price: 145,
            imgUrl: getPlaceholderImages("Shoes", "Hoka Clifton 9"),
        },
        {
            name: "Puma Suede Classic",
            category: "Shoes",
            description: "Iconic suede sneaker since 1968.",
            price: 75,
            imgUrl: getPlaceholderImages("Shoes", "Puma Suede"),
        },
        {
            name: "Reebok Club C 85",
            category: "Shoes",
            description: "Minimalist tennis-inspired sneaker.",
            price: 80,
            imgUrl: getPlaceholderImages("Shoes", "Club C 85"),
        },

        // Clothing (12 items)
        {
            name: "Levi's 501 Original Jeans",
            category: "Clothing",
            description: "The original blue jean since 1873.",
            price: 89,
            imgUrl: getPlaceholderImages("Clothing", "Levi's 501"),
        },
        {
            name: "Patagonia Better Sweater",
            category: "Clothing",
            description: "Warm fleece jacket, recycled materials.",
            price: 139,
            imgUrl: getPlaceholderImages("Clothing", "Better Sweater"),
        },
        {
            name: "The North Face Nuptse Jacket",
            category: "Clothing",
            description: "Iconic puffer jacket with 700-fill down.",
            price: 299,
            imgUrl: getPlaceholderImages("Clothing", "Nuptse Jacket"),
        },
        {
            name: "Carhartt WIP Detroit Jacket",
            category: "Clothing",
            description: "Durable workwear-inspired jacket.",
            price: 169,
            imgUrl: getPlaceholderImages("Clothing", "Carhartt Detroit"),
        },
        {
            name: "Champion Reverse Weave Hoodie",
            category: "Clothing",
            description: "Classic heavyweight hoodie.",
            price: 70,
            imgUrl: getPlaceholderImages("Clothing", "Champion Hoodie"),
        },
        {
            name: "Uniqlo Heattech Shirt",
            category: "Clothing",
            description: "Thermal base layer for cold weather.",
            price: 29,
            imgUrl: getPlaceholderImages("Clothing", "Heattech"),
        },
        {
            name: "Ralph Lauren Polo Shirt",
            category: "Clothing",
            description: "Classic polo with embroidered pony.",
            price: 89,
            imgUrl: getPlaceholderImages("Clothing", "Polo Shirt"),
        },
        {
            name: "Lululemon ABC Pants",
            category: "Clothing",
            description: "Anti-Ball Crushing pants for comfort.",
            price: 128,
            imgUrl: getPlaceholderImages("Clothing", "ABC Pants"),
        },
        {
            name: "Arc'teryx Beta LT Jacket",
            category: "Clothing",
            description: "Premium Gore-Tex shell jacket.",
            price: 450,
            imgUrl: getPlaceholderImages("Clothing", "Beta LT"),
        },
        {
            name: "Nike Tech Fleece Joggers",
            category: "Clothing",
            description: "Modern athletic pants with thermal comfort.",
            price: 110,
            imgUrl: getPlaceholderImages("Clothing", "Tech Fleece"),
        },
        {
            name: "Adidas Adicolor Classics Tracksuit",
            category: "Clothing",
            description: "Iconic 3-stripe tracksuit.",
            price: 120,
            imgUrl: getPlaceholderImages("Clothing", "Adidas Tracksuit"),
        },
        {
            name: "Supreme Box Logo Tee",
            category: "Clothing",
            description: "Iconic streetwear t-shirt.",
            price: 54,
            imgUrl: getPlaceholderImages("Clothing", "Supreme Tee"),
        },

        // Books (10 items)
        {
            name: "Atomic Habits by James Clear",
            category: "Books",
            description: "Proven way to build good habits and break bad ones.",
            price: 20,
            imgUrl: getPlaceholderImages("Books", "Atomic Habits"),
        },
        {
            name: "The Midnight Library",
            category: "Books",
            description: "By Matt Haig. Choices that make a life well lived.",
            price: 16,
            imgUrl: getPlaceholderImages("Books", "Midnight Library"),
        },
        {
            name: "Project Hail Mary",
            category: "Books",
            description: "By Andy Weir. Thrilling space adventure.",
            price: 18,
            imgUrl: getPlaceholderImages("Books", "Project Hail Mary"),
        },
        {
            name: "Sapiens",
            category: "Books",
            description: "By Yuval Noah Harari. Brief history of humankind.",
            price: 22,
            imgUrl: getPlaceholderImages("Books", "Sapiens"),
        },
        {
            name: "Educated",
            category: "Books",
            description: "By Tara Westover. Powerful memoir.",
            price: 17,
            imgUrl: getPlaceholderImages("Books", "Educated"),
        },
        {
            name: "The Psychology of Money",
            category: "Books",
            description: "By Morgan Housel. Timeless lessons on wealth.",
            price: 18,
            imgUrl: getPlaceholderImages("Books", "Psychology Money"),
        },
        {
            name: "Can't Hurt Me",
            category: "Books",
            description: "By David Goggins. Master your mind.",
            price: 19,
            imgUrl: getPlaceholderImages("Books", "Cant Hurt Me"),
        },
        {
            name: "The Subtle Art of Not Giving a F*ck",
            category: "Books",
            description: "By Mark Manson. Counterintuitive approach to living.",
            price: 16,
            imgUrl: getPlaceholderImages("Books", "Subtle Art"),
        },
        {
            name: "Shoe Dog",
            category: "Books",
            description: "By Phil Knight. Memoir of Nike's creator.",
            price: 20,
            imgUrl: getPlaceholderImages("Books", "Shoe Dog"),
        },
        {
            name: "The 48 Laws of Power",
            category: "Books",
            description: "By Robert Greene. Timeless wisdom on power.",
            price: 25,
            imgUrl: getPlaceholderImages("Books", "48 Laws"),
        },

        // Gaming (8 items)
        {
            name: "PlayStation 5",
            category: "Gaming",
            description: "Lightning-fast loading, stunning graphics.",
            price: 499,
            imgUrl: getPlaceholderImages("Gaming", "PS5"),
        },
        {
            name: "Xbox Series X",
            category: "Gaming",
            description: "Most powerful Xbox ever, 4K gaming.",
            price: 499,
            imgUrl: getPlaceholderImages("Gaming", "Xbox Series X"),
        },
        {
            name: "Nintendo Switch OLED",
            category: "Gaming",
            description: "7-inch OLED screen, portable gaming.",
            price: 349,
            imgUrl: getPlaceholderImages("Gaming", "Switch OLED"),
        },
        {
            name: "Steam Deck",
            category: "Gaming",
            description: "Handheld PC gaming, play your Steam library.",
            price: 399,
            imgUrl: getPlaceholderImages("Gaming", "Steam Deck"),
        },
        {
            name: "Meta Quest 3",
            category: "Gaming",
            description: "Advanced VR headset, mixed reality.",
            price: 499,
            imgUrl: getPlaceholderImages("Gaming", "Quest 3"),
        },
        {
            name: "PlayStation VR2",
            category: "Gaming",
            description: "Next-gen VR for PS5.",
            price: 549,
            imgUrl: getPlaceholderImages("Gaming", "PSVR2"),
        },
        {
            name: "Logitech G Pro X Superlight",
            category: "Gaming",
            description: "Professional wireless gaming mouse.",
            price: 159,
            imgUrl: getPlaceholderImages("Gaming", "G Pro X"),
        },
        {
            name: "SteelSeries Arctis Nova Pro",
            category: "Gaming",
            description: "Premium gaming headset with ESS DAC.",
            price: 349,
            imgUrl: getPlaceholderImages("Gaming", "Arctis Nova"),
        },

        // Tablets (6 items)
        {
            name: "iPad Pro 12.9\"",
            category: "Tablets",
            description: "M2 chip, Liquid Retina XDR display.",
            price: 1099,
            imgUrl: getPlaceholderImages("Tablets", "iPad Pro 12.9"),
        },
        {
            name: "iPad Air",
            category: "Tablets",
            description: "M1 chip, 10.9-inch display.",
            price: 599,
            imgUrl: getPlaceholderImages("Tablets", "iPad Air"),
        },
        {
            name: "Samsung Galaxy Tab S9+",
            category: "Tablets",
            description: "12.4-inch AMOLED, S Pen included.",
            price: 999,
            imgUrl: getPlaceholderImages("Tablets", "Tab S9+"),
        },
        {
            name: "Microsoft Surface Pro 9",
            category: "Tablets",
            description: "2-in-1 tablet and laptop.",
            price: 999,
            imgUrl: getPlaceholderImages("Tablets", "Surface Pro 9"),
        },
        {
            name: "Amazon Fire HD 10",
            category: "Tablets",
            description: "Affordable 10-inch tablet.",
            price: 149,
            imgUrl: getPlaceholderImages("Tablets", "Fire HD 10"),
        },
        {
            name: "Lenovo Tab P11 Pro",
            category: "Tablets",
            description: "11.5-inch OLED display, entertainment tablet.",
            price: 499,
            imgUrl: getPlaceholderImages("Tablets", "Tab P11 Pro"),
        },

        // Cameras (6 items)
        {
            name: "Sony A7 IV",
            category: "Cameras",
            description: "33MP full-frame, 4K 60fps video.",
            price: 2499,
            imgUrl: getPlaceholderImages("Cameras", "Sony A7 IV"),
        },
        {
            name: "Canon EOS R6 Mark II",
            category: "Cameras",
            description: "24.2MP, 40fps continuous shooting.",
            price: 2499,
            imgUrl: getPlaceholderImages("Cameras", "Canon R6 II"),
        },
        {
            name: "Nikon Z8",
            category: "Cameras",
            description: "45.7MP stacked sensor, 8K video.",
            price: 3999,
            imgUrl: getPlaceholderImages("Cameras", "Nikon Z8"),
        },
        {
            name: "Fujifilm X-T5",
            category: "Cameras",
            description: "40MP APS-C, classic design.",
            price: 1699,
            imgUrl: getPlaceholderImages("Cameras", "Fuji X-T5"),
        },
        {
            name: "GoPro HERO12 Black",
            category: "Cameras",
            description: "5.3K video, HyperSmooth 6.0.",
            price: 399,
            imgUrl: getPlaceholderImages("Cameras", "GoPro HERO12"),
        },
        {
            name: "DJI Osmo Action 4",
            category: "Cameras",
            description: "4K 120fps, magnetic mounting.",
            price: 399,
            imgUrl: getPlaceholderImages("Cameras", "Osmo Action 4"),
        },

        // Watches (6 items)
        {
            name: "Apple Watch Ultra 2",
            category: "Watches",
            description: "Titanium case, precision GPS.",
            price: 799,
            imgUrl: getPlaceholderImages("Watches", "Watch Ultra 2"),
        },
        {
            name: "Apple Watch Series 9",
            category: "Watches",
            description: "Advanced health features, always-on display.",
            price: 399,
            imgUrl: getPlaceholderImages("Watches", "Watch S9"),
        },
        {
            name: "Samsung Galaxy Watch6",
            category: "Watches",
            description: "Comprehensive health tracking.",
            price: 299,
            imgUrl: getPlaceholderImages("Watches", "Galaxy Watch6"),
        },
        {
            name: "Garmin Fenix 7X",
            category: "Watches",
            description: "Multisport GPS with solar charging.",
            price: 899,
            imgUrl: getPlaceholderImages("Watches", "Fenix 7X"),
        },
        {
            name: "Fitbit Sense 2",
            category: "Watches",
            description: "Advanced health and fitness smartwatch.",
            price: 299,
            imgUrl: getPlaceholderImages("Watches", "Sense 2"),
        },
        {
            name: "Casio G-Shock GA-2100",
            category: "Watches",
            description: "Iconic tough watch, carbon core guard.",
            price: 110,
            imgUrl: getPlaceholderImages("Watches", "G-Shock"),
        },

        // Audio (6 items)
        {
            name: "Sony WH-1000XM5",
            category: "Audio",
            description: "Industry-leading noise cancellation.",
            price: 399,
            imgUrl: getPlaceholderImages("Audio", "WH-1000XM5"),
        },
        {
            name: "AirPods Pro 2nd Gen",
            category: "Audio",
            description: "Active noise cancellation, spatial audio.",
            price: 249,
            imgUrl: getPlaceholderImages("Audio", "AirPods Pro"),
        },
        {
            name: "Bose QuietComfort Ultra",
            category: "Audio",
            description: "Premium noise cancelling headphones.",
            price: 429,
            imgUrl: getPlaceholderImages("Audio", "QC Ultra"),
        },
        {
            name: "Sennheiser Momentum 4",
            category: "Audio",
            description: "Audiophile sound, 60-hour battery.",
            price: 379,
            imgUrl: getPlaceholderImages("Audio", "Momentum 4"),
        },
        {
            name: "JBL Flip 6",
            category: "Audio",
            description: "Portable Bluetooth speaker, waterproof.",
            price: 129,
            imgUrl: getPlaceholderImages("Audio", "JBL Flip 6"),
        },
        {
            name: "Sonos One",
            category: "Audio",
            description: "Smart speaker with Alexa and AirPlay 2.",
            price: 219,
            imgUrl: getPlaceholderImages("Audio", "Sonos One"),
        },

        // Home & Kitchen (4 items)
        {
            name: "Instant Pot Duo 7-in-1",
            category: "Home & Kitchen",
            description: "Pressure cooker, slow cooker, rice cooker.",
            price: 99,
            imgUrl: getPlaceholderImages("Home", "Instant Pot"),
        },
        {
            name: "KitchenAid Stand Mixer",
            category: "Home & Kitchen",
            description: "5-quart mixer with 10 speeds.",
            price: 449,
            imgUrl: getPlaceholderImages("Home", "KitchenAid"),
        },
        {
            name: "Ninja Professional Blender",
            category: "Home & Kitchen",
            description: "1000-watt motor, 72oz pitcher.",
            price: 89,
            imgUrl: getPlaceholderImages("Home", "Ninja Blender"),
        },
        {
            name: "Dyson V15 Detect",
            category: "Home & Kitchen",
            description: "Cordless vacuum with laser detection.",
            price: 749,
            imgUrl: getPlaceholderImages("Home", "Dyson V15"),
        },
    ];

    console.log(`Creating ${products.length} products...`);

    let count = 0;
    for (const product of products) {
        // Create Product
        const createdProduct = await prisma.product.create({
            data: {
                name: product.name,
                category: product.category,
                description: product.description,
                price: product.price,
                imgUrl: product.imgUrl,
            },
        });

        // Create ProductImage entries for ALL images
        for (const imageUrl of product.imgUrl) {
            await prisma.productImage.create({
                data: {
                    url: imageUrl,
                    productId: createdProduct.id,
                },
            });
        }

        count++;
        if (count % 10 === 0) {
            console.log(`✓ Created ${count}/${products.length} products...`);
        }
    }

    console.log(`\n✅ Successfully seeded ${products.length} products!`);
    console.log(`\nCategory breakdown:`);
    const categoryCount: Record<string, number> = {};
    products.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    Object.entries(categoryCount).forEach(([cat, count]) => {
        console.log(`  ${cat}: ${count} items`);
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
