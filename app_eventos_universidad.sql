-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-04-2023 a las 22:41:57
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_eventos_universidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `url_imagen` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `lugar` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `organizador` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `participantes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`participantes`)),
  `registro` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `total_asientos` int(11) NOT NULL,
  `disponibilidad_asientos` int(11) NOT NULL,
  `duracion` time NOT NULL,
  `limite_edad` int(11) NOT NULL,
  `valoracion` decimal(4,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_categorias`
--

CREATE TABLE `eventos_categorias` (
  `id_eventos_categorias` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_comentarios`
--

CREATE TABLE `eventos_comentarios` (
  `id` int(11) NOT NULL,
  `evento_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `comentario` varchar(1000) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_etiquetas`
--

CREATE TABLE `eventos_etiquetas` (
  `id_evento_etiqueta` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `id_etiqueta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_favoritos`
--

CREATE TABLE `eventos_favoritos` (
  `id_evento_favorito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `fecha_agregado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_tipos`
--

CREATE TABLE `eventos_tipos` (
  `id_evento_tipo` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_valoraciones`
--

CREATE TABLE `eventos_valoraciones` (
  `id_evento` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `valoracion` int(11) NOT NULL,
  `comentario` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `fecha_valoracion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario_emisor` int(11) NOT NULL,
  `titulo` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `imagen` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `tipo_notificacion` enum('nuevo evento','mensaje recibido','opinion','otro') COLLATE utf8mb4_spanish_ci NOT NULL,
  `prioridad` enum('alta','media','baja') COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones_receptores`
--

CREATE TABLE `notificaciones_receptores` (
  `id_notificacion` int(11) NOT NULL,
  `id_usuario_receptor` int(11) NOT NULL,
  `leida` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recordatorios`
--

CREATE TABLE `recordatorios` (
  `id` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_recordatorio` datetime NOT NULL,
  `mensaje` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_de_usuarios_en_eventos`
--

CREATE TABLE `registro_de_usuarios_en_eventos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `tipo` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descripcion` varchar(800) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tickets_disponibles` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellido` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `genero` set('masculino','femenino') COLLATE utf8mb4_spanish_ci NOT NULL,
  `cedula` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `username` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `recibir_notificaciones` tinyint(1) NOT NULL,
  `url_avatar` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `verificado` tinyint(1) NOT NULL DEFAULT 0,
  `rol` enum('estudiante','profesor','admin') COLLATE utf8mb4_spanish_ci NOT NULL,
  `permisos` set('crear_evento','editar_evento','eliminar_evento') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos_categorias`
--
ALTER TABLE `eventos_categorias`
  ADD PRIMARY KEY (`id_eventos_categorias`),
  ADD KEY `id_evento` (`id_evento`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `eventos_comentarios`
--
ALTER TABLE `eventos_comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evento_id` (`evento_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `eventos_etiquetas`
--
ALTER TABLE `eventos_etiquetas`
  ADD PRIMARY KEY (`id_evento_etiqueta`),
  ADD KEY `id_evento` (`id_evento`),
  ADD KEY `id_etiqueta` (`id_etiqueta`);

--
-- Indices de la tabla `eventos_favoritos`
--
ALTER TABLE `eventos_favoritos`
  ADD PRIMARY KEY (`id_evento_favorito`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_evento` (`id_evento`);

--
-- Indices de la tabla `eventos_tipos`
--
ALTER TABLE `eventos_tipos`
  ADD PRIMARY KEY (`id_evento_tipo`),
  ADD KEY `id_evento` (`id_evento`),
  ADD KEY `id_tipo` (`id_tipo`);

--
-- Indices de la tabla `eventos_valoraciones`
--
ALTER TABLE `eventos_valoraciones`
  ADD PRIMARY KEY (`id_evento`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario_emisor` (`id_usuario_emisor`);

--
-- Indices de la tabla `notificaciones_receptores`
--
ALTER TABLE `notificaciones_receptores`
  ADD PRIMARY KEY (`id_notificacion`,`id_usuario_receptor`),
  ADD KEY `id_usuario_receptor` (`id_usuario_receptor`);

--
-- Indices de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_evento` (`id_evento`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `registro_de_usuarios_en_eventos`
--
ALTER TABLE `registro_de_usuarios_en_eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_evento` (`id_evento`),
  ADD KEY `id_ticket` (`id_ticket`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_evento` (`id_evento`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_categorias`
--
ALTER TABLE `eventos_categorias`
  MODIFY `id_eventos_categorias` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_comentarios`
--
ALTER TABLE `eventos_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_etiquetas`
--
ALTER TABLE `eventos_etiquetas`
  MODIFY `id_evento_etiqueta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_favoritos`
--
ALTER TABLE `eventos_favoritos`
  MODIFY `id_evento_favorito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_tipos`
--
ALTER TABLE `eventos_tipos`
  MODIFY `id_evento_tipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro_de_usuarios_en_eventos`
--
ALTER TABLE `registro_de_usuarios_en_eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos`
--
ALTER TABLE `tipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventos_categorias`
--
ALTER TABLE `eventos_categorias`
  ADD CONSTRAINT `eventos_categorias_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eventos_categorias_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `eventos_comentarios`
--
ALTER TABLE `eventos_comentarios`
  ADD CONSTRAINT `eventos_comentarios_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eventos_comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `eventos_etiquetas`
--
ALTER TABLE `eventos_etiquetas`
  ADD CONSTRAINT `eventos_etiquetas_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eventos_etiquetas_ibfk_2` FOREIGN KEY (`id_etiqueta`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `eventos_favoritos`
--
ALTER TABLE `eventos_favoritos`
  ADD CONSTRAINT `eventos_favoritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eventos_favoritos_ibfk_2` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `eventos_tipos`
--
ALTER TABLE `eventos_tipos`
  ADD CONSTRAINT `eventos_tipos_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eventos_tipos_ibfk_2` FOREIGN KEY (`id_tipo`) REFERENCES `tipos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `eventos_valoraciones`
--
ALTER TABLE `eventos_valoraciones`
  ADD CONSTRAINT `eventos_valoraciones_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eventos_valoraciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_usuario_emisor`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificaciones_receptores`
--
ALTER TABLE `notificaciones_receptores`
  ADD CONSTRAINT `notificaciones_receptores_ibfk_1` FOREIGN KEY (`id_notificacion`) REFERENCES `notificaciones` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificaciones_receptores_ibfk_2` FOREIGN KEY (`id_usuario_receptor`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD CONSTRAINT `recordatorios_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recordatorios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `registro_de_usuarios_en_eventos`
--
ALTER TABLE `registro_de_usuarios_en_eventos`
  ADD CONSTRAINT `registro_de_usuarios_en_eventos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `registro_de_usuarios_en_eventos_ibfk_2` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `registro_de_usuarios_en_eventos_ibfk_3` FOREIGN KEY (`id_ticket`) REFERENCES `tickets` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
