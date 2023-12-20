package model

type Informations struct {
	Id               int    `json:"id"`
	FirstName        string `json:"firstName"`
	LastName         string `json:"lastName"`
	Age              int    `json:"age"`
	IdentificationNo int    `json:"identificationNo"`
	Address          string `json:"address"`
	Attachments      []byte `json:"attachments"`
	Title            string `json:"title"`
	Content          string `json:"content"`
	ReferenceID      string `json:"referenceID"`
}
