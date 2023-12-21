package repository

import (
	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
)

func GetResponse() ([]model.Response, error) {

	rows, err := database.DB.Query("SELECT * FROM responseList")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	responseList := make([]model.Response, 0)

	for rows.Next() {
		singleResponse := model.Response{}
		err = rows.Scan(&singleResponse.Id, &singleResponse.InformationsId, &singleResponse.ResponseText)

		if err != nil {
			return nil, err
		}

		responseList = append(responseList, singleResponse)

	}

	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return responseList, nil
}
