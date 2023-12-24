package model

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username" gorm:"column:username"`
	Password string `json:"password" gorm:"column:password"`
	Email    string `json:"email" gorm:"column:email"`
	Role     string `json:"role" gorm:"column:role"`
}

func (User) TableName() string {
	return "userList"
}
