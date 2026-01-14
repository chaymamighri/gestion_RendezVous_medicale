
import "./secretary.css";
import SecretaryMenu from './SecretaryMenu';
import SecretarHome from './SecretaryHome';
function Secretary() {
 


  return (
    <div className="secretary-interface">
    <div className="sidebar">
      <h1>Secretary</h1>
      <SecretaryMenu />
    </div>

    <div className="home-content">
     <SecretarHome/>
    </div>
  </div>
  );
}

export default Secretary;


