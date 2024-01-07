package repository

import (
	"errors"
	"fmt"
	"time"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
	"gorm.io/gorm"
)

func GetResponse() ([]model.Response, error) {
	var responseList []model.Response
	if err := database.DB.Find(&responseList).Error; err != nil {
		return nil, err
	}
	return responseList, nil
}

func GetResponseByID(id string) (model.Response, error) {
	var response model.Response
	result := database.DB.Where("id = ?", id).First(&response)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return model.Response{}, fmt.Errorf("record with ID %s not found", id)
		}
		return model.Response{}, result.Error
	}
	return response, nil
}

func AddResponse(newResponse model.Response) (int, error) {
	newResponse.ReplyDate = time.Now().Format("02.01.2006 15:04:05")

	result := database.DB.Omit("id").Create(&newResponse)
	if result.Error != nil {
		return 0, result.Error
	}
	return newResponse.Id, nil
}

func UpdateResponseByID(byResponse model.Response, id int) error {
	result := database.DB.Model(&model.Response{}).Where("id = ?", id).Select("informationsId", "responseText").Updates(byResponse)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("record with ID %d not found", id)
	}

	return nil
}

func DeleteResponseByID(responseId int) error {
	var response model.Response
	result := database.DB.Where("id = ?", responseId).First(&response)

	if result.RowsAffected == 0 {
		return fmt.Errorf("record with ID %d not found", responseId)
	}

	if err := database.DB.Delete(&response).Error; err != nil {
		return err
	}

	return nil
}
