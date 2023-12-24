package auth

import (
	"errors"
	"fmt"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
	"gorm.io/gorm"
)

func GetUserByUsername(username, password string) (model.User, error) {
	var user model.User

	result := database.DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return user, errors.New("user not found")
		}
		return user, fmt.Errorf("error retrieving user data: %v", result.Error)
	}

	if user.Password != password {
		return user, errors.New("wrong password")
	}

	return user, nil
}
