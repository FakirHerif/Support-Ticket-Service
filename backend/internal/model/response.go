package model

type Response struct {
	Id             int    `json:"id"`
	InformationsId int    `json:"informationsId"`
	ResponseText   string `json:"responseText"`
	ReplyDate      string `json:"replyDate"`
}
