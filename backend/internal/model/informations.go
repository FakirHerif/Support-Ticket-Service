package model

type Informations struct {
	ID                int        `json:"id"`
	FirstName         string     `json:"firstName" gorm:"column:firstName"`
	LastName          string     `json:"lastName" gorm:"column:lastName"`
	Age               int        `json:"age" gorm:"column:age"`
	IdentificationNo  int        `json:"identificationNo" gorm:"column:identificationNo"`
	Address           string     `json:"address" gorm:"column:address"`
	City              string     `json:"city" gorm:"column:city"`
	Town              string     `json:"town" gorm:"column:town"`
	Phone             string     `json:"phone" gorm:"column:phone"`
	Attachments       []byte     `json:"attachments" gorm:"column:attachments"`
	Title             string     `json:"title" gorm:"column:title"`
	Content           string     `json:"content" gorm:"column:content"`
	ReferenceID       string     `json:"referenceID" gorm:"column:referenceID"`
	Status            string     `json:"status" gorm:"column:status"`
	CreatedDate       string     `json:"createdDate" gorm:"column:createdDate"`
	InformationsOwner *string    `json:"informationsOwner" gorm:"column:informationsOwner"`
	Response          []Response `json:"response"  gorm:"foreignKey:InformationsId"`
}

func (Informations) TableName() string {
	return "informationsList"
}
