-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.37-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para contabil-site
CREATE DATABASE IF NOT EXISTS `contabil-site` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `contabil-site`;

-- Copiando estrutura para tabela contabil-site.tb_banners
CREATE TABLE IF NOT EXISTS `tb_banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `subtitle` varchar(256) NOT NULL,
  `href` varchar(512) DEFAULT NULL,
  `photo` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela contabil-site.tb_banners: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_banners` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_banners` ENABLE KEYS */;

-- Copiando estrutura para tabela contabil-site.tb_contacts
CREATE TABLE IF NOT EXISTS `tb_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `message` text NOT NULL,
  `register` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela contabil-site.tb_contacts: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_contacts` ENABLE KEYS */;

-- Copiando estrutura para tabela contabil-site.tb_news
CREATE TABLE IF NOT EXISTS `tb_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `subtitle` varchar(256) NOT NULL,
  `text` text,
  `photo` varchar(512) DEFAULT NULL,
  `register` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news` (`author`),
  CONSTRAINT `fk_news` FOREIGN KEY (`author`) REFERENCES `tb_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela contabil-site.tb_news: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_news` DISABLE KEYS */;
INSERT INTO `tb_news` (`id`, `title`, `subtitle`, `text`, `photo`, `register`, `author`) VALUES
	(2, 'Teste', 'Teste', 'Teste', 'images/upload_f0a31348bca3446cbdde01de553c17ae.jpg', '2019-09-25 16:22:19', NULL),
	(3, 'Sua empresa em boas mãos 2', 'asc', 'asc', 'images/upload_9d6d095a5777aeb558496a0c0c8d2ec7.jpg', '2019-09-25 16:42:55', NULL),
	(4, 'Sua empresa em boas mãos 2', 'asc', 'asc', 'images/upload_11fb4dcaf82d2ff7a6200c3b4671c79d.jpg', '2019-09-25 16:43:18', NULL),
	(5, 'Sua empresa em boas mãos 2', 'asc', 'asc', 'images/upload_762f868095bd22e21a870ce37841d284.jpg', '2019-09-25 16:44:06', 1);
/*!40000 ALTER TABLE `tb_news` ENABLE KEYS */;

-- Copiando estrutura para tabela contabil-site.tb_users
CREATE TABLE IF NOT EXISTS `tb_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(512) NOT NULL,
  `photo` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela contabil-site.tb_users: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_users` DISABLE KEYS */;
INSERT INTO `tb_users` (`id`, `name`, `email`, `password`, `photo`) VALUES
	(1, 'Felipe Riboldi', 'feliperiboldimarques@gmail.com', '123', NULL);
/*!40000 ALTER TABLE `tb_users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
