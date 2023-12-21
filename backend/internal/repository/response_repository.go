package repository

import (
	"database/sql"
	"time"

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
		err = rows.Scan(&singleResponse.Id, &singleResponse.InformationsId, &singleResponse.ResponseText, &singleResponse.ReplyDate)

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

func GetResponseByID(id string) (model.Response, error) {
	stmt, err := database.DB.Prepare("SELECT * FROM responseList WHERE id = ?")

	if err != nil {
		return model.Response{}, err
	}

	response := model.Response{}

	sqlErr := stmt.QueryRow(id).Scan(&response.Id, &response.InformationsId, &response.ResponseText, &response.ReplyDate)

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			return model.Response{}, nil
		}
		return model.Response{}, sqlErr
	}
	return response, nil
}

func AddResponse(newResponse model.Response) (bool, error) {
	tx, err := database.DB.Begin()
	if err != nil {
		return false, err
	}

	newResponse.ReplyDate = time.Now().Format("02.01.2006 15:04:05")

	stmt, err := tx.Prepare("INSERT INTO responseList (informationsId, responseText, replyDate) VALUES (?, ?, ?)")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(newResponse.InformationsId, newResponse.ResponseText, newResponse.ReplyDate)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

func UpdateResponseByID(byResponse model.Response, id int) (bool, error) {
	tx, err := database.DB.Begin()
	if err != nil {
		return false, err
	}

	var count int
	err = database.DB.QueryRow("SELECT COUNT(*) FROM responseList WHERE id =?", id).Scan(&count)
	if err != nil {
		tx.Rollback()
		return false, err
	}

	if count == 0 {
		tx.Rollback()
		return false, err
	}

	stmt, err := tx.Prepare("UPDATE responseList SET informationsId = ?, responseText = ? WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(byResponse.InformationsId, byResponse.ResponseText, id)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

func DeleteResponseByID(responseId int) (bool, error) {
	tx, err := database.DB.Begin()

	if err != nil {
		return false, err
	}

	var count int
	err = database.DB.QueryRow("SELECT COUNT(*) FROM responseList WHERE id = ?", responseId).Scan(&count)
	if err != nil {
		return false, err
	}

	if count == 0 {
		tx.Rollback()
		return false, err
	}

	stmt, err := database.DB.Prepare("DELETE from responseList WHERE id = ?")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(responseId)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}
