package repository

import (
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
