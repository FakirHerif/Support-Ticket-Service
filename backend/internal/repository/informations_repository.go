package repository

import (
	"database/sql"

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
		err = rows.Scan(&singleInformations.Id, &singleInformations.FirstName, &singleInformations.LastName, &singleInformations.Age, &singleInformations.IdentificationNo, &singleInformations.Address, &singleInformations.Attachments, &singleInformations.Title, &singleInformations.Content, &singleInformations.ReferenceID)

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

	sqlErr := stmt.QueryRow(id).Scan(&informations.Id, &informations.FirstName, &informations.LastName, &informations.Age, &informations.IdentificationNo, &informations.Address, &informations.Attachments, &informations.Title, &informations.Content, &informations.ReferenceID)

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			return model.Informations{}, nil
		}
		return model.Informations{}, sqlErr
	}
	return informations, nil
}
