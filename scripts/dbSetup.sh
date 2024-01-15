#!/bin/bash

set -e
set -o pipefail

MYSQL_ROOT_PASSWORD=root_password
DB_READER_USER=reader_user
DB_READER_PASSWORD=reader_password
DB_WRITER_USER=writer_user
DB_WRITER_PASSWORD=writer_password

DB_NAME=local_dev
DB_SHADOW_NAME=local_dev_shadow
DB_HOST=127.0.0.1

echo "Setting up development db..."

{ echo "CREATE DATABASE IF NOT EXISTS $DB_NAME; \
  CREATE DATABASE IF NOT EXISTS $DB_SHADOW_NAME; \
  CREATE USER IF NOT EXISTS $DB_READER_USER@'%' IDENTIFIED WITH mysql_native_password BY '$DB_READER_PASSWORD'; \
  CREATE USER IF NOT EXISTS $DB_WRITER_USER@'%' IDENTIFIED WITH mysql_native_password BY '$DB_WRITER_PASSWORD'; \
  GRANT SELECT ON $DB_NAME.* TO $DB_READER_USER@'%'; \
  GRANT ALL ON $DB_NAME.* TO $DB_WRITER_USER@'%'; \
  GRANT SELECT ON $DB_SHADOW_NAME.* TO $DB_READER_USER@'%'; \
  GRANT ALL ON $DB_SHADOW_NAME.* TO $DB_WRITER_USER@'%'; \
  GRANT SUPER ON *.* TO $DB_WRITER_USER@'%';" ; \
} | MYSQL_PWD=$MYSQL_ROOT_PASSWORD mysql -u root -h $DB_HOST

echo "Done"
