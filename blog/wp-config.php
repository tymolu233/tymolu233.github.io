<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp' );

/** Database username */
define( 'DB_USER', 'wp' );

/** Database password */
define( 'DB_PASSWORD', 'password' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '.x$JosvcoXf8eq.12N:GZ1+Kxe+h0_Z@z_^$l@6yJY2lJR(O:LbL]H$Hpa,V2Zk*' );
define( 'SECURE_AUTH_KEY',  '2neI:mfDuhC_H6Y1:is2H=4[1 rI?m{dTD.`@iwE4+r6suH)prQ-8+PVgO+Nigpt' );
define( 'LOGGED_IN_KEY',    '&l0`89%JAI>CV|6)V$d?}6z?W!-~j-&!+Nu[m9R}o@J,mrV1mO]D k*_o-16GKao' );
define( 'NONCE_KEY',        '3F&-L<>iR^42V<{keZ[J`<YPhVY4n~]&u1sIh[^wMe%#[5{Y>60oqDu:LqUTEXCJ' );
define( 'AUTH_SALT',        '_y+*07G]8mCoy`*s88a3+@y9Freo0KS#MG   XBUNeM;/3gCtrpK2hR52Q!0<[E|' );
define( 'SECURE_AUTH_SALT', 'xg>P9*uEwpcLhC[e8mQiMg>>T]1c$/6SzagPW)3pY*D<O!m9BK89bZll8gZ98ggM' );
define( 'LOGGED_IN_SALT',   'I[;?>vLBcGSN;UAQvg1bqF]7MTzb^R}/:-xFN|WihA%@(Jpc4V^dcLepSdd_X4X4' );
define( 'NONCE_SALT',       'UN|rB`*$EF%GT{]r$lF59(<)h|<,(|FK>K-ELjpdUB~z4YykG_.P6S<r@:#7WC19' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
