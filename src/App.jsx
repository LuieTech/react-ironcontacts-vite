import { useState } from "react";
import "./App.css";
import contactsData from "./contacts.json"


function App() {

  const firstFive = contactsData.slice(0,5)
  const [contacts, setContacts] = useState(firstFive)
  const [nameOrientation, setNameOrientation] = useState(true)
  const [popularityOrientation, setPopularityOrientation] = useState(true)

  
  
  const availableContacts = contactsData.slice(5).filter(available => !contacts.includes(available))
  
  const handleAddRandom = () => {

    const randomNumber = Math.floor(Math.random() * availableContacts.length)
    const randomContact = availableContacts[randomNumber]

    if(randomContact){
      setContacts(
        [
          ...contacts,
          randomContact
  
        ]
      )
      console.log(availableContacts.length)
      console.log(randomContact)
    } else {
       
        console.log("No more artists")

    }
  }

  const handleOnsortName = () => {

    const sortedContacts = [...contacts].sort((a,b) => {
      return nameOrientation ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    });
    setContacts(sortedContacts)
    setNameOrientation(!nameOrientation)

  }

  const handleOnsortPopularity = () => {
    
    const sortedPopularity = [...contacts].sort((a,b) => {
      return popularityOrientation ? a.popularity - b.popularity : b.popularity - a.popularity
    })
    setContacts(sortedPopularity)
    setPopularityOrientation(!popularityOrientation)

  }


  return (
    <>
    <div className="d-flex flex-column align-items-center">
      <h1 className="m-5">IronContacts</h1>
      <button className="mb-5" onClick={handleAddRandom}>Add Random Contact</button>
      <button className="mb-5" onClick={handleOnsortName}>Sort by Name</button>
      <button className="mb-5" onClick={handleOnsortPopularity}>Sort by Popularity</button>

      <table className="App" style={{width:"800px"}}>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map( (contact) => (
            <tr key={contact.id}>
              <td> <img src={contact.pictureUrl} style={{width:"100px"}} /></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td className="text-center">{contact.wonOscar ? "🏆" : ""}</td>
              <td className="text-center">{contact.wonEmmy ? " 🌟" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
    </>
    
  );
}

export default App;
