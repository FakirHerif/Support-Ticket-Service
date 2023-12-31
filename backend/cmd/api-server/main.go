package main

import (
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"

	"github.com/FakirHerif/Support-Ticket-Service/backend/database"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/auth"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/model"
	"github.com/FakirHerif/Support-Ticket-Service/backend/internal/repository"
)

func main() {

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"} // İZİN VERİLEN URL'LER (TÜMÜ)
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Authorization", "Content-Type"}

	r.Use(cors.New(config))

	v1 := r.Group("/api")
	{
		v1.GET("informations", getInformations)
		v1.GET("informations/:id", getInformationsByID)
		v1.GET("informations/referenceID/:referenceID", getInformationsByReferenceID)
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

		v1.POST("login", login)

	}

	var isDocker = os.Getenv("IS_DOCKER")
	var filePath string

	if isDocker == "true" {
		// Docker içinde çalışılıyorsa
		filePath = "./database/database.db"
	} else {
		// Lokal ortamda çalışılıyorsa
		filePath = "../../database/database.db"
	}

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

func getInformationsByReferenceID(c *gin.Context) {
	referenceID := c.Param("referenceID")
	informations, err := repository.GetInformationsByReferenceID(referenceID)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"data": informations})
}

func addInformations(c *gin.Context) {
	var formData struct {
		JSONData model.Informations    `form:"jsonData" binding:"required"`
		File     *multipart.FileHeader `form:"file"`
	}

	if err := c.ShouldBindWith(&formData, binding.FormMultipart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid form data", "details": err.Error()})
		return
	}

	referenceID, err := repository.AddInformations(formData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save data to database", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "SUCCESS: Information Added", "referenceID": referenceID})
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

	responseID, err := repository.AddResponse(json)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to add response", "details": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "SUCCESS: Response Added", "response_id": responseID})
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

func login(c *gin.Context) {
	var creds auth.Credentials
	jwtKey := auth.GetJWTKey()

	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(400, gin.H{"Bad Request": "Invalid Login Format"})
		return
	}

	user, err := auth.GetUserByUsername(creds.Username, creds.Password)
	if err != nil {
		switch err.Error() {
		case "user not found":
			c.JSON(401, gin.H{"error": "User Not Found"})
		case "wrong password":
			c.JSON(401, gin.H{"error": "Wrong Password"})
		default:
			c.JSON(500, gin.H{"error": "Unknown Error"})
		}
		return
	}

	expirationTime := time.Now().Add(10 * time.Hour)
	claims := &auth.Claims{
		Username: creds.Username,
		Role:     user.Role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.JSON(500, gin.H{"error": "Token Could Not Be Created"})
		return
	}

	c.JSON(200, gin.H{
		"message":  "Successful Login",
		"username": user.Username,
		"email":    user.Email,
		"role":     user.Role,
		"token":    tokenString,
	})
}
