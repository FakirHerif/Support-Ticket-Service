package repository

import (
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"time"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
	"github.com/google/uuid"

	"gorm.io/gorm"
)

func GetInformations() ([]model.Informations, error) {
	var informationsList []model.Informations
	result := database.DB.Preload("Response").Find(&informationsList)
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		return nil, result.Error
	}

	return informationsList, nil
}

func GetInformationsByID(id string) (model.Informations, error) {
	var informations model.Informations
	result := database.DB.Preload("Response").Where("id = ?", id).First(&informations)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return model.Informations{}, fmt.Errorf("record with ID %s not found", id)
		}
		return model.Informations{}, result.Error
	}
	return informations, nil
}

func GetInformationsByReferenceID(referenceID string) (model.Informations, error) {
	var informations model.Informations
	result := database.DB.Preload("Response").Where("referenceID = ?", referenceID).Find(&informations)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return model.Informations{}, fmt.Errorf("record with ID %s not found", referenceID)
		}
		return model.Informations{}, result.Error
	}
	return informations, nil
}

func AddInformations(formData struct {
	JSONData model.Informations    `form:"jsonData" binding:"required"`
	File     *multipart.FileHeader `form:"file"`
}) (string, error) {
	jsonData := formData.JSONData

	if formData.File != nil {
		file, err := formData.File.Open()
		if err != nil {
			return "", err
		}
		defer file.Close()

		// Dosyayı oku ve byte dizisine dönüştür
		fileBytes, err := io.ReadAll(file)
		if err != nil {
			return "", err
		}

		// Dosyayı Informations yapısına ekle (Attachments alanına)
		jsonData.Attachments = fileBytes
	}

	referenceID := uuid.New().String()
	jsonData.ReferenceID = referenceID
	jsonData.Status = "cevap bekliyor"
	jsonData.CreatedDate = time.Now().Format("02.01.2006 15:04:05")

	if jsonData.InformationsOwner != nil && *jsonData.InformationsOwner == "" {
		var emptyString string
		jsonData.InformationsOwner = &emptyString
	}

	result := database.DB.Omit("id").Create(&jsonData)
	if result.Error != nil {
		return "", result.Error
	}

	return referenceID, nil
}

func UpdateInformationsByID(byInformations model.Informations, id int) error {
	result := database.DB.Model(&model.Informations{}).Where("id = ?", id).Select("firstName", "lastName", "age", "identificationNo", "address", "city", "town", "phone", "title", "content", "status").Updates(byInformations)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("record with ID %d not found", id)
	}

	return nil
}

func DeleteInformationsByID(informationsId int) error {
	var informations model.Informations
	result := database.DB.Where("id = ?", informationsId).First(&informations)

	if result.RowsAffected == 0 {
		return fmt.Errorf("record with ID %d not found", informationsId)
	}

	if err := database.DB.Delete(&informations).Error; err != nil {
		return err
	}

	return nil
}
