package auth

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

var jwtKey = []byte("my_secret_key")

func GetJWTKey() []byte {
	return jwtKey
}

func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(401, gin.H{"error": "Authorization Header Not Provided"})
			c.Abort()
			return
		}

		tokenString := authHeader[len("Bearer "):]

		claims := &Claims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			c.JSON(401, gin.H{"error": "Invalid Token"})
			c.Abort()
			return
		}

		if (c.Request.Method == "DELETE" || c.Request.Method == "PUT") && claims.Role != "admin" {
			c.JSON(401, gin.H{"error": "Unauthorized Transaction"})
			c.Abort()
			return
		}

		c.Next()
	}
}
