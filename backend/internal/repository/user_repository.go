package repository

import (
	"database/sql"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
)

func GetUsers() ([]model.User, error) {

	rows, err := database.DB.Query("SELECT id, username, email, '*****' AS password, role FROM userList")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	userList := make([]model.User, 0)

	for rows.Next() {
		var user model.User
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.Role)

		if err != nil {
			return nil, err
		}

		userList = append(userList, user)
	}

	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return userList, nil
}

func GetUserByID(id string) (model.User, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, email, '*****' AS password, role FROM userList WHERE id = ?")

	if err != nil {
		return model.User{}, err
	}

	users := model.User{}

	sqlErr := stmt.QueryRow(id).Scan(&users.Id, &users.Username, &users.Password, &users.Email, &users.Role)

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			return model.User{}, nil
		}
		return model.User{}, sqlErr
	}
	return users, nil
}

func AddUser(newUser model.User) error {
	newUser.Role = "user"

	_, err := database.DB.Exec("INSERT INTO userList (username, password, email, role) VALUES (?, ?, ?, ?)", newUser.Username, newUser.Password, newUser.Email, newUser.Role)

	if err != nil {
		return err
	}

	return nil
}
