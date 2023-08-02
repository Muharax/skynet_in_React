-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2023 at 03:12 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skynet`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(55) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `pin` int(11) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `imie` varchar(55) NOT NULL,
  `nazwisko` varchar(55) NOT NULL,
  `adresZamieszkania` varchar(111) NOT NULL,
  `adresKorespondencyjny` varchar(111) NOT NULL,
  `dataUrodzenia` datetime NOT NULL,
  `pesel` varchar(55) NOT NULL,
  `dataLogowania` datetime DEFAULT NULL,
  `iloscLogowan` int(11) DEFAULT 0,
  `role` varchar(10) DEFAULT NULL,
  `userBlock` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user`, `pass`, `pin`, `token`, `imie`, `nazwisko`, `adresZamieszkania`, `adresKorespondencyjny`, `dataUrodzenia`, `pesel`, `dataLogowania`, `iloscLogowan`, `role`, `userBlock`) VALUES
(1, 'ADMIN11', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', 777, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwidXNlciI6IkFETUlOMTEiLCJpYXQiOjE2OTA4Nzg4NjZ9.XtG8mRwu2vP88FijFGz6rxTVvgDI1OVfQHYhKgCB6DM', '', '', '', '', '0000-00-00 00:00:00', '', '2023-08-01 10:34:26', 12, 'admin', 0),
(2, 'ADMIN111', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluMiIsInVzZXIiOiJBRE1JTjExMSIsImlhdCI6MTY5MDg1NjcyNH0.3wmTeFnQKDe9AhJsiwOpmo6y3vezz4RB_DLsf8THIpU', '', '', '', '', '0000-00-00 00:00:00', '', '2023-08-01 04:25:24', NULL, 'admin2', 0),
(3, 'ADMIN1', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '0000-00-00 00:00:00', '', NULL, NULL, NULL, 0),
(4, '01585', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '0000-00-00 00:00:00', '', NULL, NULL, NULL, 0),
(1101, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0),
(1103, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0),
(1104, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0),
(1105, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0),
(1107, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0),
(1108, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0),
(1109, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0),
(1110, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0),
(1111, 'TEST', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, '', '', '', '', '', '2023-08-22 00:02:32', '', NULL, NULL, NULL, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1112;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
