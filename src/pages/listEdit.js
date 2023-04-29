import { useEffect, useState } from "react";
import Modal from "../modal/modal";

const initialData={
    id:"",
    firstName:"",
    lastName:"",
    age:"",
    job:"",
    income:"",
}
const ListEdit = () =>{
    const [formData,setFormData] = useState(initialData);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [list,setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showeDeleteModal,setShoweDeleteModal] = useState(false);

    useEffect(() => {
      if (localStorage.getItem("personList")) {
        const avaiablePerson = JSON.parse(localStorage.getItem("personList")) || [];
        setList(avaiablePerson)
      }
    },[]) 

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        const _personList = JSON.parse(localStorage.getItem("personList")) || [] ; 
    
        if (formData.firstName){
          //form başarılı bir şekilde doldurulduysa burdan ilerleyecez
          if (formData.id) {
            //ekleme işlemi yapılacak
            let editedPerson =[
              ...list.filter((x)=> x.id !== formData.id),
              formData
            ];
            setList(editedPerson);
            localStorage.setItem("personList", JSON.stringify(editedPerson));
          } 
          else {
            const biggestElementId = _personList.length > 0 ? _personList.sort((a,b)=> b.id - a.id)[0].id :0;
    
            let newList= [
              ...list,
              {
                ...formData,
                id: biggestElementId + 1
              }
            ]
            setList(newList);
            localStorage.setItem("personList", JSON.stringify(newList));
          }
    
          setShowModal(false);
          resetForm();
        }
      };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          })
    }

    const removePerson = () => {
      const _list = JSON.parse(localStorage.getItem("personList"));
      const deletePerson= [..._list.filter((x)=> x.id !== formData.id)];
      
      setList(deletePerson);
      localStorage.setItem("personList", JSON.stringify(deletePerson));
    }

    const resetForm = () => {
      setFormData(initialData);
      setFormSubmitted(false)
    }
    return(
        <>
        <div className="person-list-crud">
            <div className="buttons">
                <h1>Kişi Listesi</h1>
                <button onClick={() => setShowModal(true)}>Kişi Ekle</button>
            </div>
            <div className="list-header">
                <ul className="header">
                    <li>Ad</li>
                    <li>Soyad</li>
                    <li>Yaş</li>
                    <li className="job">Meslek</li>
                    <li>Gelir</li>
                    <li>Düzenle/Sil</li>
                </ul>

                <div className="list-persons">
                {
                    list.map((person) =>(
                        <ul className="list-area" key={person.id}>
                            <li>{person.firstName}</li>
                            <li>{person.lastName}</li>
                            <li>{person.age}</li>
                            <li  className="job">{person.job}</li>
                            <li>{person.income}</li>
                            <li className="edit-place">
                                <a
                                href="#"
                                onClick={() =>{
                                  setShowModal(true)
                                  setFormData(person)
                                }}
                                >Düzenle</a>
                                <a
                                href="#"
                                onClick={() =>{
                                  setShoweDeleteModal(true)
                                  setFormData(person)
                                }}
                                >Sil</a>
                            </li>
                        </ul>
                    ))
                }
                </div>
                {
                    list.length === 0 && (
                        <div className="empty-list">
                            Listede kişi bulunamadı. Kişi eklemek için <a 
                            onClick={()=> setShowModal(true)}
                            >tıklyanız.</a>
                        </div>
                    )
                }
            </div>
        </div>
        {showModal && (
                    <Modal
                    closeModal={() => {
                      setShowModal(false);
                    }}
                  >
                    <form className="form-edit" onSubmit={handleFormSubmit}>
                      <div
                        className={formSubmitted && formData.firstName === "" ? "error" : ""}
                      >
                        <label>Adınız:</label>
                        <input className="search-edit"
                          type="text"
                          value={formData.firstName}
                          name="firstName"
                          onChange={handleInputChange}
                        />
                        {formSubmitted && formData.firstName === "" && <div>Zorunlu Alan</div>}
                      </div>
                      <div
                        className={formSubmitted && formData.lastName === "" ? "error" : ""}
                      >
                        <label>Soyadınız:</label>
                        <input className="search-edit"
                          type="text"
                          value={formData.lastName}
                          name="lastName"
                          onChange={handleInputChange}
                        />
                        {formSubmitted && formData.lastName === "" && (
                          <div>Zorunlu Alan</div>
                        )}
                      </div>
                      <div
                        className={formSubmitted && formData.age === "" ? "error" : ""}
                      >
                        <label>Yaşınız:</label>
                        <input className="search-edit"
                          type="text"
                          value={formData.age}
                          name="age"
                          onChange={handleInputChange}
                        />
                        {formSubmitted && formData.age === "" && <div>Zorunlu Alan</div>}
                      </div>
                      <div
                      className={formSubmitted && formData.job === "" ? "error" : ""}
                      >
                        <label>Mesleğiniz:</label>
                        <input
                        type="text"
                        value={formData.job}
                        name="job"
                        onChange={handleInputChange}
                        />
                        {formSubmitted && formData.job === "" && <div>Zorunlu alan</div>}
                      </div>
                      <div
                      className={formSubmitted && formData.income === "" ? "error" : ""}
                      >
                        <label>Geliriniz:</label>
                        <input
                        type="text"
                        value={formData.income}
                        name="income"
                        onChange={handleInputChange}
                        />
                        {formSubmitted && formData.income === "" ? "error" : ""}
                      </div>
                      <div className="button-save">
                      <button type="submit">Kaydet</button>
                        <button type="button"
                          onClick={() => {
                            setShowModal(false);
                            resetForm()
                          }}
                        >
                          Vazgeç
                        </button>
                      </div>
                    </form>
                  </Modal>
            )
        }
        {showeDeleteModal && (
          <Modal closeModal={() => {setShoweDeleteModal(false);}}>
            <div className="delete-container">
              <h5 className="desc">Kişiyi silmek istediğinize emin misiniz?</h5>
              <div className="dlt-buttons">
                <button 
                onClick={() => {
                  removePerson()
                  setShoweDeleteModal(false)
                }}
                >Sil</button>
                <button onClick={() =>{
                  setShoweDeleteModal(false)
                }}>Vazgeç</button>
              </div>
            </div>
          </Modal>
        )}
        </>
    );
};

export default ListEdit;