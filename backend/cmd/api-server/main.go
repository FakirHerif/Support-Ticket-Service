package main

import (
	"github.com/gin-gonic/gin"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
)

func main() {

	database.ConnectDatabase()

	r := gin.Default()

	v1 := r.Group("/api")
	{
		v1.GET("informations", getInformations)
		v1.GET("informations/:id", getInformationsByID)
		v1.POST("informations", addInformations)
		v1.PUT("informations/:id", updateInformationsByID)
		v1.DELETE("informations/:id", deleteInformationsByID)
	}

	r.Run()
}

func getInformations(c *gin.Context) {
	c.JSON(200, gin.H{"message": "SUCCESS: All Informations Was Received"})
}

func getInformationsByID(c *gin.Context) {
	c.JSON(200, gin.H{"message": "SUCCESS: Information Was Received"})
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
