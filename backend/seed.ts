import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting seed...");

    // Clear existing data
    console.log("Clearing existing data...");
    await prisma.orderItem.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});

    const products = [
        // Electronics - Laptops
        {
            name: "MacBook Pro 14\" M3",
            category: "Laptops",
            description: "Supercharged by M3 Pro and M3 Max. Stunning Liquid Retina XDR display, up to 22 hours of battery life.",
            price: 1999,
            imgUrl: [
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-gallery1-202310?wid=640&hei=528&fmt=p-jpg&qlt=95&.v=1697311054290",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-gallery2-202310?wid=640&hei=528&fmt=p-jpg&qlt=95&.v=1697311054290"
            ],
        },
        {
            name: "Dell XPS 15",
            category: "Laptops",
            description: "15.6-inch InfinityEdge display, Intel i7 processor, 16GB RAM, 512GB SSD. Perfect for creators.",
            price: 1499,
            imgUrl: [
                "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/notebook-xps-9530-nt-blue-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1286&qlt=100,1&resMode=sharp2&size=1286,804&chrss=full",
                "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/notebook-xps-9530-nt-blue-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1286&qlt=100,1&resMode=sharp2&size=1286,804&chrss=full",
                "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/notebook-xps-9530-nt-blue-gallery-5.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1286&qlt=100,1&resMode=sharp2&size=1286,804&chrss=full"
            ],
        },
        {
            name: "Lenovo ThinkPad X1 Carbon",
            category: "Laptops",
            description: "Business laptop with military-grade durability, 14-inch display, Intel i7, 16GB RAM.",
            price: 1299,
            imgUrl: [
                "https://p3-ofp.static.pub/fes/cms/2023/08/23/z88jvhsw06q2jd7yfe7r9z0f8e5a6v283048.png",
                "https://p1-ofp.static.pub/fes/cms/2023/08/23/tg3iw86mjs9vvtqxd8aqp51r29vhd8806770.png",
                "https://p2-ofp.static.pub/fes/cms/2023/08/23/xprnidqhk87v5w3vf5d4lc5qvx1cxl178653.png"
            ],
        },

        // Electronics - Phones
        {
            name: "iPhone 15 Pro",
            category: "Phones",
            description: "Titanium. So strong. So light. So Pro. A17 Pro chip, advanced camera system.",
            price: 999,
            imgUrl: [
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846363028",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium_AV1?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846363028",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium_AV2?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846363028"
            ],
        },
        {
            name: "Samsung Galaxy S24 Ultra",
            category: "Phones",
            description: "Galaxy AI is here. 200MP camera, S Pen, stunning 6.8\" display with 120Hz refresh rate.",
            price: 1199,
            imgUrl: [
                "https://images.samsung.com/is/image/samsung/p6pim/uk/2401/gallery/uk-galaxy-s24-s928-sm-s928bztgeub-thumb-539573272?$344_344_PNG$",
                "https://images.samsung.com/is/image/samsung/p6pim/uk/2401/gallery/uk-galaxy-s24-s928-sm-s928bztgeub-thumb-539573273?$344_344_PNG$",
                "https://images.samsung.com/is/image/samsung/p6pim/uk/2401/gallery/uk-galaxy-s24-s928-sm-s928bztgeub-thumb-539573274?$344_344_PNG$"
            ],
        },
        {
            name: "Google Pixel 8 Pro",
            category: "Phones",
            description: "Best of Google AI. Amazing camera with Magic Eraser, 6.7\" OLED display.",
            price: 899,
            imgUrl: [
                "https://lh3.googleusercontent.com/wSqjPXzPbwo7HNhOYvFgnW28WM1t4W6vVb_U_p-xPY71KzRAjLO0rfQVwEH0sRVIpFnpI2lQGFMDV3zLdM4hn6U0N_3m9q-tSA=rw-e365-w1200",
                "https://lh3.googleusercontent.com/6G5TN8_7C3PKr15S4JN1Y9W7SfVQVCjLGwDt-3qaSVqv7qjRLh7PRPzQFKq-HHXlEo7Rh9D4KhXWu0E0-hpj1FzVNUgBrQ=rw-e365-w1200",
                "https://lh3.googleusercontent.com/L5zRcj6Dw1MjQTWbWW5CJEtZW3g2L0vZfWDrC6X8cF2_L3ZFxE9qivNQ1_Nc3FyhDN5nFCT5LpKb9ZXWE2KBYV2JwJBu=rw-e365-w1200"
            ],
        },

        // Clothing - Men
        {
            name: "Levi's 501 Original Fit Jeans",
            category: "Clothing",
            description: "The original blue jean since 1873. Classic straight fit, button fly, iconic style.",
            price: 89,
            imgUrl: [
                "https://lsco.scene7.com/is/image/lsco/005010101-front-pdp?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840",
                "https://lsco.scene7.com/is/image/lsco/005010101-back-pdp?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840",
                "https://lsco.scene7.com/is/image/lsco/005010101-alt1-pdp?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840"
            ],
        },
        {
            name: "Nike Air Max 270",
            category: "Clothing",
            description: "Inspired by two icons, the Air Max 270 delivers big comfort and visible Air.",
            price: 150,
            imgUrl: [
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/air-max-270-mens-shoes-KkLcGR.png",
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-8eb8e12e-5d0e-4d6e-b9cd-7f0e97f5c9f5/air-max-270-mens-shoes-KkLcGR.png",
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-0e7d7c7a-8f1a-4d1b-8e7f-7f0e97f5c9f5/air-max-270-mens-shoes-KkLcGR.png"
            ],
        },
        {
            name: "Patagonia Better Sweater Jacket",
            category: "Clothing",
            description: "Warm fleece jacket made with recycled polyester. Perfect for outdoor adventures.",
            price: 139,
            imgUrl: [
                "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f3c8a9d/images/hi-res/25528_NENA.jpg?sw=1400&sh=1400&sfrm=png",
                "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8c3e9a1a/images/hi-res/25528_NENA_VZ1.jpg?sw=1400&sh=1400&sfrm=png",
                "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7c2d8b9c/images/hi-res/25528_NENA_VZ2.jpg?sw=1400&sh=1400&sfrm=png"
            ],
        },

        // Clothing - Women
        {
            name: "Lululemon Align Leggings",
            category: "Clothing",
            description: "Buttery-soft Nulu™ fabric, high-rise fit. Perfect for yoga and everyday wear.",
            price: 98,
            imgUrl: [
                "https://images.lululemon.com/is/image/lululemon/LW5CXTS_0001_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
                "https://images.lululemon.com/is/image/lululemon/LW5CXTS_0001_2?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
                "https://images.lululemon.com/is/image/lululemon/LW5CXTS_0001_3?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
            ],
        },
        {
            name: "Zara Oversized Blazer",
            category: "Clothing",
            description: "Classic oversized blazer with rolled sleeves. Perfect for professional and casual looks.",
            price: 129,
            imgUrl: [
                "https://static.zara.net/photos///2023/I/0/1/p/1564/641/802/2/w/750/1564641802_1_1_1.jpg?ts=1695645432077",
                "https://static.zara.net/photos///2023/I/0/1/p/1564/641/802/2/w/750/1564641802_2_1_1.jpg?ts=1695645432077",
                "https://static.zara.net/photos///2023/I/0/1/p/1564/641/802/2/w/750/1564641802_2_2_1.jpg?ts=1695645432077"
            ],
        },

        // Books - Fiction
        {
            name: "The Midnight Library",
            category: "Books",
            description: "By Matt Haig. A dazzling novel about all the choices that go into a life well lived.",
            price: 16,
            imgUrl: [
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
                "https://m.media-amazon.com/images/I/81NNKCuwLaL._AC_UF1000,1000_QL80_.jpg",
                "https://m.media-amazon.com/images/I/71nB2XUEV9L._AC_UF1000,1000_QL80_.jpg"
            ],
        },
        {
            name: "Project Hail Mary",
            category: "Books",
            description: "By Andy Weir. A lone astronaut must save the earth from disaster in this incredible new science-based thriller.",
            price: 18,
            imgUrl: [
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
                "https://m.media-amazon.com/images/I/91vS2wJg3LL._AC_UF1000,1000_QL80_.jpg",
                "https://m.media-amazon.com/images/I/81q0nGgzrqL._AC_UF1000,1000_QL80_.jpg"
            ],
        },
        {
            name: "Atomic Habits",
            category: "Books",
            description: "By James Clear. An easy & proven way to build good habits & break bad ones. #1 New York Times bestseller.",
            price: 20,
            imgUrl: [
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
                "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg",
                "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg"
            ],
        },

        // Books - Non-Fiction
        {
            name: "Sapiens: A Brief History of Humankind",
            category: "Books",
            description: "By Yuval Noah Harari. Explores how Homo sapiens came to dominate the world.",
            price: 22,
            imgUrl: [
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595674533i/23692271.jpg",
                "https://m.media-amazon.com/images/I/71VRDv1yHZL._AC_UF1000,1000_QL80_.jpg",
                "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg"
            ],
        },
        {
            name: "Educated: A Memoir",
            category: "Books",
            description: "By Tara Westover. A remarkable memoir about a young woman who leaves her survivalist family.",
            price: 17,
            imgUrl: [
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg",
                "https://m.media-amazon.com/images/I/81NkDZPiD-L._AC_UF1000,1000_QL80_.jpg",
                "https://m.media-amazon.com/images/I/71-4MkLN5jL._AC_UF1000,1000_QL80_.jpg"
            ],
        },

        // Home & Kitchen
        {
            name: "Ninja Professional Blender",
            category: "Home & Kitchen",
            description: "1000-watt motor, 72 oz pitcher, perfect for smoothies, frozen drinks, and food prep.",
            price: 89,
            imgUrl: [
                "https://m.media-amazon.com/images/I/71f+-5H0wOL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71dO6YhLXVL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71VT3nj4FzL._AC_SL1500_.jpg"
            ],
        },
        {
            name: "Instant Pot Duo 7-in-1",
            category: "Home & Kitchen",
            description: "Electric pressure cooker, slow cooker, rice cooker, steamer, sauté, and warmer.",
            price: 99,
            imgUrl: [
                "https://m.media-amazon.com/images/I/71Xua26Y7OL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71EqODW0kWL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71e3XkSKddL._AC_SL1500_.jpg"
            ],
        },
        {
            name: "KitchenAid Stand Mixer",
            category: "Home & Kitchen",
            description: "Iconic 5-quart stand mixer with 10 speeds. Includes dough hook, wire whip, and flat beater.",
            price: 449,
            imgUrl: [
                "https://m.media-amazon.com/images/I/81QWTu8qi4L._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71p4WJqKk+L._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71Qz9DK0A0L._AC_SL1500_.jpg"
            ],
        },

        // Office Supplies
        {
            name: "Herman Miller Aeron Chair",
            category: "Office",
            description: "Ergonomic office chair with lumbar support, breathable mesh, and adjustable features.",
            price: 1395,
            imgUrl: [
                "https://www.hermanmiller.com/content/dam/hermanmiller/page_assets/products/aeron_chairs/aeron_chair_product_page_overview.jpg.rendition.600.600.jpg",
                "https://www.hermanmiller.com/content/dam/hermanmiller/page_assets/products/aeron_chairs/aeron_chair_product_page_angle.jpg.rendition.600.600.jpg",
                "https://www.hermanmiller.com/content/dam/hermanmiller/page_assets/products/aeron_chairs/aeron_chair_product_page_side.jpg.rendition.600.600.jpg"
            ],
        },
        {
            name: "Logitech MX Master 3S",
            category: "Office",
            description: "Advanced wireless mouse with ultra-fast scrolling, ergonomic design, and silent clicks.",
            price: 99,
            imgUrl: [
                "https://resource.logitech.com/w_1600,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1",
                "https://resource.logitech.com/w_1600,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-side-view-graphite.png?v=1",
                "https://resource.logitech.com/w_1600,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-back-view-graphite.png?v=1"
            ],
        },
        {
            name: "Samsung Odyssey G7 Monitor",
            category: "Office",
            description: "32-inch curved gaming monitor, 240Hz, 1ms response time, QLED display.",
            price: 699,
            imgUrl: [
                "https://images.samsung.com/is/image/samsung/p6pim/levant/lc32g75tqsmxzn/gallery/levant-odyssey-g7-lc32g75tqsmxzn-285214428?$684_547_PNG$",
                "https://images.samsung.com/is/image/samsung/p6pim/levant/lc32g75tqsmxzn/gallery/levant-odyssey-g7-lc32g75tqsmxzn-285214429?$684_547_PNG$",
                "https://images.samsung.com/is/image/samsung/p6pim/levant/lc32g75tqsmxzn/gallery/levant-odyssey-g7-lc32g75tqsmxzn-285214430?$684_547_PNG$"
            ],
        },

        // Audio
        {
            name: "Sony WH-1000XM5",
            category: "Audio",
            description: "Industry-leading noise cancellation, exceptional sound quality, 30-hour battery life.",
            price: 399,
            imgUrl: [
                "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/51lRaUMJFsL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/51XhFOkbKEL._AC_SL1500_.jpg"
            ],
        },
        {
            name: "AirPods Pro (2nd Gen)",
            category: "Audio",
            description: "Adaptive Audio. Now playing. Active noise cancellation and Transparency mode.",
            price: 249,
            imgUrl: [
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985"
            ],
        },
        {
            name: "Bose SoundLink Flex",
            category: "Audio",
            description: "Portable Bluetooth speaker, waterproof, 12-hour battery, exceptional sound quality.",
            price: 149,
            imgUrl: [
                "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_flex/product_silo_images/soundlink_flex_carmine_red_front.psd/jcr:content/renditions/cq5dam.web.600.600.png",
                "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_flex/product_silo_images/soundlink_flex_carmine_red_back.psd/jcr:content/renditions/cq5dam.web.600.600.png",
                "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_flex/product_silo_images/soundlink_flex_carmine_red_side.psd/jcr:content/renditions/cq5dam.web.600.600.png"
            ],
        },

        // Cameras
        {
            name: "Sony A7 IV",
            category: "Cameras",
            description: "Full-frame mirrorless camera, 33MP sensor, 4K 60fps video, advanced autofocus.",
            price: 2499,
            imgUrl: [
                "https://m.media-amazon.com/images/I/71DyhHFkWXL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71K9hC3RBDL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71aU5LY3EhL._AC_SL1500_.jpg"
            ],
        },
        {
            name: "Canon EOS R6 Mark II",
            category: "Cameras",
            description: "24.2MP full-frame sensor, 40fps continuous shooting, 6K video oversampling.",
            price: 2399,
            imgUrl: [
                "https://m.media-amazon.com/images/I/81v0Y2TaTJL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71OvXGg9hZL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71dLzPcSDEL._AC_SL1500_.jpg"
            ],
        },
        {
            name: "GoPro HERO12 Black",
            category: "Cameras",
            description: "Waterproof action camera, 5.3K video, HyperSmooth 6.0 stabilization.",
            price: 399,
            imgUrl: [
                "https://m.media-amazon.com/images/I/61Y2RYIE5NL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/61vu0qL8EcL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71o-rLCJeqL._AC_SL1500_.jpg"
            ],
        },

        // Watches
        {
            name: "Apple Watch Ultra 2",
            category: "Watches",
            description: "Next level adventure. Titanium case, Action button, precision dual-frequency GPS.",
            price: 799,
            imgUrl: [
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-alp-loop-blue-select-202309-ocean?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1693245037168",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-alp-loop-blue-select-202309_AV1?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1693245037168",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-alp-loop-blue-select-202309_AV2?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1693245037168"
            ],
        },
        {
            name: "Garmin Fenix 7X Sapphire Solar",
            category: "Watches",
            description: "Premium multisport GPS watch with solar charging, advanced training metrics, maps.",
            price: 899,
            imgUrl: [
                "https://res.garmin.com/en/products/010-02541-00/g/cf-lg-cfe46b8e-5e84-4895-b4c2-4c2d8c0a5c0a.jpg",
                "https://res.garmin.com/en/products/010-02541-00/g/cf-lg-f32a21f7-6e1d-4d11-8e2e-1d0c7c0b5c0a.jpg",
                "https://res.garmin.com/en/products/010-02541-00/g/cf-lg-a8e3b4c9-4d7f-4e8e-9c1e-2e0d8c1b6c1b.jpg"
            ],
        },

        // Tablets
        {
            name: "iPad Air",
            category: "Tablets",
            description: "Light. Bright. Full of might. M1 chip, 10.9-inch Liquid Retina display.",
            price: 599,
            imgUrl: [
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202211-space-gray-wifi?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1670875960621",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202211-space-gray-wifi_AV1?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1670875960621",
                "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202211-space-gray-wifi_AV2?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1670875960621"
            ],
        },
        {
            name: "Samsung Galaxy Tab S9+",
            category: "Tablets",
            description: "12.4-inch AMOLED display, S Pen included, IP68 water resistance.",
            price: 999,
            imgUrl: [
                "https://images.samsung.com/is/image/samsung/p6pim/uk/sm-x816bzeeeub/gallery/uk-galaxy-tab-s9-5g-x816-sm-x816bzeeeub-thumb-537860474?$344_344_PNG$",
                "https://images.samsung.com/is/image/samsung/p6pim/uk/sm-x816bzeeeub/gallery/uk-galaxy-tab-s9-5g-x816-sm-x816bzeeeub-thumb-537860475?$344_344_PNG$",
                "https://images.samsung.com/is/image/samsung/p6pim/uk/sm-x816bzeeeub/gallery/uk-galaxy-tab-s9-5g-x816-sm-x816bzeeeub-thumb-537860476?$344_344_PNG$"
            ],
        },

        // Gaming
        {
            name: "PlayStation 5",
            category: "Gaming",
            description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion.",
            price: 499,
            imgUrl: [
                "https://m.media-amazon.com/images/I/51erGb3CqjL._SL1280_.jpg",
                "https://m.media-amazon.com/images/I/51hWLNahc3L._SL1280_.jpg",
                "https://m.media-amazon.com/images/I/51HYhb7QFSL._SL1280_.jpg"
            ],
        },
        {
            name: "Xbox Series X",
            category: "Gaming",
            description: "The fastest, most powerful Xbox ever. 12 teraflops of processing power, 4K gaming.",
            price: 499,
            imgUrl: [
                "https://m.media-amazon.com/images/I/51VPaoH8eOL._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/51j8MHJ1VjL._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/51qVGb6d4tL._SL1500_.jpg"
            ],
        },
        {
            name: "Nintendo Switch OLED",
            category: "Gaming",
            description: "Vibrant 7-inch OLED screen, enhanced audio, 64 GB internal storage.",
            price: 349,
            imgUrl: [
                "https://m.media-amazon.com/images/I/61PsLzxsRuL._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71e3XNbW5ML._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71yN42NUSUL._SL1500_.jpg"
            ],
        },
    ];

    console.log(`Creating ${products.length} products...`);

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

        console.log(`✓ Created: ${product.name} (${product.imgUrl.length} images)`);
    }

    console.log(`\n✅ Successfully seeded ${products.length} products!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
