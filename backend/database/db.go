package database

import (
	"database/sql"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

func ConnectDatabase(filePath string) error {
	db, err := sql.Open("sqlite", filePath)
	if err != nil {
		return err
	}

	DB = db
	return nil
}
