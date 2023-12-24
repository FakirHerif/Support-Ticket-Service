package model

type Response struct {
	Id             int    `json:"id"`
	ResponseText   string `json:"responseText" gorm:"column:responseText"`
	ReplyDate      string `json:"replyDate" gorm:"column:replyDate"`
	InformationsId int    `json:"informationsId" gorm:"column:informationsId"`
	ResponseOwner  string `json:"responseOwner" gorm:"column:responseOwner"`
}

func (Response) TableName() string {
	return "responseList"
}
