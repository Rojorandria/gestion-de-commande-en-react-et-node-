-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 01 Août 2022 à 19:01
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `zebu_madagascar`
--

-- --------------------------------------------------------

--
-- Structure de la table `bonus`
--

CREATE TABLE IF NOT EXISTS `bonus` (
  `numbonus` int(11) NOT NULL AUTO_INCREMENT,
  `num_vend` int(11) NOT NULL,
  `ref_cat` int(11) NOT NULL,
  `prix_bon` int(11) NOT NULL,
  PRIMARY KEY (`numbonus`),
  KEY `num_vend` (`num_vend`),
  KEY `ref_cat` (`ref_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE IF NOT EXISTS `categorie` (
  `refcat` int(11) NOT NULL AUTO_INCREMENT,
  `nomcat` varchar(100) NOT NULL,
  `taille` varchar(50) NOT NULL,
  `prix` int(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `refproduit` int(11) NOT NULL,
  PRIMARY KEY (`refcat`),
  KEY `refproduit` (`refproduit`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `categorie`
--

INSERT INTO `categorie` (`refcat`, `nomcat`, `taille`, `prix`, `image`, `refproduit`) VALUES
(1, 'robe adulte', 'Xl', 45000, 'image/robe.jpg', 4),
(3, 'Short joggin', 'M', 35000, 'image/short.jpg', 6);

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `numcli` int(11) NOT NULL AUTO_INCREMENT,
  `nomcli` varchar(100) DEFAULT NULL,
  `prenomcli` varchar(100) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`numcli`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Contenu de la table `client`
--

INSERT INTO `client` (`numcli`, `nomcli`, `prenomcli`, `adresse`, `telephone`) VALUES
(2, 'TENDRINANTENAINA', 'Joela', 'Antananarivo', '0341258751'),
(6, 'rakoto', 'Francois', 'uaf', '0342145875'),
(7, 'FENOMPITIA', 'Faliniaina', 'Fianarantsoa', '0341557562'),
(8, 'MAMINIANA', 'Roel', 'tana', '034214587'),
(10, 'RAKOTO', 'Maminirina', 'Fianarantsoa', '034789875'),
(11, '', 'KOTO', '', ''),
(12, '', 'Diary', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE IF NOT EXISTS `commande` (
  `numcom` int(11) NOT NULL AUTO_INCREMENT,
  `qtecom` int(11) NOT NULL,
  `datecom` varchar(50) NOT NULL,
  `numclient` int(11) NOT NULL,
  `refproduit` int(11) NOT NULL,
  `refcategorie` int(11) NOT NULL,
  PRIMARY KEY (`numcom`),
  KEY `numclient` (`numclient`),
  KEY `refproduit` (`refproduit`),
  KEY `refcategorie` (`refcategorie`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `commande`
--

INSERT INTO `commande` (`numcom`, `qtecom`, `datecom`, `numclient`, `refproduit`, `refcategorie`) VALUES
(6, 4, '2022-06-29', 8, 6, 3),
(8, 3, '2022-07-18', 8, 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `commande_livrer`
--

CREATE TABLE IF NOT EXISTS `commande_livrer` (
  `numcomlivr` int(11) NOT NULL AUTO_INCREMENT,
  `num_com` int(11) NOT NULL,
  `num_client` int(11) NOT NULL,
  `nom_cli` varchar(100) NOT NULL,
  `prenom_cli` varchar(100) NOT NULL,
  `adresse_cli` varchar(100) NOT NULL,
  `telephone_cli` varchar(50) NOT NULL,
  `nom_prod` varchar(100) NOT NULL,
  `nom_cat` varchar(100) NOT NULL,
  `taill_cat` varchar(100) NOT NULL,
  `qte_cat` int(11) NOT NULL,
  `prix_cat` int(11) NOT NULL,
  `total_com` int(11) NOT NULL,
  `date_cat` varchar(100) NOT NULL,
  PRIMARY KEY (`numcomlivr`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `commande_livrer`
--

INSERT INTO `commande_livrer` (`numcomlivr`, `num_com`, `num_client`, `nom_cli`, `prenom_cli`, `adresse_cli`, `telephone_cli`, `nom_prod`, `nom_cat`, `taill_cat`, `qte_cat`, `prix_cat`, `total_com`, `date_cat`) VALUES
(1, 4, 8, 'MAMINIANA', 'Roel', 'tana', '034214587', 'Short joggin homme', 'Short joggin', 'M', 2, 35000, 70000, '2022-06-27'),
(2, 9, 8, 'MAMINIANA', 'Roel', 'tana', '034214587', 'Robe', 'robe', 'Xl', 3, 45000, 135000, '2022-06-27'),
(3, 1, 2, 'TENDRINANTENAINA', 'Joela', 'Antananarivo', '0341258751', 'Robe adulte', 'robe adulte', 'Xl', 2, 45000, 90000, '2022-06-27'),
(4, 5, 12, '', 'Diary', '', '', 'Robe adulte', 'robe adulte', 'Xl', 2, 45000, 90000, '2022-06-29');

-- --------------------------------------------------------

--
-- Structure de la table `commande_passer`
--

CREATE TABLE IF NOT EXISTS `commande_passer` (
  `numcompass` int(11) NOT NULL AUTO_INCREMENT,
  `num_livr` int(11) NOT NULL,
  `nom_livr` varchar(100) NOT NULL,
  `prenom_livr` varchar(100) NOT NULL,
  `telephone_livr` varchar(50) NOT NULL,
  `ref_comande` int(11) NOT NULL,
  `num_client` int(11) NOT NULL,
  `nom_client` varchar(100) NOT NULL,
  `prenom_client` varchar(100) NOT NULL,
  `adrresse_client` varchar(100) NOT NULL,
  `phone_client` varchar(100) NOT NULL,
  `nom_produit` varchar(100) NOT NULL,
  `nom_categorie` varchar(100) NOT NULL,
  `taille_categporie` varchar(50) NOT NULL,
  `prix_categorie` int(50) NOT NULL,
  `qte_commande` int(11) NOT NULL,
  `totale_commande` int(50) NOT NULL,
  `date_commande` varchar(100) NOT NULL,
  PRIMARY KEY (`numcompass`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `commande_passer`
--

INSERT INTO `commande_passer` (`numcompass`, `num_livr`, `nom_livr`, `prenom_livr`, `telephone_livr`, `ref_comande`, `num_client`, `nom_client`, `prenom_client`, `adrresse_client`, `phone_client`, `nom_produit`, `nom_categorie`, `taille_categporie`, `prix_categorie`, `qte_commande`, `totale_commande`, `date_commande`) VALUES
(1, 1, 'TSARATIANA', 'Jean AimÃ©', '0347809856', 7, 8, 'MAMINIANA', 'Roel', 'tana', '034214587', 'Robe', 'robe', 'Xl', 45000, 2, 90000, '2022-06-29');

-- --------------------------------------------------------

--
-- Structure de la table `livreur`
--

CREATE TABLE IF NOT EXISTS `livreur` (
  `numlivr` int(11) NOT NULL AUTO_INCREMENT,
  `nomlivr` varchar(100) NOT NULL,
  `prenomlivr` varchar(100) NOT NULL,
  `telephone` varchar(50) NOT NULL,
  `imagelivr` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`numlivr`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `livreur`
--

INSERT INTO `livreur` (`numlivr`, `nomlivr`, `prenomlivr`, `telephone`, `imagelivr`) VALUES
(1, 'TSARATIANA', 'Jean AimÃ©', '0347809856', 'image/user.png'),
(2, 'VELOMPANATENAINA ', 'Faratiana Mamelona Vanessa ', '0341258796', 'image/Contacts.png');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE IF NOT EXISTS `produits` (
  `refprod` int(11) NOT NULL AUTO_INCREMENT,
  `nomprod` varchar(50) NOT NULL,
  PRIMARY KEY (`refprod`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Contenu de la table `produits`
--

INSERT INTO `produits` (`refprod`, `nomprod`) VALUES
(1, 'Polo'),
(2, 'Tee-shirt Adulte'),
(3, 'Tee-shirt enfant'),
(4, 'Robe adulte'),
(5, 'Robe enfant'),
(6, 'Short joggin homme'),
(7, 'Short jogging femme'),
(8, 'short jogging enfant'),
(9, 'Short plage homme'),
(10, 'Short plage femme'),
(11, 'Short zebu'),
(12, 'Tee-shirt bord cote Adulte'),
(13, 'Tee-shirt bord cote enfant'),
(14, 'debardeur adulte'),
(15, 'debardeur enfants'),
(16, 'satroka bob');

-- --------------------------------------------------------

--
-- Structure de la table `reffact`
--

CREATE TABLE IF NOT EXISTS `reffact` (
  `reffac` int(11) NOT NULL AUTO_INCREMENT,
  `nuum` int(11) NOT NULL,
  PRIMARY KEY (`reffac`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `reffact`
--

INSERT INTO `reffact` (`reffac`, `nuum`) VALUES
(1, 8),
(2, 8),
(3, 8),
(4, 8);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'zebu', '', 'zebu'),
(2, 'admin', 'admin@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'),
(3, 'zebu', 'zebu@gmail.com', '178ad192ba6f468de6ab1534a0fa7ac2ee9ff5cca711fb2a551034e6e1df4bda');

-- --------------------------------------------------------

--
-- Structure de la table `vendeur`
--

CREATE TABLE IF NOT EXISTS `vendeur` (
  `numvend` int(11) NOT NULL AUTO_INCREMENT,
  `nomvend` varchar(100) NOT NULL,
  `prenomvend` varchar(100) NOT NULL,
  `telephone` varchar(50) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`numvend`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `vendeur`
--

INSERT INTO `vendeur` (`numvend`, `nomvend`, `prenomvend`, `telephone`, `image`) VALUES
(1, 'NJARATIANA', 'Mariel', '0345890345', 'image/user.png');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `bonus`
--
ALTER TABLE `bonus`
  ADD CONSTRAINT `bonus_ibfk_1` FOREIGN KEY (`num_vend`) REFERENCES `vendeur` (`numvend`),
  ADD CONSTRAINT `bonus_ibfk_2` FOREIGN KEY (`ref_cat`) REFERENCES `categorie` (`refcat`);

--
-- Contraintes pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD CONSTRAINT `categorie_ibfk_1` FOREIGN KEY (`refproduit`) REFERENCES `produits` (`refprod`);

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`numclient`) REFERENCES `client` (`numcli`),
  ADD CONSTRAINT `commande_ibfk_2` FOREIGN KEY (`refproduit`) REFERENCES `produits` (`refprod`),
  ADD CONSTRAINT `commande_ibfk_3` FOREIGN KEY (`refcategorie`) REFERENCES `categorie` (`refcat`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
