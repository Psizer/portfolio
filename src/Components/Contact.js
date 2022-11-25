import React, { Component, useState } from 'react';

export const Contact = ()=>{

    const [user, setUser] = useState({
       name:"",
       email:"",
       phone:"",
       message:""
    })

    let name, value;
    const getUserData = (event)=>{
       name = event.target.name;
       value = event.target.value;

       setUser({ ...user, [name]: value })

    }

    const postData = async (e) =>{
      e.preventDefault();

      const {name,phone,email,message} = user;

    if(name && phone && email && message){
        const res =  await fetch("https://prashant-pandit-portfolio-default-rtdb.firebaseio.com/contacteduser.json",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          message
        })
      });
      if(res){
        setUser({
          name:"",
          phone:"",
          email:"",
          message:""
        });
        alert("Message sent successfully!")
      }
    }else{
      alert("Fill all fields")
    }
    }
    return (
      <section id="contact">

            <div className="row section-head">
               <div className="two columns header-col">
               <h1>
                  <span>Get In Touch.</span>
               </h1>
               </div>

               <div className="ten columns">
               <p className="lead">Please fill out the form below and I will get back to you as soon as possible.</p>
               </div>
            </div>

         <div className="row">

            <div className="eight columns">

               <form method="POST" id="contactForm" name="contactForm">
					<fieldset>
                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input type="text" value={user.name} size="35" id="name" name="name" onChange={getUserData} required/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" value={user.email}  size="35" id="email" name="email" onChange={getUserData} required/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Phone</label>
						   <input type="text" value={user.phone}  size="35" id="phone" name="phone" onChange={getUserData} required/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <input value={user.message} cols="50" rows="8" id="message" name="message" onChange={getUserData} ></input>
                  </div>

                  <div>
                     <button style={{backgroundColor:'black'}} onClick={postData}>Submit</button>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning"> Error boy</div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>
      </div>
   </section>
    );
}

