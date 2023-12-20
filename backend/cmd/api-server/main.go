package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
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
		c.JSON(404, gin.H{"error": "No Record Found"})
		return
	} else {
		c.JSON(200, gin.H{"data": informations})
	}
}

func addInformations(c *gin.Context) {
	c.JSON(200, gin.H{"message": "SUCCESS: Informations Added"})
}

func updateInformationsByID(c *gin.Context) {
	c.JSON(200, gin.H{"message": "SUCCESS: Informations Changed"})
}

func deleteInformationsByID(c *gin.Context) {
	c.JSON(200, gin.H{"message": "SUCCESS: Informations Deleted"})
}
