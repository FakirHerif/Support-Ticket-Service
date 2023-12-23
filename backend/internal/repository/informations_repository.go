package repository

import (
	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"

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

/* func GetInformationsWithResponses(informationsID int) (model.Informations, error) {
	var informations model.Informations
	if err := database.DB.Preload("Response").First(&informations, informationsID).Error; err != nil {
		return informations, err
	}
	return informations, nil
} */

/* func GetInformationsByID(id string) (model.Informations, error) {
	stmt, err := database.DB.Prepare("SELECT * FROM informationsList WHERE id = ?")

	if err != nil {
		return model.Informations{}, err
	}

	informations := model.Informations{}

	sqlErr := stmt.QueryRow(id).Scan(&informations.Id, &informations.FirstName, &informations.LastName, &informations.Age, &informations.IdentificationNo, &informations.Address, &informations.City, &informations.Town, &informations.Phone, &informations.Attachments, &informations.Title, &informations.Content, &informations.ReferenceID, &informations.Status, &informations.CreatedDate)

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			return model.Informations{}, nil
		}
		return model.Informations{}, sqlErr
	}
	return informations, nil
}

func AddInformations(newInformations model.Informations) error {

	referenceID := uuid.New().String()

	newInformations.ReferenceID = referenceID
	newInformations.Status = "cevap bekliyor"
	newInformations.CreatedDate = time.Now().Format("02.01.2006 15:04:05")

	_, err := database.DB.Exec("INSERT INTO informationsList (firstName, lastName, age, identificationNo, address, city, town, phone, attachments, title, content, referenceID, status, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)", newInformations.FirstName, newInformations.LastName, newInformations.Age, newInformations.IdentificationNo, newInformations.Address, newInformations.City, newInformations.Town, newInformations.Phone, newInformations.Attachments, newInformations.Title, newInformations.Content, newInformations.ReferenceID, newInformations.Status, newInformations.CreatedDate)

	if err != nil {
		return err
	}

	return nil
}

func UpdateInformationsByID(byInformations model.Informations, id int) error {
	var count int
	err := database.DB.QueryRow("SELECT COUNT(*) FROM informationsList WHERE id = ?", id).Scan(&count)
	if err != nil {
		return err
	}

	if count == 0 {
		return fmt.Errorf("record with ID %d not found", id)
	}

	_, err = database.DB.Exec("UPDATE informationsList SET firstName = ?, lastName = ?, age = ?, identificationNo = ?, address = ?, city = ?, town = ?, phone = ?, attachments = ?, title = ?, content = ?, status = ?, referenceID = ? WHERE id = ?", byInformations.FirstName, byInformations.LastName, byInformations.Age, byInformations.IdentificationNo, byInformations.Address, byInformations.City, byInformations.Town, byInformations.Phone, byInformations.Attachments, byInformations.Title, byInformations.Content, byInformations.Status, byInformations.ReferenceID, id)

	return err
}

func DeleteInformationsByID(informationsId int) (bool, error) {
	tx, err := database.DB.Begin()

	if err != nil {
		return false, err
	}

	var count int
	err = database.DB.QueryRow("SELECT COUNT(*) FROM informationsList WHERE id = ?", informationsId).Scan(&count)
	if err != nil {
		return false, err
	}

	if count == 0 {
		tx.Rollback()
		return false, err
	}

	stmt, err := database.DB.Prepare("DELETE from informationsList WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(informationsId)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}
*/
