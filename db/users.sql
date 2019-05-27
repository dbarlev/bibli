-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2019 at 08:07 AM
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
('2019-04-28 07:13:52', 9, 54, 'dav', 'davdav', '954472', 'dav55@gmail.com', 0, '881124e4caa3b633fec2ce301a2d0f5a', 1, 0),
('2019-04-28 07:18:59', 9, 55, 'dav', 'dav', '954472', 'dav98@aaa.aaa', 2, 'a760a442954a65c3e03003ab5c1683e9', 1, 0),
('2019-04-16 07:33:12', 9, 56, 'dav', 'dav222', '954472', 'dav97@aaa.aaa', 3, 'af41e11c435165c89df760cc6f005809', 0, 0),
('2019-04-28 12:22:32', 9, 57, 'dav', 'davids', '954472', 'dav91@aaa.aaa', 1, 'd94f857987586475f740f636c3bea736', 0, 0),
('2019-04-28 12:55:00', 9, 58, 'dav', 'davids', '954472', 'dav97@aaaaaa', 1, '99349ebb426ee2d7b39a9abe976a423f', 0, 0),
('2019-04-28 13:58:56', 9, 59, 'dav', '', '', '', 0, 'a4a9cce601d3acc95752e1dc99d7a402', 0, 0),
('2019-04-30 06:19:54', 9, 60, 'dav', 'davids', '954472', 'dav99@aaa.aaa', 1, 'bf0d57f032d0e3bff4cfdc438225f414', 0, 0),
('2019-04-30 06:21:01', 9, 61, 'dav', 'davids', '954472', 'dav100@aaa.aaa', 1, '91d57b5b9d33dd25fdeef3fee198f4fd', 0, 0),
('2019-05-01 05:36:07', 9, 62, 'dav', 'davids', '954472', 'davseveloff@gmail.com', 1, 'd1ea97fbc587d0a24bfb9df5d632883f', 0, 0),
('2019-05-12 11:47:42', 9, 63, 'dav', 'davids', '954472', 'dav907@aaa.aaa', 1, '8f82f5bdfb0ba72f6337ead50ad18563', 0, 0),
('2019-05-12 12:18:28', 9, 64, 'dav', 'davids', '954472', 'dav9s07@aaa.aaa', 1, '27efc59e8140f83e812d2a5ba5f1e8ff', 0, 0),
('2019-05-12 12:18:39', 9, 65, 'dav', 'davids', '954472', 'davs9s07@aaa.aaa', 1, '5d97f5c497d1b3ad563580f8c6320344', 0, 0),
('2019-05-12 14:04:11', 9, 66, 'dav', 'davids', '954472', 'dasv97@aaa.aaa', 1, 'dadfea606c286606289e5b70c29a307d', 0, 0),
('2019-05-12 14:07:58', 9, 67, 'dav', 'davids', '954472', 'dassv97@aaa.aaa', 1, '541adaefe48fa1a1c3b2398a3d07d45f', 0, 0),
('2019-05-12 14:10:39', 9, 68, 'dav', '', '', 'dssav97@aaa.aaa', 0, '25a5bfc94d6b341f4cead946c8285679', 0, 0),
('2019-05-14 06:19:27', 9, 69, 'dav', '', '', 'sasdasd@ss', 0, '579166e7abd91d318439cece51e16afe', 0, 0),
('2019-05-21 05:32:07', 9, 70, NULL, 'davids', '123123', 'dav1001@aaa.aaa', 2, 'd4dde070e2d7246de5fd77148855e068', 0, 0);

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
  MODIFY `userid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
