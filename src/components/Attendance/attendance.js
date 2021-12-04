import React, { useEffect, useState } from 'react' ;
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './attendance.css';


export default function Attendance() {
    const [Name, setName] = useState("");
    const [Roll, setRoll] = useState("");
    const [List, setList] = useState([]) ;
    const [user] = useStateValue() ;
    const d = new Date(); 
    const date = d.toDateString() ; 

    const addStudent = (e) => {
        e.preventDefault() ;
        if(!Roll || !Name) {
            alert("Complete Details");
        }else{
        db.collection("student").doc(Roll).set({
            "Name" : Name , 
            "Roll" : Roll , 
            "Present" : 0 , 
            "Absent" : 0  ,
            "date" : "" , 
 
        })
    }
    }

    const listOfStudents = () => {
        db.collection("student").orderBy("Name","asc").onSnapshot(
            (snap) => {
                setList( snap.docs.map(doc => doc.data()));
            }
        )
    }
    useEffect(() => {
       listOfStudents()  ; 
    }, [])
    const markPresent = (e,student) => {
        e.preventDefault() ;
        if(student)
        db.collection("student").doc(student.Roll).update({
            "Present" : student.Present + 1 , 
            "date" : date , 
        })
    }
    const markAbsent = (e,student) => {
        e.preventDefault() ;
        if(student)
        db.collection("student").doc(student.Roll).update({
            "Absent" : student.Absent + 1 , 
            "date" : date , 
        })
    }
    return (
        <div className="attendance">
            <p classname="attendance_heading"> Attendance ( {date} ) </p>
            <div className="attendance_sheet">
            <table>
                <tr> 
                <th className="row_item">Roll</th>
                <th className="row_item">NAME</th>
                <th className="row_item">Present</th>
                <th className="row_item">Absent</th>
                <th className="row_item">Mark P</th>
                <th className="row_item">Mark A</th>
                </tr>
                {
                    List.map( student => 
                        <tr> 
                            <td className="student_rowRoll"> {student.Roll} </td>
                            <td className="student_rowname"> {student.Name} </td>
                            <td className="student_rowPresent"> {student.Present} </td>
                            <td className="student_rowAbsent"> {student.Absent} </td>
                            {student.date === date?
                            <>
                            <td/>
                            <td/>
                                
                            { /* tanya bhenki lauri */}
                            </> :
                            user && user.user?.uid === "qS7VCrpOagbLoI1gIHBlQ6qv47I2" ?
                            <>
                                <td>
                                <button onClick={(e) => markPresent(e,student)}> Present </button>
                                </td><td>
                                <button onClick={(e) => markAbsent(e,student)}> Absent </button></td>
                            </>: <> <td/>
                            <td/></> }
                        </tr>
                        )
                }
                </table>
            </div>
                {user && user.user?.uid === "qS7VCrpOagbLoI1gIHBlQ6qv47I2"? 
                <form className="attendance_addStudent" onSubmit={addStudent}>
                    <div>
                    <label for="studentName"  >Name</label>
                    <input id="studentName"  value={Name} onChange={(e) => {
                        e.preventDefault() ; 
                        setName(e.target.value) ;
                    }} />
                    </div><div>
                    <label for="studentRoll" >Roll No.</label>
                    <input id="studentRoll"  value={Roll} onChange={(e) => {
                        e.preventDefault() ; 
                        setRoll(e.target.value) ;
                    }} />
                    </div>
                    <button id="studentButton" type="submit" >Add</button>
                </form> : <></> }
        </div>
    )
}
