package repository

import (
	"errors"
	"fmt"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
	"gorm.io/gorm"
)

func GetUsers() ([]model.User, error) {
	var userList []model.User
	if err := database.DB.Select("id, username, email, '*****' AS password, role").Find(&userList).Error; err != nil {
		return nil, err
	}

	return userList, nil
}

func GetUserByID(id string) (model.User, error) {
	var user model.User
	result := database.DB.Raw("SELECT id, username, email, '*****' AS password, role FROM userList WHERE id = ?", id).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return model.User{}, fmt.Errorf("record with ID %s not found", id)
		}
		return model.User{}, result.Error
	}
	return user, nil
}

func AddUser(newUser model.User) error {

	var existingUser model.User

	// Check if the username already exists
	if err := database.DB.Where("username = ?", newUser.Username).First(&existingUser).Error; err == nil {
		return errors.New("username is already taken")
	}

	// Check if the email already exists
	if err := database.DB.Where("email = ?", newUser.Email).First(&existingUser).Error; err == nil {
		return errors.New("email is already in use")
	}
	newUser.Role = "user"

	result := database.DB.Omit("id").Create(&newUser)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func UpdateUserByID(byUser model.User, id int) error {
	result := database.DB.Model(&model.User{}).Where("id = ?", id).Select("username", "password", "email", "role").Updates(byUser)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("record with ID %d not found", id)
	}

	return nil
}

func DeleteUserByID(userId int) error {
	var user model.User
	result := database.DB.Where("id = ?", userId).First(&user)

	if result.RowsAffected == 0 {
		return fmt.Errorf("record with ID %d not found", userId)
	}

	if err := database.DB.Delete(&user).Error; err != nil {
		return err
	}

	return nil
}
