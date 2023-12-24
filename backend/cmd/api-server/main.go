package main

import (
	"log"
	"strconv"
	"strings"

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

		v1.GET("user", getUsers)
		v1.GET("user/:id", getUserByID)
		v1.POST("user", addUser)
		v1.PUT("user/:id", updateUserByID)
		v1.DELETE("user/:id", deleteUserByID)

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
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
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

	if err := repository.AddInformations(json); err != nil {
		c.JSON(500, gin.H{"error": "Failed to add information", "details": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "SUCCESS: Informations Added"})
}

func updateInformationsByID(c *gin.Context) {
	var json model.Informations

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	informationsID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid Information ID"})
		return
	}

	updateErr := repository.UpdateInformationsByID(json, informationsID)
	if updateErr != nil {
		c.JSON(404, gin.H{"error": updateErr.Error()})
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

	informationsID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"Bad Request": "Invalid Information ID"})
		return
	}

	deleteErr := repository.DeleteInformationsByID(informationsID)
	if deleteErr != nil {
		c.JSON(404, gin.H{"error": deleteErr.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: Informations Deleted"})
}

func getResponse(c *gin.Context) {
	responseList, err := repository.GetResponse()
	if err != nil {
		c.JSON(404, gin.H{"error": "No Records Found"})
		return
	}
	c.JSON(200, gin.H{"data": responseList})
}

func getResponseByID(c *gin.Context) {
	id := c.Param("id")
	response, err := repository.GetResponseByID(id)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": response})
}

func addResponse(c *gin.Context) {
	var json model.Response

	if err := c.ShouldBind(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	if err := repository.AddResponse(json); err != nil {
		c.JSON(500, gin.H{"error": "Failed to add response", "details": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "SUCCESS: Response Added"})
}

func updateResponseByID(c *gin.Context) {
	var json model.Response

	if err := c.ShouldBind(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	responseID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"Bad Request": "Invalid Response id"})
		return
	}

	updateErr := repository.UpdateResponseByID(json, responseID)
	if updateErr != nil {
		c.JSON(404, gin.H{"error": updateErr.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: Response Changed"})
}

func deleteResponseByID(c *gin.Context) {

	responseID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"Bad Request": "Invalid Response ID"})
		return
	}

	deleteErr := repository.DeleteResponseByID(responseID)
	if deleteErr != nil {
		c.JSON(404, gin.H{"error": deleteErr.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: Response Deleted"})
}

func getUsers(c *gin.Context) {
	userList, err := repository.GetUsers()

	if err != nil {
		c.JSON(404, gin.H{"error": "No Records Found"})
		return
	} else {
		c.JSON(200, gin.H{"data": userList})
	}
}

func getUserByID(c *gin.Context) {
	id := c.Param("id")
	users, err := repository.GetUserByID(id)
	if err != nil || users.Id == 0 {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": users})
}

func addUser(c *gin.Context) {
	var json model.User

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	if err := repository.AddUser(json); err != nil {
		c.JSON(404, gin.H{"error": "User could not be added", "details": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: User Added"})
}

func updateUserByID(c *gin.Context) {
	var json model.User

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON format"})
		return
	}

	userId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"Bad Request": "Invalid User ID"})
		return
	}

	updateErr := repository.UpdateUserByID(json, userId)
	if updateErr != nil {
		if strings.Contains(updateErr.Error(), "UNIQUE constraint failed: userList.username") {
			c.JSON(400, gin.H{"error": "Username already in use"})
			return
		} else if strings.Contains(updateErr.Error(), "UNIQUE constraint failed: userList.email") {
			c.JSON(400, gin.H{"error": "Email already in use"})
			return
		}
		c.JSON(404, gin.H{"error": updateErr.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: User Details Have Been Changed"})
}

func deleteUserByID(c *gin.Context) {

	userId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid User id"})
	}

	deleteErr := repository.DeleteUserByID(userId)
	if deleteErr != nil {
		c.JSON(404, gin.H{"error": deleteErr.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "SUCCESS: User Deleted"})
}
