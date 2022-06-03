-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2022 at 04:42 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chayxanh`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guest` smallint(6) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` smallint(6) DEFAULT NULL,
  `time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `date`, `guest`, `name`, `phone`, `store_id`, `time`, `status`, `created_at`, `updated_at`) VALUES
(3, '2022-05-18', 2, 'Duong Linh', '036000001', 1, '23:13', 1, '2022-05-18 09:13:46', '2022-05-18 09:17:11'),
(4, '2022-05-24', 3, 'Xang dodo cn', '000', 2, '04:50', 0, '2022-05-24 13:36:46', '2022-05-24 13:36:46');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foodsupplies`
--

CREATE TABLE `foodsupplies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_store_get` int(11) NOT NULL,
  `id_store_share` int(11) NOT NULL,
  `orderD` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `foodsupplies`
--

INSERT INTO `foodsupplies` (`id`, `id_store_get`, `id_store_share`, `orderD`, `notes`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 2, '[{\"id\":6,\"price\":85000,\"qty\":4,\"pic\":\"\\/1651382988.png\",\"name\":\"C\\u01a1m tr\\u1ed9n Chay Xanh\"}]', '123', '2022-05-23 16:45:50', '2022-05-23 17:45:47', 0),
(2, 2, 1, '[{\"id\":12,\"price\":35000,\"qty\":2,\"pic\":\"\\/1652928127.png\",\"name\":\"Canh rong bi\\u1ec3n\"}]', NULL, '2022-05-23 17:41:30', '2022-05-23 17:59:14', 1),
(3, 3, 1, '[{\"id\":8,\"price\":35000,\"qty\":1,\"pic\":\"\\/1652927080.png\",\"name\":\"C\\u1ee7 sen chi\\u00ean l\\u1eafc ph\\u00f4 mai\"}]', NULL, '2022-05-23 18:13:23', '2022-05-23 18:14:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ingredients` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nutrition` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `category` smallint(6) NOT NULL,
  `pic` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `ingredients`, `nutrition`, `price`, `category`, `pic`, `created_at`, `updated_at`) VALUES
(5, 'Cơm chiên Chay Xanh', 'cơm, hạt điều, đậu hà lan, hạt sen, rau,...', 'Giàu chất xơ, đạm, tinh bột', 80000, 2, '/1651382957.png', '2022-04-30 22:29:17', '2022-04-30 22:29:17'),
(6, 'Cơm trộn Chay Xanh', 'cơm, nấm, đậu đỏ, đậu hà lan, bí đỏ, súp lơ xanh,...', 'Giàu chất xơ, đạm, tinh bột', 85000, 2, '/1651382988.png', '2022-04-30 22:29:48', '2022-04-30 22:29:48'),
(7, 'Gỏi chay xanh', 'Dưa leo, ngó sen, đậu hũ, xà lách, đậu phộng...', 'Giàu chất xơ, hỗ trợ giảm cân', 45000, 1, '/1652372759.png', '2022-05-12 09:25:59', '2022-05-12 09:25:59'),
(8, 'Củ sen chiên lắc phô mai', 'Củ sen, cải xanh, cà rốt, phô mai....', 'Giàu chất xơ, Vitamin B,C,K', 35000, 1, '/1652927080.png', '2022-05-18 19:24:40', '2022-05-18 19:27:56'),
(9, 'Chả giò chay xanh', 'Các loại đậu, nấm, cà rốt, cải xanh...', 'Giàu chất đạm, chất xơ', 40000, 2, '/1652927236.png', '2022-05-18 19:27:16', '2022-05-18 19:27:16'),
(10, 'Nấm kho hạt sen', 'Đậu hủ, nấm, gia vị', 'Giàu đạm, chất xơ', 80000, 3, '/1652927537.png', '2022-05-18 19:32:17', '2022-05-18 19:32:17'),
(11, 'Súp nấm mối', 'Nấm, nước dùng, rau củ', 'Giàu chất xơ, đạm, protein', 65000, 3, '/1652927711.png', '2022-05-18 19:35:11', '2022-05-18 19:35:11'),
(12, 'Canh rong biển', 'Rong biển, gia vị....', 'Giàu chất đạm, chất xơ', 35000, 1, '/1652928127.png', '2022-05-18 19:42:07', '2022-05-18 19:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_04_27_133255_create_stores_table', 2),
(6, '2022_05_01_031731_create_menus_table', 3),
(7, '2022_05_07_031359_create_orders_table', 4),
(8, '2022_05_15_041249_create_qtyfoods_table', 5),
(9, '2022_05_16_142015_create_bookings_table', 6),
(10, '2022_05_23_232926_create_foodsupplies_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type_id` smallint(6) NOT NULL,
  `user_order_id` int(11) DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `money` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_order_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_detail` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `user_owner_id` int(11) DEFAULT NULL,
  `payment_id` smallint(6) DEFAULT NULL,
  `payment_status` tinyint(1) DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `momo_id` int(22) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `type_id`, `user_order_id`, `phone`, `address`, `money`, `status_order_id`, `name`, `order_detail`, `store_id`, `user_owner_id`, `payment_id`, `payment_status`, `notes`, `momo_id`, `created_at`, `updated_at`) VALUES
(1, 0, NULL, NULL, NULL, '45000', 0, NULL, '[{\"id\":7,\"price\":45000,\"qty\":1,\"pic\":\"\\/1652372759.png\",\"name\":\"G\\u1ecfi chay xanh\"}]', 1, 2, 0, 1, NULL, NULL, '2022-05-18 09:25:00', '2022-05-18 09:38:51'),
(3, 0, NULL, NULL, NULL, '45000', 0, NULL, '[{\"id\":7,\"price\":45000,\"qty\":1,\"pic\":\"\\/1652372759.png\",\"name\":\"G\\u1ecfi chay xanh\"}]', 1, 2, 0, 1, NULL, NULL, '2022-05-18 10:13:22', '2022-05-18 10:20:02'),
(4, 1, 4, '0360000003', '01 Trần Não Q2', '45000', 4, 'Nguyễn Thanh Khang', '[{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":1}]', 1, NULL, 1, 1, NULL, NULL, '2022-05-18 10:23:54', '2022-05-18 10:41:30'),
(5, 1, 4, '0360000003', '123', '90000', 4, 'Nguyễn Thanh Khang', '[{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":2,\"isChoose\":true,\"oldQty\":2}]', 1, 2, 1, 1, NULL, NULL, '2022-05-18 10:42:55', '2022-05-18 10:45:28'),
(7, 1, 4, '0360000003', '123', '90000', 4, 'Nguyễn Thanh Khang', '[{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":2,\"isChoose\":true,\"oldQty\":2}]', 1, 2, 1, 1, NULL, NULL, '2022-05-18 10:48:19', '2022-05-18 11:32:55'),
(8, 1, 4, '0360000003', '123', '45000', 4, 'Nguyễn Thanh Khang', '[{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":1,\"isChoose\":true,\"oldQty\":1}]', 1, 2, 1, 1, NULL, NULL, '2022-05-18 11:15:51', '2022-05-18 11:45:14'),
(9, 0, NULL, NULL, NULL, '85000', 0, NULL, '[{\"id\":6,\"price\":85000,\"qty\":1,\"pic\":\"\\/1651382988.png\",\"name\":\"C\\u01a1m tr\\u1ed9n Chay Xanh\"}]', 2, 5, 0, 1, NULL, NULL, '2022-05-18 11:27:40', '2022-05-18 11:27:51'),
(11, 1, 6, '012345678', '123', '45000', 0, 'thien1221', '[{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":1}]', 1, NULL, 1, 0, NULL, NULL, '2022-05-20 19:52:16', '2022-05-20 19:52:16'),
(25, 1, 4, '0360000003', '123', '85000', 1, 'Nguyễn Thanh Khang', '[{\"name\":\"C\\u01a1m tr\\u1ed9n Chay Xanh\",\"pic\":\"\\/1651382988.png\",\"id\":6,\"price\":85000,\"qty\":1}]', 1, NULL, 3, 1, NULL, 1653157428, '2022-05-21 11:23:48', '2022-05-21 11:41:24'),
(26, 1, 4, '0360000003', '123', '45000', 1, 'Nguyễn Thanh Khang', '[{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":1}]', 1, NULL, 3, 1, NULL, 1653158560, '2022-05-21 11:42:40', '2022-05-21 11:43:02'),
(27, 1, 4, '0360000003', '123', '45000', 1, 'Nguyễn Thanh Khang', '[{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":1}]', 1, NULL, 3, 1, NULL, 1653158652, '2022-05-21 11:44:12', '2022-05-21 11:44:31'),
(35, 1, 4, '0360000003', '123', '45000', 1, 'Nguyễn Thanh Khang', '[{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":1,\"isChoose\":true,\"oldQty\":1}]', 1, 3, 3, 1, NULL, 1653193893, '2022-05-21 21:31:33', '2022-05-22 07:59:54'),
(37, 1, 4, '0360000003', '4 Lê Lợi', '45000', 4, 'Nguyễn Thanh Khang', '[{\"id\":7,\"price\":45000,\"qty\":1,\"pic\":\"\\/1652372759.png\",\"name\":\"G\\u1ecfi chay xanh\",\"isChoose\":true,\"oldQty\":1}]', 1, 8, 1, 1, NULL, 1653227265, '2022-05-22 13:47:45', '2022-05-22 16:00:32'),
(38, 0, NULL, NULL, NULL, '45000', 0, NULL, '[{\"id\":7,\"price\":45000,\"qty\":1,\"pic\":\"\\/1652372759.png\",\"name\":\"G\\u1ecfi chay xanh\"}]', 1, 8, 0, 0, NULL, NULL, '2022-05-22 14:28:50', '2022-05-22 14:28:50'),
(39, 0, NULL, NULL, NULL, '85000', 0, NULL, '[{\"id\":6,\"price\":85000,\"qty\":1,\"pic\":\"\\/1651382988.png\",\"name\":\"C\\u01a1m tr\\u1ed9n Chay Xanh\"}]', 1, 8, 0, 0, NULL, NULL, '2022-05-22 14:31:14', '2022-05-22 14:31:14'),
(41, 0, NULL, NULL, NULL, '80000', 4, NULL, '[{\"id\":7,\"price\":45000,\"qty\":1,\"pic\":\"\\/1652372759.png\",\"name\":\"G\\u1ecfi chay xanh\",\"isChoose\":true,\"oldQty\":1},{\"id\":12,\"price\":35000,\"qty\":1,\"pic\":\"\\/1652928127.png\",\"name\":\"Canh rong bi\\u1ec3n\",\"isChoose\":true,\"oldQty\":1}]', 1, 8, 0, 1, NULL, NULL, '2022-05-22 14:53:21', '2022-05-22 16:57:19'),
(42, 1, 8, '0110000001', '123', '465000', 0, 'quanlyquan2', '[{\"name\":\"Canh rong bi\\u1ec3n\",\"pic\":\"\\/1652928127.png\",\"id\":12,\"price\":35000,\"qty\":1},{\"name\":\"C\\u1ee7 sen chi\\u00ean l\\u1eafc ph\\u00f4 mai\",\"pic\":\"\\/1652927080.png\",\"id\":8,\"price\":35000,\"qty\":1},{\"name\":\"G\\u1ecfi chay xanh\",\"pic\":\"\\/1652372759.png\",\"id\":7,\"price\":45000,\"qty\":1},{\"name\":\"Ch\\u1ea3 gi\\u00f2 chay xanh\",\"pic\":\"\\/1652927236.png\",\"id\":9,\"price\":40000,\"qty\":1},{\"name\":\"C\\u01a1m chi\\u00ean Chay Xanh\",\"pic\":\"\\/1651382957.png\",\"id\":5,\"price\":80000,\"qty\":1},{\"name\":\"C\\u01a1m tr\\u1ed9n Chay Xanh\",\"pic\":\"\\/1651382988.png\",\"id\":6,\"price\":85000,\"qty\":1},{\"name\":\"S\\u00fap n\\u1ea5m m\\u1ed1i\",\"pic\":\"\\/1652927711.png\",\"id\":11,\"price\":65000,\"qty\":1},{\"name\":\"N\\u1ea5m kho h\\u1ea1t sen\",\"pic\":\"\\/1652927537.png\",\"id\":10,\"price\":80000,\"qty\":1}]', 1, NULL, 1, 0, NULL, 1653234773, '2022-05-22 15:52:53', '2022-05-22 15:52:53'),
(44, 1, 4, '0360000003', '4 Lê Lợi', '35000', 4, 'Nguyễn Thanh Khang', '[{\"name\":\"Canh rong bi\\u1ec3n\",\"pic\":\"\\/1652928127.png\",\"id\":12,\"price\":35000,\"qty\":1,\"isChoose\":true,\"oldQty\":1}]', 1, 8, 3, 1, NULL, 1653235975, '2022-05-22 16:12:55', '2022-05-22 16:34:26'),
(46, 1, 4, '0360000003', '4 Lê Lợi', '105000', 4, 'Nguyễn Thanh Khang', '[{\"name\":\"Canh rong bi\\u1ec3n\",\"pic\":\"\\/1652928127.png\",\"id\":12,\"price\":35000,\"qty\":2,\"isChoose\":true,\"oldQty\":2},{\"id\":8,\"price\":35000,\"qty\":1,\"pic\":\"\\/1652927080.png\",\"name\":\"C\\u1ee7 sen chi\\u00ean l\\u1eafc ph\\u00f4 mai\",\"isChoose\":true,\"oldQty\":1}]', 1, 8, 1, 1, '123', 1653240930, '2022-05-22 17:35:30', '2022-05-22 18:55:37'),
(60, 0, NULL, NULL, NULL, '140000', 4, NULL, '[{\"id\":12,\"price\":35000,\"qty\":1,\"pic\":\"\\/1652928127.png\",\"name\":\"Canh rong bi\\u1ec3n\"},{\"id\":8,\"price\":35000,\"qty\":3,\"pic\":\"\\/1652927080.png\",\"name\":\"C\\u1ee7 sen chi\\u00ean l\\u1eafc ph\\u00f4 mai\"}]', 1, 3, 0, 1, 'qwe', NULL, '2022-05-24 19:04:35', '2022-05-24 19:04:46'),
(61, 1, 4, '0360000003', '4 Lê Lợi', '35000', 0, 'Nguyễn Thanh Khang', '[{\"name\":\"Canh rong bi\\u1ec3n\",\"pic\":\"\\/1652928127.png\",\"id\":12,\"price\":35000,\"qty\":1}]', 1, NULL, 3, 1, NULL, 1653421028, '2022-05-24 19:37:08', '2022-05-24 19:37:35');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '4e15e2163c13c901eb13e5ae9972fb0b01c0b91618c7fc412c4d25861f394941', '[\"*\"]', '2022-05-24 19:05:21', '2022-05-18 07:24:13', '2022-05-24 19:05:21'),
(2, 'App\\Models\\User', 2, 'auth_token', 'b2e4a047dca851d9f01e5a51e51684dd693e257d88b6cc28170b49b23d13bc95', '[\"*\"]', '2022-05-23 15:36:19', '2022-05-18 08:13:50', '2022-05-23 15:36:19'),
(3, 'App\\Models\\User', 3, 'auth_token', '68aadccf0b7c673a88cb6f61aefb1682d372a570e8dc4d6cb4b39228567aad55', '[\"*\"]', '2022-05-24 19:41:13', '2022-05-18 08:17:51', '2022-05-24 19:41:13'),
(4, 'App\\Models\\User', 4, 'auth_token', '81f3c2dacce406f9493155547c165866c254f00a10b24356dca288168025411c', '[\"*\"]', '2022-05-24 19:37:08', '2022-05-18 10:21:41', '2022-05-24 19:37:08'),
(5, 'App\\Models\\User', 5, 'auth_token', '9f22b2446f505c8b9d9fbe4256ab56f9ae14086c98197fb973ec061d7b9db0d4', '[\"*\"]', '2022-05-18 11:54:01', '2022-05-18 11:17:51', '2022-05-18 11:54:01'),
(6, 'App\\Models\\User', 6, 'auth_token', 'd922db1db64eb92480a9ee0c7037a43a580f356ee5394c8e91ac69fc11a3a912', '[\"*\"]', '2022-05-20 19:52:18', '2022-05-20 19:47:55', '2022-05-20 19:52:18'),
(7, 'App\\Models\\User', 7, 'auth_token', '8f177fc321e83730219aae5b39c5019689d5a807bad77663ab911729153f0383', '[\"*\"]', NULL, '2022-05-22 00:43:58', '2022-05-22 00:43:58'),
(8, 'App\\Models\\User', 8, 'auth_token', '5d644b883ddfd39dbd4030a8e2411dfc235941567100105814ed1972e7d2852a', '[\"*\"]', '2022-05-24 13:37:32', '2022-05-22 13:24:34', '2022-05-24 13:37:32'),
(9, 'App\\Models\\User', 9, 'auth_token', '3a58d383bbe2ecc802fba91f7a5fe0d3d066b6b09d6f8c2fb279c1b96449f8a4', '[\"*\"]', '2022-05-28 08:23:57', '2022-05-23 17:40:27', '2022-05-28 08:23:57'),
(10, 'App\\Models\\User', 10, 'auth_token', '42964a49bd5f4466a5a0bfe2e5b318ee1c3c3f391e83787621eb3968eb8d4ea7', '[\"*\"]', NULL, '2022-05-23 18:10:22', '2022-05-23 18:10:22'),
(11, 'App\\Models\\User', 11, 'auth_token', 'd50733b94afba60d6f815cec39b2b0335462b889d6cb67ab17ac7c6ea6b43b8e', '[\"*\"]', '2022-05-28 08:23:20', '2022-05-23 18:11:18', '2022-05-28 08:23:20'),
(12, 'App\\Models\\User', 12, 'auth_token', 'cc793d008f53f290aea210f026b6572f56eeef77929343f65e2e47b13a40d303', '[\"*\"]', NULL, '2022-05-23 18:13:02', '2022-05-23 18:13:02');

-- --------------------------------------------------------

--
-- Table structure for table `qtyfoods`
--

CREATE TABLE `qtyfoods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_store` int(11) NOT NULL,
  `id_food` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qtyfoods`
--

INSERT INTO `qtyfoods` (`id`, `id_store`, `id_food`, `qty`, `created_at`, `updated_at`) VALUES
(1, 1, 7, 5, '2022-05-18 09:24:45', '2022-05-22 17:00:31'),
(2, 2, 6, 4, '2022-05-18 11:18:12', '2022-05-18 11:27:40'),
(3, 1, 6, 5, '2022-05-18 11:32:45', '2022-05-22 17:00:31'),
(4, 1, 12, 0, '2022-05-22 13:36:27', '2022-05-24 19:04:35'),
(5, 1, 11, 5, '2022-05-22 17:00:26', '2022-05-22 17:00:26'),
(6, 1, 10, 5, '2022-05-22 17:00:26', '2022-05-22 17:00:26'),
(7, 1, 9, 5, '2022-05-22 17:00:28', '2022-05-22 17:00:28'),
(8, 1, 8, 0, '2022-05-22 17:00:28', '2022-05-24 19:04:35'),
(9, 1, 5, 5, '2022-05-22 17:00:32', '2022-05-22 17:00:32'),
(10, 2, 12, 3, '2022-05-23 17:40:56', '2022-05-23 17:59:14'),
(11, 2, 11, 1, '2022-05-23 17:40:58', '2022-05-23 17:40:58'),
(12, 2, 10, 1, '2022-05-23 17:41:00', '2022-05-23 17:41:00'),
(13, 2, 9, 1, '2022-05-23 17:41:02', '2022-05-23 17:41:02'),
(14, 2, 8, 1, '2022-05-23 17:41:04', '2022-05-23 17:41:04'),
(15, 2, 7, 0, '2022-05-23 17:41:06', '2022-05-23 17:41:06'),
(16, 2, 5, 0, '2022-05-23 17:41:08', '2022-05-23 17:41:08'),
(17, 3, 12, 0, '2022-05-23 18:12:01', '2022-05-23 18:12:01'),
(18, 3, 11, 1, '2022-05-23 18:12:03', '2022-05-23 18:12:03'),
(19, 3, 10, 0, '2022-05-23 18:12:04', '2022-05-23 18:12:04'),
(20, 3, 9, 0, '2022-05-23 18:12:06', '2022-05-23 18:12:06'),
(21, 3, 8, 1, '2022-05-23 18:12:07', '2022-05-23 18:14:20'),
(22, 3, 7, 0, '2022-05-23 18:12:08', '2022-05-23 18:12:08'),
(23, 3, 6, 0, '2022-05-23 18:12:09', '2022-05-23 18:12:09'),
(24, 3, 5, 0, '2022-05-23 18:12:11', '2022-05-23 18:12:11');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seats` int(11) DEFAULT NULL,
  `private_room` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `name`, `address`, `phone`, `seats`, `private_room`, `created_at`, `updated_at`) VALUES
(1, 'Chay Xanh Quận 2', '50 Lê Văn Thịnh, Phường Bình Trưng Đông, Quận 2, Thành Phố Thủ Đức', '0365003601', NULL, NULL, '2022-05-18 07:34:58', '2022-05-18 07:34:58'),
(2, 'Chay Xanh Gò Vấp', '12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh', '02838940390', NULL, NULL, '2022-05-18 07:36:53', '2022-05-18 07:36:53'),
(3, 'Chay Xanh Quận 1', '185/16 Phạm ngũ Lão, Quận 1', '0365003601', NULL, NULL, '2022-05-18 07:49:16', '2022-05-18 07:49:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` smallint(6) DEFAULT NULL,
  `store_id` smallint(6) DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `username`, `access_token`, `role_id`, `store_id`, `phone`, `address`) VALUES
(1, 'Lý Huỳnh Gia Thịnh', NULL, NULL, '$2y$10$IxeVOLkC3URHQ3xb/JmEGOI4Ow3Wb95pKbfv71TccwifUJO/P4Iae', NULL, '2022-05-18 07:24:13', '2022-05-18 07:24:13', 'thinh', '1|IbWTxMHWvuy5hPheuj8k3Si7zMqnhLwspVrBj11h', 1, NULL, '0946241392', NULL),
(2, 'Phạm Hoàng Sơn', NULL, NULL, '$2y$10$2iAkk.tQyH3nD4KSZxUxJevnz2ZuV0Q3vMr/NpiGgS.r7jyY8xKui', NULL, '2022-05-18 08:13:50', '2022-05-18 08:16:34', 'son', '2|jn1mP3AkaO5sP2h0RmIaYHumgO8Y5Pl2DzoP4YJN', 3, 1, '0360000001', NULL),
(3, 'Phạm Tùng Thiện', NULL, NULL, '$2y$10$FFcIIcgAvfLL7q2x60kHxuBw/zDnGbnhLsSfbH7lx60YQzfiiovlW', NULL, '2022-05-18 08:17:51', '2022-05-18 08:18:30', 'thien', '3|R7pta9FHdqw2pmdmYeyODLw8quVXGmKmGHAWxlqB', 2, 1, '0360000002', NULL),
(4, 'Nguyễn Thanh Khang', NULL, NULL, '$2y$10$7CbxvInXbjp8Uw4jFHkbfOL7T9oD7LGS.7Q22lB13nBiXC41BltY2', NULL, '2022-05-18 10:21:41', '2022-05-22 13:47:20', 'khang', '4|2hy6aCcc6lPkSCfFVELmHsE91hiPES0WH1zxYCgn', NULL, NULL, '0360000003', '4 Lê Lợi'),
(5, 'Ngô Thanh Sang', NULL, NULL, '$2y$10$hfWZgUuz2cTfvfZjk7Sabe5Uw6yOGTcynpTWO1vzFtw/6AKUIgppO', NULL, '2022-05-18 11:17:51', '2022-05-18 11:17:51', 'sang', '5|wwqVlCFj0Sk8E8xDMWrMdwQek1HfDFMKbK36Eren', 3, 2, '0360000004', NULL),
(6, 'thien1221', NULL, NULL, '$2y$10$0/Md.itqMyqhGAv.uxlxc.aA0wPvMlsE7QFl6W4KVjVqfo2.yzlOa', NULL, '2022-05-20 19:47:55', '2022-05-20 19:47:55', 'thien1221', '6|Y2x8crkv2nZh7eHfRjTSVhq4vA3ZAYwc0hEqmVpF', NULL, NULL, '012345678', NULL),
(7, 'admin', NULL, NULL, '$2y$10$qBFwB5pW.qItgTiQZFzUbu7MmORcFyB0bD94fC8FgP65BLPjhJ7TW', NULL, '2022-05-22 00:43:58', '2022-05-22 00:43:58', 'admin', '7|jijhZ5Cp7jGl2YRFyVU8JIPQ6NL5tWQsBmzQ1Kzv', 1, NULL, '0360000005', '123'),
(8, 'quanlyquan2', NULL, NULL, '$2y$10$YeB1ZccfDrqLMkmbUq9RpO2CHgHDoG1IZbEsmYJqcYHsRnzLNiNAO', NULL, '2022-05-22 13:24:34', '2022-05-22 13:24:34', 'ql2', '8|xOixB3wDIdMvJfMztQNOlS99O7jqHck5vB8KF292', 2, 1, '0110000001', NULL),
(9, 'qlgv', NULL, NULL, '$2y$10$KcKiosDsKUDiBPsNv5MG6es0EKT3eAyfrUDkd19BJrdB4XxopVTOm', NULL, '2022-05-23 17:40:26', '2022-05-23 17:40:27', 'qlgv', '9|vywHCQ3zrFhoiUodpXYpKoSuAZixYZrBrNZZlx7J', 2, 2, '0110000002', NULL),
(11, 'ql1', NULL, NULL, '$2y$10$5fdftoRnSH0hwS5pB5Og7efyDWYZ1RQPwxSCKW2K6MjnEUTW7.ewG', NULL, '2022-05-23 18:11:18', '2022-05-23 18:11:18', 'ql1', '11|HU8EusWzRHAobFtQcDXlHp1JmixWcuvYJNGvIgWw', 2, 3, '0110000003', NULL),
(12, 'nv1', NULL, NULL, '$2y$10$HXEN36bs/b52dp/MH7QfVO/Myf6T82mhL/yrLD6meVXcck4mvYLyu', NULL, '2022-05-23 18:13:02', '2022-05-23 18:13:02', 'nv1', '12|SjOnoa6Rb17EZf6VlXu7WiuhP1lcr7CTFVy2BvUa', 3, 3, '0110000004', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `foodsupplies`
--
ALTER TABLE `foodsupplies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `qtyfoods`
--
ALTER TABLE `qtyfoods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`) USING BTREE,
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foodsupplies`
--
ALTER TABLE `foodsupplies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `qtyfoods`
--
ALTER TABLE `qtyfoods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
