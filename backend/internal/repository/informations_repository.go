package repository

import (
	"database/sql"
	"time"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
)

func GetInformations() ([]model.Informations, error) {

	rows, err := database.DB.Query("SELECT * FROM informationsList")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	informationsList := make([]model.Informations, 0)

	for rows.Next() {
		singleInformations := model.Informations{}
		err = rows.Scan(&singleInformations.Id, &singleInformations.FirstName, &singleInformations.LastName, &singleInformations.Age, &singleInformations.IdentificationNo, &singleInformations.Address, &singleInformations.City, &singleInformations.Town, &singleInformations.Phone, &singleInformations.Attachments, &singleInformations.Title, &singleInformations.Content, &singleInformations.ReferenceID, &singleInformations.Status, &singleInformations.CreatedDate)

		if err != nil {
			return nil, err
		}

		informationsList = append(informationsList, singleInformations)

	}

	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return informationsList, nil
}

func GetInformationsByID(id string) (model.Informations, error) {
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
	newInformations.Status = "cevap bekliyor"
	newInformations.CreatedDate = time.Now().Format("02.01.2006 15:04:05")

	_, err := database.DB.Exec("INSERT INTO informationsList (firstName, lastName, age, identificationNo, address, city, town, phone, attachments, title, content, referenceID, status, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)", newInformations.FirstName, newInformations.LastName, newInformations.Age, newInformations.IdentificationNo, newInformations.Address, newInformations.City, newInformations.Town, newInformations.Phone, newInformations.Attachments, newInformations.Title, newInformations.Content, newInformations.ReferenceID, newInformations.Status, newInformations.CreatedDate)

	if err != nil {
		return err
	}

	return nil
}

func UpdateInformationsByID(byInformations model.Informations, id int) (bool, error) {
	tx, err := database.DB.Begin()
	if err != nil {
		return false, err
	}

	var count int
	err = database.DB.QueryRow("SELECT COUNT(*) FROM informationsList WHERE id =?", id).Scan(&count)
	if err != nil {
		tx.Rollback()
		return false, err
	}

	if count == 0 {
		tx.Rollback()
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE informationsList SET firstName = ?, lastName = ?, age = ?, identificationNo = ?, address = ?, city = ?, town = ?, phone = ?, attachments = ?, title = ?, content = ?, status = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(byInformations.FirstName, byInformations.LastName, byInformations.Age, byInformations.IdentificationNo, byInformations.Address, byInformations.City, byInformations.Town, byInformations.Phone, byInformations.Attachments, byInformations.Title, byInformations.Content, byInformations.Status, id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
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
