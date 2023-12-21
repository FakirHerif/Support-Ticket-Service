package main

import (
	"fmt"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/repository"
)

func main() {

	r := gin.Default()

	v1 := r.Group("/api")
	{
		v1.GET("informations", getInformations)
		v1.GET("informations/:id", getInformationsByID)
		v1.POST("informations", addInformations)
		v1.PUT("informations/:id", updateInformationsByID)
		v1.DELETE("informations/:id", deleteInformationsByID)

		v1.GET("response", getResponse)
		v1.GET("response/:id", getResponseByID)
		v1.POST("response", addResponse)
		v1.PUT("response/:id", updateResponseByID)
		v1.DELETE("response/:id", deleteResponseByID)
	}

	filePath := "../../database/database.db"
	err := database.ConnectDatabase(filePath)
	checkErr(err)

	r.Run()
}

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func getInformations(c *gin.Context) {
	informationsList, err := repository.GetInformations()
	checkErr(err)

	if err != nil {
		c.JSON(404, gin.H{"error": "No Records Found"})
		return
	} else {
		c.JSON(200, gin.H{"data": informationsList})
	}
}

func getInformationsByID(c *gin.Context) {
	id := c.Param("id")
	informations, err := repository.GetInformationsByID(id)
	if err != nil || informations.Id == 0 {
		c.JSON(404, gin.H{"error": fmt.Sprintf("Record with ID %s not found", id)})
		return
	}
	c.JSON(200, gin.H{"data": informations})
}

func addInformations(c *gin.Context) {

	var json model.Informations

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	success, err := repository.AddInformations(json)

	if err != nil {
		c.JSON(404, gin.H{"error": "Informations could not be added", "details": err.Error()})
		return
	}

	if success {
		c.JSON(200, gin.H{"message": "SUCCESS: Informations Added"})
	}
}

func updateInformationsByID(c *gin.Context) {
	var json model.Informations

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	informationsId, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid Information id"})
	}

	success, err := repository.UpdateInformationsByID(json, informationsId)

	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}

	if !success {
		c.JSON(404, gin.H{"error": fmt.Sprintf("Record with ID %d not found", informationsId)})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: Informations Changed"})
}

func deleteInformationsByID(c *gin.Context) {
	var json model.Informations

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	informationsId, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid Information id"})
	}

	success, err := repository.DeleteInformationsByID(informationsId)

	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}

	if !success {
		c.JSON(404, gin.H{"error": fmt.Sprintf("Record with ID %d not found", informationsId)})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: Informations Deleted"})
}

func getResponse(c *gin.Context) {
	responseList, err := repository.GetResponse()
	checkErr(err)

	if err != nil {
		c.JSON(404, gin.H{"error": "No Records Found"})
		return
	} else {
		c.JSON(200, gin.H{"data": responseList})
	}
}

func getResponseByID(c *gin.Context) {
	id := c.Param("id")
	response, err := repository.GetResponseByID(id)
	if err != nil || response.Id == 0 {
		c.JSON(404, gin.H{"error": fmt.Sprintf("Record with ID %s not found", id)})
		return
	}
	c.JSON(200, gin.H{"data": response})
}

func addResponse(c *gin.Context) {

	var json model.Response

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	success, err := repository.AddResponse(json)

	if err != nil {
		c.JSON(404, gin.H{"error": "Response could not be added", "details": err.Error()})
		return
	}

	if success {
		c.JSON(200, gin.H{"message": "SUCCESS: Response Added"})
	}
}

func updateResponseByID(c *gin.Context) {
	var json model.Response

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	responseId, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid Response id"})
	}

	success, err := repository.UpdateResponseByID(json, responseId)

	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}

	if !success {
		c.JSON(404, gin.H{"error": fmt.Sprintf("Record with ID %d not found", responseId)})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: Response Changed"})
}

func deleteResponseByID(c *gin.Context) {
	var json model.Response

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	responseId, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid Response id"})
	}

	success, err := repository.DeleteResponseByID(responseId)

	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}

	if !success {
		c.JSON(404, gin.H{"error": fmt.Sprintf("Record with ID %d not found", responseId)})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: Response Deleted"})
}
