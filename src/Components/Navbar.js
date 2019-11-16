import React from 'react';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'


const NavBar = (props) =>{

  function displayNotifications(notifications){
    console.log("WORKING")
    console.log(notifications)
    if(notifications.length){
      notifications.sort((a,b) => {
if(a.createdAt < b.createdAt){
  return 1;
}else if(a.createdAt > b.createdAt){
  return -1
}else{
  return 0
}
      })
return(
      <NavDropdown title="Notifications" id="basic-nav-dropdown">
      {notifications && notifications.map(eachNotification => {
        if(eachNotification.type === "Like" || eachNotification.type === "Comment" ){
          return (
            <React.Fragment key={eachNotification._id}>
            <NavDropdown.Item href={`/post/${eachNotification.imageTo._id}`} style={{width:'19.8vw'}}>
            <span className='notification-userImage'><img src={eachNotification.fromWho.imageUrl} alt='notiPicture'></img></span>
            <span className='notificationText'>
            <span className='notifiUser'>{eachNotification.fromWho.username}</span> {eachNotification.event}</span> 
           <span className='postPictureNoti'><img src={eachNotification.imageTo.image} style={{width:"30px", height:"30px", borderRadius:50}} alt='notiPostPicture'></img></span>
            </NavDropdown.Item>
          <NavDropdown.Divider />
          </React.Fragment>)
        }else if(eachNotification.type === "Follow"){
          return (
            <React.Fragment key={eachNotification._id}>
            
            <Link to={`/profile/${eachNotification.fromWho._id}`} style={{ textDecoration: 'none', color: 'black' }} className='dropdown-item'>
            <span className='notification-userImage'><img src={eachNotification.fromWho.imageUrl} alt='notiPicture'></img></span> {eachNotification.fromWho.username} {eachNotification.event}
            </Link>
        
          <NavDropdown.Divider />
          </React.Fragment>
          )
        }else{
          return '';
        }
    
      })}
    </NavDropdown>
    )

    }
  }
  
if(props){
        return(
          <React.Fragment>
          <Navbar bg="dark" variant='dark' expand="lg">
          <Navbar.Brand href="/home">TriShare</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          {props.currentUser ? <Nav className="mr-auto">
              <Link to="/world" className='nav-link'>World</Link>
              <Link to="/newPost" className='nav-link'>New Experience</Link>
              {displayNotifications(props.notifications)}

            <Link to={`/profile/${props.currentUser._id}`} className='nav-link'><i className="fas fa-user" style={{marginRight:3}}></i>Profile</Link>
            <NavDropdown title={<i class="fas fa-cog"></i>} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={props.onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
              </Nav> : 
              <Nav className="mr-auto">
              <Link to="/login" className='nav-link'>Login</Link>
              <Link to="/signup" className='nav-link'>Signup</Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
        </React.Fragment>
        )
          }
        }

export default NavBar;

// <NavDropdown title="Notifications" id="basic-nav-dropdown">
// {displayNotifications(props.notifications)}
// <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
// <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
// <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

// <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
// </NavDropdown>