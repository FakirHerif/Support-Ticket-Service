package repository

import (
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
