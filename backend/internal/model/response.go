package model

type Response struct {
	Id             int    `json:"id"`
	InformationsId int    `json:"informationsId" gorm:"column:informationsId"`
	ResponseText   string `json:"responseText" gorm:"column:responseText"`
	ReplyDate      string `json:"replyDate" gorm:"column:replyDate"`
}

func (Response) TableName() string {
	return "responseList"
}
