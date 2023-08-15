-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 13, 2023 at 02:40 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AlpineEdge`
--
CREATE DATABASE IF NOT EXISTS `AlpineEdge` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `AlpineEdge`;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `addressId` int(11) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `zipcode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`addressId`, `country`, `city`, `street`, `zipcode`) VALUES
(1, 'israel', 'beer sheva', 'rager', '874213');

-- --------------------------------------------------------

--
-- Table structure for table `basket`
--

CREATE TABLE `basket` (
  `basketId` varchar(256) NOT NULL,
  `totalPrice` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basket`
--

INSERT INTO `basket` (`basketId`, `totalPrice`) VALUES
('clkxsnt7x000a3ba9qr9xgsfi', 0);

-- --------------------------------------------------------

--
-- Table structure for table `basketItem`
--

CREATE TABLE `basketItem` (
  `basketItemId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `pictureUrl` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basketItem`
--

INSERT INTO `basketItem` (`basketItemId`, `productId`, `productName`, `price`, `quantity`, `pictureUrl`, `type`, `brand`) VALUES
(1, 10, 'FrostGlide Pro', '449.99', 1, 'FrostGlidePro.jpg', 'Skis', 'Frost Ride'),
(21, 50, 'AeroGlide AeroVent', '79.00', 3, 'AeroGlideAeroVent.jpg', 'Googles', 'Alpine Peak');

-- --------------------------------------------------------

--
-- Table structure for table `basketJunction`
--

CREATE TABLE `basketJunction` (
  `id` int(11) NOT NULL,
  `basketId` varchar(256) NOT NULL,
  `basketItemId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basketJunction`
--

INSERT INTO `basketJunction` (`id`, `basketId`, `basketItemId`) VALUES
(17, 'clkxsnt7x000a3ba9qr9xgsfi', 1),
(28, 'clkxsnt7x000a3ba9qr9xgsfi', 21);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `clientId` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `addressId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`clientId`, `firstName`, `lastName`, `email`, `password`, `addressId`) VALUES
(1, 'oz', 'zrihan', 'oz@test.com', '25568e160e1870edee3495c576076f6922679c84d23e23e4d9ab93b3f0764ee60871b742356c87ca2914461024cc721fc773a1ec1ea5d70c0fb98dba6bda34bb', 1);

-- --------------------------------------------------------

--
-- Table structure for table `deliveryMethod`
--

CREATE TABLE `deliveryMethod` (
  `deliveryMethodId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `deliveryTime` varchar(30) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliveryMethod`
--

INSERT INTO `deliveryMethod` (`deliveryMethodId`, `name`, `deliveryTime`, `description`, `price`) VALUES
(1, 'Free Shipping', ' 5-7 business days', 'Enjoy free standard shipping.', '0.00'),
(2, 'Next Day Delivery', 'Next business day', 'Guaranteed delivery by the next business day.', '14.99'),
(3, 'Express Delivery', '1-2 business days', 'Expedited shipping option with delivery in 1 to 2 business days.', '9.99'),
(4, 'Standard Delivery', '3-5 business days', 'Standard shipping option with delivery in 3 to 5 business days', '5.99');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `basketId` varchar(256) NOT NULL,
  `orderDate` datetime NOT NULL,
  `deliveryMethodId` int(11) NOT NULL,
  `finalPrice` decimal(6,2) NOT NULL,
  `orderStatus` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `clientId`, `basketId`, `orderDate`, `deliveryMethodId`, `finalPrice`, `orderStatus`) VALUES
(39, 1, 'clkxsnt7x000a3ba9qr9xgsfi', '2023-08-08 01:42:45', 3, '696.98', 'Payment Received');

-- --------------------------------------------------------

--
-- Table structure for table `productBrand`
--

CREATE TABLE `productBrand` (
  `brandId` int(11) NOT NULL,
  `brandName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productBrand`
--

INSERT INTO `productBrand` (`brandId`, `brandName`) VALUES
(1, 'Snow Tek'),
(2, 'Frost Ride'),
(3, 'Glacier Glide'),
(4, 'Alpine Peak'),
(5, 'Polar Carve'),
(6, 'SummitPro');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `pictureUrl` varchar(100) NOT NULL,
  `productTypeId` int(11) NOT NULL,
  `productBrandId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `name`, `description`, `price`, `pictureUrl`, `productTypeId`, `productBrandId`) VALUES
(10, 'FrostGlide Pro', 'The FrostGlide Pro is a high-performance all-mountain ski designed for intermediate to advanced skiers. Its lightweight construction and precision engineering allow for effortless turns and maximum control on any terrain.\r\n', '449.99', 'FrostGlidePro.jpg', 1, 2),
(11, 'Avalanche-X 2000', 'The Avalanche-X 2000 is a powerful and aggressive freeride ski, built to conquer the steepest slopes and deepest powder. Its carbon fiber core and rockered tip provide unmatched stability and flotation for the ultimate backcountry experience.', '589.95', 'Avalanche-X2000.jpg', 1, 4),
(12, 'SnowDrift Elite', 'The SnowDrift Elite offers a perfect blend of versatility and performance. With a medium flex and responsive camber, this ski excels on groomed runs and glides through crud and moguls with ease.', '399.00', 'SnowDriftElite.jpg', 1, 3),
(13, 'SummitStorm Pro-X', 'Take your big mountain adventures to the next level with the SummitStorm Pro-X. This ski combines a titanal-reinforced construction with a nimble profile for aggressive skiers seeking high-speed stability and powerful turns.', '699.50', 'SnowDriftElite.jpg', 1, 2),
(14, 'PolarCarve XRS', 'The PolarCarve XRS is a precision-carving ski engineered for advanced skiers who crave speed and agility. Its full sidewall construction and race-inspired design ensure razor-sharp turns and edge grip on icy slopes.\r\n\r\n', '549.95', 'PolarCarveXRS.jpg', 1, 5),
(15, 'GlacierGlide SE', 'The GlacierGlide SE is a versatile and user-friendly ski perfect for beginner to intermediate skiers. Its forgiving flex and wide profile offer stability and confidence as you progress your skills on the mountain.', '329.99', 'GlacierGlideSE.jpg', 1, 3),
(16, 'BlizzardBlade XC', 'The BlizzardBlade XC is a cross-country ski designed for touring and exploring the winter wonderland. With a lightweight construction and Nordic rocker, it delivers smooth gliding and effortless kick on various snow conditions.', '279.00', 'BlizzardBladeXC.jpg', 1, 4),
(17, 'ArcticAir Freestyle', 'The ArcticAir Freestyle is a playful twin-tip ski built for park and pipe enthusiasts. Its poplar wood core and symmetrical design allow for easy switch riding and smooth landings, making it the ultimate choice for freestyle fun.', '389.75', 'ArcticAirFreestyle.jpg', 1, 2),
(18, 'GravityCarver RS', 'The GravityCarver RS is a high-performance carving ski that delivers unmatched precision and edge control. With its responsive wood core and race-inspired sidecut, this ski is engineered to carve through groomers with speed and stability, giving you an exhilarating on-piste experience.', '569.00', 'GravityCarverRS.jpg', 1, 4),
(19, 'AlpinePro X1', 'The AlpinePro X1 ski boots offer a perfect blend of comfort and performance. With a heat-moldable liner and adjustable flex, these boots ensure a precise fit and superior control on the slopes.', '199.99', 'AlpineProX1.jpg', 2, 4),
(20, 'GlacierFlex 300', 'The GlacierFlex 300 ski boots are designed for intermediate to advanced skiers who crave versatility and responsiveness. The flex adjustment and shock-absorbing technology make these boots an excellent choice for all-mountain adventures.\r\n', '249.95', 'GlacierFlex300.jpg', 2, 3),
(21, 'PowderHound Pro', 'Conquer powder-filled terrain with the PowderHound Pro ski boots. These boots feature a waterproof membrane and insulation for maximum warmth and dryness, keeping you comfortable during your backcountry escapades', '319.00', 'PowderHoundPro.jpg', 2, 2),
(22, 'FreestyleX 5000', 'Push your freestyle skills to new heights with the FreestyleX 5000 boots. These boots provide the flexibility and support needed for tricks and jumps in the terrain park, making them a favorite among park riders.', '279.50', 'FreestyleX5000.jpg', 2, 3),
(23, 'EvoSlope GTX', 'The EvoSlope GTX ski boots are engineered for aggressive skiers seeking ultimate performance. The integrated Gore-Tex membrane guarantees waterproofness, while the carbon-reinforced shell ensures power transmission and stability.', '399.95', 'EvoSlopeGTX.jpg', 2, 4),
(24, 'All-Terrain Adventurer', 'Embrace the thrill of exploration with the All-Terrain Adventurer ski boots. These boots excel in both groomed runs and off-piste conditions, offering adaptability and ease of movement.', '219.00', 'All-TerrainAdventurer.jpg', 2, 3),
(25, 'ArcticShield Pro', 'The ArcticShield Pro ski jacket offers exceptional warmth and protection from harsh winter conditions. Its waterproof and breathable fabric keeps you dry, while the thermal insulation ensures maximum comfort on the coldest days.', '189.99', 'ArcticShieldPro.jpg', 3, 1),
(26, 'GlacierGuard 5000', 'The GlacierGuard 5000 ski jacket is built for adventure in the backcountry. Featuring a durable shell and sealed seams, this jacket keeps you shielded from snow and wind, making it ideal for off-piste explorations.', '219.95', 'GlacierGuard5000.jpg', 3, 1),
(27, 'PowderPro X3', 'Conquer powder-filled days with the PowderPro X3 ski jacket. Its 3-layer construction provides outstanding waterproofing and breathability, while the venting zippers allow you to regulate your body temperature with ease.', '279.00', 'PowderProX3.jpg', 3, 6),
(28, 'FreerideFusion', 'The FreerideFusion ski jacket is designed for thrill-seekers who love to ride off-piste. Its lightweight and stretchy fabric offer unrestricted movement, while the RECCO® reflectors enhance safety on the mountain.', '199.50', 'FreerideFusion.jpg', 3, 6),
(29, 'EvoSlope GTX Pro', 'Engineered for the most demanding skiers, the EvoSlope GTX Pro ski jacket is equipped with a Gore-Tex® Pro membrane for ultimate weather protection. Its rugged design and technical features make it a reliable companion in extreme conditions.', '349.95', 'EvoSlopeGTXPro.jpg', 3, 6),
(30, 'All-Mountain Explorer', 'The All-Mountain Explorer ski jacket is a versatile choice for various snow conditions. Its adjustable hood and powder skirt ensure a snug fit, while the numerous pockets keep your essentials secure and organized.', '189.00', 'All-MountainExplorer.jpg', 3, 1),
(31, 'Women\'s Alpine Charm', 'he Women\'s Alpine Charm ski jacket combines style and functionality. With a flattering silhouette and premium insulation, this jacket keeps you warm and looking great on and off the slopes.', '239.99', 'Women\'sAlpineCharm.jpg', 3, 6),
(32, 'Youth ShredMaster', 'The Youth ShredMaster ski jacket is designed to keep young skiers warm and dry during their snowy adventures. The colorful design and durable materials make it a favorite among kids hitting the mountain.', '129.95', 'YouthShredMaster.jpg', 3, 1),
(33, 'StormChaser Lite', 'The StormChaser Lite ski jacket is your go-to companion for all-day skiing. Its lightweight and packable design make it easy to carry, while the water-resistant fabric ensures protection from unexpected showers.', '169.00', 'StormChaserLite.jpg', 3, 1),
(34, 'ArcticShield FlexGrip', 'The ArcticShield FlexGrip ski gloves provide superior warmth and flexibility for all-day comfort on the slopes. With a waterproof and windproof outer shell, these gloves keep your hands dry and protected in extreme conditions', '49.99', 'ArcticShieldFlexGrip.jpg', 4, 1),
(35, 'GlacierPro IceArmor', 'The GlacierPro IceArmor ski gloves are designed for serious skiers seeking top-notch performance. The reinforced palms and fingers offer excellent grip and durability, while the thermal insulation keeps your hands cozy in freezing temperatures.', '59.95', 'GlacierProIceArmor.jpg', 4, 6),
(36, 'PowderGuard Extreme', 'Take on powder days with confidence using the PowderGuard Extreme ski gloves. These gloves feature a breathable yet waterproof membrane, preventing snow and moisture from seeping in while allowing excess heat to escape.\r\n', '69.00', 'PowderGuardExtreme.jpg', 4, 1),
(37, 'FreeridePulse Pro', 'The FreeridePulse Pro ski gloves offer exceptional dexterity and warmth for adventurous skiers. Their low-profile design allows easy movement, while the adjustable wrist strap ensures a secure fit.', '54.50', 'FreeridePulsePro.jpg', 4, 6),
(38, 'EvoSlope GTX Insulate', 'Engineered with a Gore-Tex® Insulated membrane, the EvoSlope GTX Insulate ski gloves keep your hands dry and warm in the harshest conditions. The soft fleece lining adds extra comfort during long days on the mountain.\r\n', '79.95', 'EvoSlopeGTXInsulate.jpg', 4, 6),
(39, 'All-Mountain Glide', 'The All-Mountain Glide ski gloves are versatile and dependable. Their moisture-wicking inner lining helps regulate temperature, while the touchscreen-compatible fingertips allow you to use your devices without removing the gloves.\r\n', '49.00', 'All-MountainGlide.jpg', 4, 1),
(40, 'Women\'s Alpine Elegance', 'The Women\'s Alpine Elegance ski gloves combine style and function for female skiers. These gloves feature a chic design and a soft, insulated interior to keep your hands warm and fashionable on and off the slopes.', '64.99', 'Women\'sAlpineElegance.jpg', 4, 6),
(41, 'SnowVision Pro X', 'The SnowVision Pro X ski goggles offer crystal-clear optics and a wide field of view. With anti-fog and UV protection, these goggles ensure a clear vision in any weather condition.', '89.99', 'SnowVisionProX.jpg', 5, 4),
(42, 'GlacierPeak GlacierShield', 'The GlacierPeak GlacierShield ski goggles are designed for extreme mountain conditions. The dual-layer lens with anti-scratch coating and adjustable strap provide optimal performance and comfort.', '74.95', 'GlacierPeakGlacierShield.jpg', 5, 3),
(43, 'AlpineEdge ClarityMax', 'Experience maximum clarity with the AlpineEdge ClarityMax ski goggles. The polarized lens technology reduces glare, and the frameless design offers a sleek and modern look.', '99.00', 'AlpineEdgeClarityMax.jpg', 5, 4),
(44, 'EvoRide All-Terrain', 'The EvoRide All-Terrain ski goggles are engineered for versatility. With interchangeable lenses, these goggles adapt to changing light conditions on the slopes.', '59.50', 'EvoRideAll-Terrain.jpg', 5, 5),
(45, 'PowderGuard SummitPro', 'Conquer powder days with confidence using the PowderGuard SummitPro ski goggles. These goggles feature a wide spherical lens for an unobstructed view and enhanced peripheral vision.', '79.95', 'PowderGuardSummitPro.jpg', 5, 2),
(46, 'Freestyle360 Anti-Fog', 'Designed for freestyle skiers, the Freestyle360 Anti-Fog ski goggles feature advanced ventilation to prevent fogging during intense runs in the park.', '69.00', 'Freestyle360Anti-Fog.jpg', 5, 4),
(47, 'SwiftSlope PhotoChromic', 'The SwiftSlope PhotoChromic ski goggles automatically adjust their tint based on the lighting conditions, ensuring optimal visibility throughout the day.', '119.99', 'SwiftSlopePhotoChromic.jpg', 5, 2),
(48, 'Women\'s SnowDazzle Aurora', 'The Women\'s SnowDazzle Aurora ski goggles combine style and performance. The vibrant lens colors and comfortable fit make them a favorite among female skiers.', '84.99', 'Women\'sSnowDazzleAurora.jpg', 5, 2),
(49, 'GravityShield CarbonFlex', 'The GravityShield CarbonFlex ski goggles feature a lightweight and durable carbon fiber frame. The triple-layer foam lining provides a snug and comfortable fit.\r\n', '89.95', 'GravityShieldCarbonFlex.jpg', 5, 3),
(50, 'AeroGlide AeroVent', 'Stay cool and fog-free with the AeroGlide AeroVent ski goggles. The strategically placed vents promote airflow, reducing moisture build-up inside the goggles.\r\n', '79.00', 'AeroGlideAeroVent.jpg', 5, 4),
(51, 'All-Mountain Glide Pro', 'The All-Mountain Glide Pro ski goggles are packed with advanced features. The magnetic lens system allows quick lens changes, while the triple-layer face foam ensures a secure fit.', '94.50', 'All-MountainGlidePro.jpg', 5, 3),
(52, 'FreerideX HybridShield', 'The FreerideX HybridShield ski goggles combine the best of cylindrical and spherical lens designs, offering superior clarity and enhanced contrast on the slopes.', '75.00', 'FreerideXHybridShield.jpg', 5, 5),
(53, 'SnowCrest Arctic Beanie', 'The SnowCrest Arctic Beanie is a cozy and warm hat designed to keep you comfortable in the coldest winter conditions. Its soft fleece lining provides excellent insulation.', '24.99', 'SnowCrestArcticBeanie.jpg', 6, 6),
(54, 'Cable-Knit Pom Pom Hat', 'The Cable-Knit Pom Pom Hat adds a touch of style to your ski outfit. Made with premium acrylic yarn, it offers both warmth and fashion on the slopes.\r\n', '19.95', 'Cable-KnitPomPomHat.jpg', 6, 1),
(55, 'GlacierGuard Waterproof Trapper Hat', 'The GlacierGuard Waterproof Trapper Hat is perfect for extreme weather. Its waterproof and windproof exterior protects you from the harshest elements.', '29.99', 'GlacierGuardWaterproofTrapperHat.jpg', 6, 1),
(56, 'FrostBite Performance Skull Cap', 'The FrostBite Performance Skull Cap is a lightweight and breathable hat designed for high-intensity skiing. Its moisture-wicking fabric keeps you dry during active sessions.', '16.50', 'FrostBitePerformanceSkullCap.jpg', 6, 6),
(57, 'EvoRide Classic Slouchy Beanie', 'The EvoRide Classic Slouchy Beanie offers a relaxed and casual look for après-ski activities. Its stretchy knit fabric ensures a comfortable fit for all head sizes.', '14.95', 'EvoRideClassicSlouchyBeanie.jpg', 6, 6),
(58, 'SnowDazzle Faux Fur Aviator Hat', 'Embrace luxury and warmth with the SnowDazzle Faux Fur Aviator Hat. Its faux fur lining and earflaps provide ultimate protection against freezing temperatures.', '34.99', 'SnowDazzleFauxFurAviatorHat.jpg', 6, 6),
(59, 'Freestyle360 Reversible Skull Cap', 'The Freestyle360 Reversible Skull Cap offers two styles in one hat. Flip it inside out for a different color and pattern, perfect for mixing up your look.', '18.00', 'Freestyle360ReversibleSkullCap.jpg', 6, 1),
(60, 'SwiftSlope Reflective Beanie', 'The SwiftSlope Reflective Beanie features reflective details for added visibility during low-light skiing conditions. Stay safe and stylish on the slopes.', '22.99', 'SwiftSlopeReflectiveBeanie.jpg', 6, 6),
(61, 'GravityShield Merino Wool Hat', 'The GravityShield Merino Wool Hat is crafted from soft and insulating merino wool, providing natural temperature regulation and moisture-wicking properties.', '27.95', 'GravityShieldMerinoWoolHat.jpg', 6, 1),
(62, 'GlacierGlide All-Mountain', 'The GlacierGlide All-Mountain snowboard is a versatile and high-performance board designed to conquer all types of terrain. Its responsive flex and advanced edge control ensure an exhilarating ride.', '399.99', 'GlacierGlideAll-Mountain.jpg', 7, 3),
(63, 'PowderPeak Freeride Pro', 'The PowderPeak Freeride Pro snowboard is built for powder enthusiasts seeking deep-snow adventures. With its wider nose and tail, it effortlessly floats through fresh powder.\r\n', '449.95', 'PowderPeakFreeridePro.jpg', 7, 4),
(64, 'SummitThrill Park & Pipe', 'The SummitThrill Park & Pipe snowboard is engineered for freestyle riders who love hitting the park features and mastering tricks. Its twin-tip shape and medium flex provide excellent pop and stability.', '379.00', 'SummitThrillPark&Pipe.jpg', 7, 2),
(65, 'IceCarver All-Terrain', 'The IceCarver All-Terrain snowboard is perfect for aggressive riders who enjoy carving on hard-packed snow and icy slopes. Its camber profile delivers precision and edge hold.', '429.50', 'IceCarverAll-Terrain.jpg', 7, 5),
(66, 'EcoShred Sustainable Cruiser', 'The EcoShred Sustainable Cruiser snowboard is designed with eco-friendly materials for environmentally conscious riders. Its soft flex makes it ideal for laid-back cruising.', '299.99', 'EcoShredSustainableCruiser.jpg', 7, 4),
(67, 'BackcountryXplorer Splitboard', 'The BackcountryXplorer Splitboard is specially crafted for backcountry exploration and untracked lines. It can be split into skis for easy ascending on snow-covered mountains.', '579.00', 'BackcountryXplorerSplitboard.jpg', 7, 4);

-- --------------------------------------------------------

--
-- Table structure for table `productType`
--

CREATE TABLE `productType` (
  `typeId` int(11) NOT NULL,
  `typeName` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productType`
--

INSERT INTO `productType` (`typeId`, `typeName`, `image`) VALUES
(1, 'Skis', 'skisCategory.jpg'),
(2, 'Boots', 'bootsCategory.jpg'),
(3, 'Jackets', 'JacketsCategory.jpg'),
(4, 'Gloves', 'GlovesCategory.jpg'),
(5, 'Goggles', 'GogglesCategory.jpg'),
(6, 'Hats', 'hatCategory.jpg'),
(7, 'Snow boards', 'snowboardCategory.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressId`);

--
-- Indexes for table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`basketId`);

--
-- Indexes for table `basketItem`
--
ALTER TABLE `basketItem`
  ADD PRIMARY KEY (`basketItemId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `basketJunction`
--
ALTER TABLE `basketJunction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `basketId` (`basketId`),
  ADD KEY `basketItemId` (`basketItemId`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`clientId`),
  ADD KEY `addressId` (`addressId`);

--
-- Indexes for table `deliveryMethod`
--
ALTER TABLE `deliveryMethod`
  ADD PRIMARY KEY (`deliveryMethodId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `clientId` (`clientId`),
  ADD KEY `basketId` (`basketId`),
  ADD KEY `deliveryMethodId` (`deliveryMethodId`);

--
-- Indexes for table `productBrand`
--
ALTER TABLE `productBrand`
  ADD PRIMARY KEY (`brandId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `productTypeId` (`productTypeId`),
  ADD KEY `productBrandId` (`productBrandId`);

--
-- Indexes for table `productType`
--
ALTER TABLE `productType`
  ADD PRIMARY KEY (`typeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `addressId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `basketItem`
--
ALTER TABLE `basketItem`
  MODIFY `basketItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `basketJunction`
--
ALTER TABLE `basketJunction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `clientId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `deliveryMethod`
--
ALTER TABLE `deliveryMethod`
  MODIFY `deliveryMethodId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `productBrand`
--
ALTER TABLE `productBrand`
  MODIFY `brandId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `productType`
--
ALTER TABLE `productType`
  MODIFY `typeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `basketItem`
--
ALTER TABLE `basketItem`
  ADD CONSTRAINT `basketitem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Constraints for table `basketJunction`
--
ALTER TABLE `basketJunction`
  ADD CONSTRAINT `basketjunction_ibfk_1` FOREIGN KEY (`basketId`) REFERENCES `basket` (`basketId`) ON DELETE CASCADE,
  ADD CONSTRAINT `basketjunction_ibfk_2` FOREIGN KEY (`basketItemId`) REFERENCES `basketItem` (`basketItemId`);

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`addressId`) REFERENCES `address` (`addressId`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`basketId`) REFERENCES `basket` (`basketId`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`deliveryMethodId`) REFERENCES `deliveryMethod` (`deliveryMethodId`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productBrandId`) REFERENCES `productBrand` (`brandId`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`productTypeId`) REFERENCES `productType` (`typeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
