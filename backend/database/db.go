package database

import (
	"database/sql"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

func ConnectDatabase() error {
	db, err := sql.Open("sqlite", "./database.db")
	if err != nil {
		return err
	}

	DB = db
	return nil
}
