-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2019 at 08:20 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bibli`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usertype` int(11) NOT NULL,
  `userid` int(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `subscription` int(11) NOT NULL,
  `verification_code` text NOT NULL,
  `active` int(1) NOT NULL,
  `regtime` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`time`, `usertype`, `userid`, `name`, `username`, `password`, `email`, `subscription`, `verification_code`, `active`, `regtime`) VALUES
('2019-01-21 16:02:07', 9, 50, 'dav', 'davids', '954472', 'lanco26@walla.co.il', 0, '380000f6c062044528319671492e919e', 1, 0),
('2019-02-03 13:16:59', 9, 51, 'dav', 'davids', '954472', 'lanco30@walla.co.il', 0, 'b9a493368ce5fd728ac98a3982376491', 0, 0),
('2019-02-03 13:34:56', 9, 52, 'dav', 'davids', '954472', 'lanco31@walla.co.il', 0, 'ccabd042e4dd80df6942907a8611f225', 0, 0),
('2019-02-03 13:37:22', 9, 53, 'dav', 'davids', '954472', 'lanco32@walla.co.il', 0, '8386f98812591649806436e4d23870ba', 0, 0),
('2019-04-16 06:14:52', 9, 54, 'dav', 'davdav', '954472', 'dav55@gmail.com', 0, '881124e4caa3b633fec2ce301a2d0f5a', 0, 0),
('2019-04-16 07:31:54', 9, 55, 'dav', 'dav', '954472', 'dav98@aaa.aaa', 2, 'a760a442954a65c3e03003ab5c1683e9', 0, 0),
('2019-04-16 07:33:12', 9, 56, 'dav', 'dav222', '954472', 'dav97@aaa.aaa', 3, 'af41e11c435165c89df760cc6f005809', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
